package com.Issue_service.service;

import com.Issue_service.dto.CreateIssueRequest;
import com.Issue_service.exception.AccessDeniedException;
import com.Issue_service.exception.ResourceNotFound;
import com.Issue_service.model.Issue;
import com.Issue_service.model.IssueStatus;
import com.Issue_service.repository.IssueRepository;
import com.Issue_service.repository.ProjectMemberRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class IssueServiceIMPL implements IssueService{
    private final IssueRepository repository;
    private final ProjectMemberRepository memberRepository;
    private final NotificationClient client;

    public IssueServiceIMPL(IssueRepository repository, ProjectMemberRepository memberRepository, NotificationClient client) {
        this.repository = repository;
        this.memberRepository = memberRepository;
        this.client = client;
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
        if (request.getAssigneId()!=null){
            client.sendEmail(
                    "sbharaskar8485@gmail.com",
                    "Issue Assigned",
                    "You have been assignee new Issue " + request.getTitle()
            );
        }
        Issue issue = new Issue();
        issue.setProjectId(projectId);
        issue.setTitle(request.getTitle());
        issue.setDescription(request.getDescription());
        issue.setPriority(request.getPriority());
        issue.setAssigneId(request.getAssigneId());
        return repository.save(issue);
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
        Issue issue =repository.findById(issueId)
                .orElseThrow(()->new ResourceNotFound("Issue Not Found.."));
        boolean isProjectExist=memberRepository.existsByProjectIdAndUserId(issue.getProjectId(),userId);
        if (!isProjectExist){
            throw new AccessDeniedException("User is not member in project");
        }

        if (assigneId!=null) {
            boolean isMember = memberRepository.existsByProjectIdAndUserId(issue.getProjectId(),assigneId);
            if (!isMember){
                throw new AccessDeniedException("Assignee is not a project Member");
            }
        }

        issue.setAssigneId(assigneId);
        return issue;
    }


}
