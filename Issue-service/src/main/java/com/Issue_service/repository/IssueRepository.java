package com.Issue_service.repository;

import com.Issue_service.model.Issue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueRepository extends JpaRepository<Issue,Long> {
    List<Issue>findByProjectId(Long projectId);
}
