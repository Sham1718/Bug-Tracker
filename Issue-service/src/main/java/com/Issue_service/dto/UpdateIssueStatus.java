package com.Issue_service.dto;


import com.Issue_service.model.IssueStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateIssueStatus {
    private IssueStatus status;
}
