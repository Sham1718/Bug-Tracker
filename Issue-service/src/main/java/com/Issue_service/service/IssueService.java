package com.Issue_service.service;

import com.Issue_service.dto.AssignIssueUpdate;
import com.Issue_service.dto.CreateIssueRequest;
import com.Issue_service.model.Issue;
import com.Issue_service.model.IssueStatus;

import java.util.List;
import java.util.Optional;

public interface IssueService {
    Issue createIssue(CreateIssueRequest request,Long userId,Long projectId);
    List<Issue>getIssueByProjectId(Long projectId, Long userId);
    Issue updateIssueStatus(Long issueId, IssueStatus status,Long userId);
    Issue updateAssignee(Long issueId, Long assigneID, Long userId);
    Issue getIssueBYId(Long id, Long projectId,Long userId);
    Issue updateDescription(Long issueId,String description, Long userId);
}
