package com.Issue_service.repository;

import com.Issue_service.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Long> {
    List<Comment>findByIssueIdOrderByCreatedAtAsc(Long issueId);
}
