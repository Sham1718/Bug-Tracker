package com.Issue_service.service;

import com.Issue_service.dto.CreateIssueRequest;
import com.Issue_service.exception.AccessDeniedException;
import com.Issue_service.model.Issue;
import com.Issue_service.repository.IssueRepository;
import com.Issue_service.repository.ProjectMemberRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IssueServiceIMPL implements IssueService{
    private final IssueRepository repository;
    private final ProjectMemberRepository memberRepository;

    public IssueServiceIMPL(IssueRepository repository, ProjectMemberRepository memberRepository) {
        this.repository = repository;
        this.memberRepository = memberRepository;
    }


    @Override
    public Issue createIssue(CreateIssueRequest request, Long userId) {
        boolean isMember = memberRepository.existsByProjectIdAndUserId(request.getProjectId(),userId);
        boolean isProjectExists= memberRepository.existsByProjectId(request.getProjectId());

        if (!isProjectExists){
            throw new AccessDeniedException("Project not Exists..");
        }

        if (!isMember){
            throw new AccessDeniedException("User is not a project member");
        }
        Issue issue = new Issue();
        issue.setProjectId(request.getProjectId());
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
}
