package com.Issue_service.dto;

import com.Issue_service.model.IssuePriority;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateIssueRequest {
    private Long projectId;
    private String title;
    private String description;
    private IssuePriority priority;
    private Long assigneId;
}
