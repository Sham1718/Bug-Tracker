package com.project_service.service;
import org.springframework.cloud.openfeign.FeignClient;



import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "Issue-service")
public interface IssueClient {
    @DeleteMapping("/issues/projects/{projectId}")
    void  deleteIssuesByProject(@PathVariable  long projectId);
}
