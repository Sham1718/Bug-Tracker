package com.Issue_service.service;

import com.Issue_service.dto.CreateIssueRequest;
import com.Issue_service.exception.AccessDeniedException;
import com.Issue_service.exception.ResourceNotFound;
import com.Issue_service.model.Issue;
import com.Issue_service.model.IssueStatus;
import com.Issue_service.repository.CommentRepository;
import com.Issue_service.repository.IssueRepository;
import com.Issue_service.repository.ProjectMemberRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class IssueServiceIMPL implements IssueService{
    private final IssueRepository repository;
    private final ProjectMemberRepository memberRepository;
    private final NotificationClient client;
    private final UserClient userClient;
    private final CommentRepository commentRepository;

    public IssueServiceIMPL(IssueRepository repository, ProjectMemberRepository memberRepository, NotificationClient client, UserClient userClient, CommentRepository commentRepository) {
        this.repository = repository;
        this.memberRepository = memberRepository;
        this.client = client;
        this.userClient = userClient;
        this.commentRepository = commentRepository;
    }


    @Override
    public Issue createIssue(CreateIssueRequest request, Long userId,Long projectId) {
        boolean isMember = memberRepository.existsByProjectIdAndUserId(projectId,userId);
        boolean isProjectExists= memberRepository.existsByProjectId(projectId);

        if (!isProjectExists){
            throw new AccessDeniedException("Project not Exists..");
        }

        if (!isMember){
            throw new AccessDeniedException("User is not a project member");
        }
        Issue issue = new Issue();
        issue.setProjectId(projectId);
        issue.setTitle(request.getTitle());
        issue.setDescription(request.getDescription());
        issue.setPriority(request.getPriority());
        issue.setAssigneId(request.getAssigneId());

        Issue saveIssue =repository.save(issue);
        if (request.getAssigneId() != null) {
            String email = userClient.getEmailByUserId(request.getAssigneId());

            client.sendEmail(
                    email,
                    "Issue Assigned: " + saveIssue.getTitle(),
                    "You have been assigned a new issue.\n\n" +
                            "Issue ID: " + saveIssue.getId() + "\n" +
                            "Title: " + saveIssue.getTitle()
            );
        }

        return saveIssue;
    }

    @Override
    public List<Issue> getIssueByProjectId(Long projectId, Long userId) {
        boolean isProjectExists= memberRepository.existsByProjectId(projectId);
        boolean isMember=memberRepository.existsByProjectIdAndUserId(projectId,userId);
        if (!isProjectExists){
            throw new AccessDeniedException("Project not Exists..");
        }
        if (!isMember){
            throw new AccessDeniedException("User is not a project member");
        }
        return repository.findByProjectId(projectId);
    }

    @Override
    public Issue updateIssueStatus(Long issueId, IssueStatus status, Long userId) {
        Issue issue =repository.findById(issueId)
                .orElseThrow(()->new ResourceNotFound("Issue Not Found.."));

        boolean projectExist=memberRepository.existsByProjectId(issue.getProjectId());
        if (!projectExist){
            throw new ResourceNotFound("Project Not Found");
        }
        boolean isMember=memberRepository.existsByProjectIdAndUserId(issue.getProjectId(),userId);
        if (!isMember){
            throw new AccessDeniedException("User Not a project Member");
        }
        issue.setStatus(status);
        return repository.save(issue);
    }

    @Override
    public Issue updateAssignee(Long issueId, Long assigneId, Long userId) {

        Issue issue = repository.findById(issueId)
                .orElseThrow(() -> new ResourceNotFound("Issue not found"));

        // check user is member of project
        boolean isMember = memberRepository
                .existsByProjectIdAndUserId(issue.getProjectId(), userId);

        if (!isMember) {
            throw new AccessDeniedException("User is not a project member");
        }

        // validate assignee belongs to same project
        if (assigneId != null) {
            boolean isAssigneeMember =
                    memberRepository.existsByProjectIdAndUserId(
                            issue.getProjectId(), assigneId);
            if (!isAssigneeMember) {
                throw new AccessDeniedException("Assignee is not a project member");
            }
        }
        issue.setAssigneId(assigneId);
        return repository.save(issue);
    }


    @Override
    public Issue getIssueBYId(Long id, Long projectId,Long userId) {
        boolean isProjectExists= memberRepository.existsByProjectId(projectId);
        boolean isMember=memberRepository.existsByProjectIdAndUserId(projectId,userId);
        if (!isProjectExists){
            throw new AccessDeniedException("Project not Exists..");
        }
        if (!isMember){
            throw new AccessDeniedException("User is not a project member");
        }
        return repository.findByIdAndProjectId(id,projectId);

    }

    @Override
    public Issue updateDescription(Long issueId, String description, Long userId) {
        Issue issue = repository.findById(issueId)
                .orElseThrow(() -> new ResourceNotFound("Issue not found"));

        // check user is member of project
        boolean isMember = memberRepository
                .existsByProjectIdAndUserId(issue.getProjectId(), userId);

        if (!isMember) {
            throw new AccessDeniedException("User is not a project member");
        }

        if(description.isEmpty()){
            throw new  ResourceNotFound("Description is empty");
        }

        issue.setDescription(description);

        return repository.save(issue);
    }

    @Override
    public void deleteByProjectId(Long projectId) {
        List<Issue> issues=repository.findByProjectId(projectId);
        for (Issue issue :issues){
            commentRepository.deleteByIssueId(issue.getId());
        }
        repository.deleteByProjectId(projectId);
    }


}
