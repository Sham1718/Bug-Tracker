package com.Issue_service.service;

import com.Issue_service.dto.CommentRequest;
import com.Issue_service.model.Comment;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public interface CommentService {
    List<Comment> getAllComment(Long issueId,Long userId);
    Comment addComment(Long issueId, Long userId,String content);
}
