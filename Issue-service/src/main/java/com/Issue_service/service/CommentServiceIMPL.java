package com.Issue_service.service;

import com.Issue_service.exception.AccessDeniedException;
import com.Issue_service.exception.IllegalArgumentException;
import com.Issue_service.exception.ResourceNotFound;
import com.Issue_service.model.Comment;
import com.Issue_service.model.Issue;
import com.Issue_service.repository.CommentRepository;
import com.Issue_service.repository.IssueRepository;
import com.Issue_service.repository.ProjectMemberRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceIMPL implements CommentService {
    private final CommentRepository repository;
    private final IssueRepository issueRepository;
    private final ProjectMemberRepository memberRepository;
    private final NotificationClient client;

    public CommentServiceIMPL(CommentRepository repository, IssueRepository issueRepository, ProjectMemberRepository memberRepository, NotificationClient client) {
        this.repository = repository;
        this.issueRepository = issueRepository;
        this.memberRepository = memberRepository;
        this.client = client;
    }

    @Override
    public List<Comment> getAllComment(Long issueId, Long userId) {
        Issue issue =issueRepository.findById(issueId)
                .orElseThrow(()->new ResourceNotFound("Issue not Found.."));

        boolean isMember = memberRepository.existsByProjectIdAndUserId(issue.getProjectId(),userId);
        if (!isMember){
            throw new AccessDeniedException("Not a project Member");
        }

        return repository.findByIssueIdOrderByCreatedAtAsc(issueId);
    }

    @Override
    public Comment addComment(Long issueId, Long userId, String content) {
        if (content==null || content.trim().isEmpty()){
            throw new IllegalArgumentException("Comment Can't be Null");
        }
        Issue issue =issueRepository.findById(issueId)
                .orElseThrow(()->new ResourceNotFound("Issue not Found.."));

        boolean isMember = memberRepository.existsByProjectIdAndUserId(issue.getProjectId(),userId);
        if (!isMember){
            throw new AccessDeniedException("Not a project Member");
        }
        Comment comment =new Comment();
        comment.setIssueId(issueId);
        comment.setContent(content);
        comment.setUserId(userId);
        client.sendEmail(
                "sbharaskar8485@gmail.com",
                "New Comment Added",
                "A new comment added to issue "+issue.getTitle()
        );
        return repository.save(comment);
    }
}
