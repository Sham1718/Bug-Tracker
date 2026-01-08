package com.Issue_service.service;

import com.Issue_service.dto.CreateIssueRequest;
import com.Issue_service.model.Issue;
import com.Issue_service.model.IssueStatus;

import java.util.List;

public interface IssueService {
    Issue createIssue(CreateIssueRequest request,Long userId,Long projectId);
    List<Issue>getIssueByProjectId(Long projectId, Long userId);
    Issue updateIssueStatus(Long issueId, IssueStatus status,Long userId);
    Issue updateAssignee(Long issueId,Long assigneId,Long userId);
}
