package com.project_service.controller;

import com.project_service.dto.CreateProjectRequest;
import com.project_service.dto.addMemberRequest;
import com.project_service.dto.updateProject;
import com.project_service.dto.updateRole;
import com.project_service.model.project;
import com.project_service.model.project_member;
import com.project_service.service.projectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/projects")
public class projectController {

    @Autowired
    private projectService service;

    @PostMapping
    public ResponseEntity<project> createProject(@RequestBody CreateProjectRequest request ,
                                                 @RequestHeader("X-User-Id") Long userId){
        project project =service.createProject(
                request.getName(),
                request.getProjectKeys().toUpperCase(),
                request.getDescription(),
                userId
        );
        return new ResponseEntity<>(project, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<project>>getAllProject(@RequestHeader("X-User-Id") Long userId){
        return ResponseEntity.ok(
                service.getProjectforUser(userId)
        );
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<project> getProjectById(
            @PathVariable Long projectId,
            @RequestHeader("X-User-Id")Long userId
    ){
      return   ResponseEntity.ok(
                service.getProjectById(projectId,userId)
        );
    }
    @PutMapping("/{projectId}")
    public ResponseEntity<project> updateProject(
            @PathVariable Long projectId,
            @RequestBody updateProject project,
            @RequestHeader("X-User-Id") Long userid
            ){
        return ResponseEntity.ok(
                service.updateProject(projectId,project.getName(),project.getDesc(),userid)
        );
    };

    @PostMapping("/{projectId}/members")
    public ResponseEntity<String> addMember(
            @PathVariable Long projectId,
            @RequestBody addMemberRequest memberRequest,
            @RequestHeader("X-User-Id") Long userId
            ){
        service.addMember(projectId,memberRequest.getUserId(),memberRequest.getRole(),userId);
        return ResponseEntity.ok("Member Added Successfully");
    }

    @GetMapping("/{projectId}/getMembers")
    public ResponseEntity<List<project_member>> getMember(
            @PathVariable Long projectId,
            @RequestHeader("X-User-Id") Long userId
    ){
        return ResponseEntity.ok(
                service.members(projectId,userId)
        );
    }
    @PutMapping("/{projectId}/member/role")
    public ResponseEntity<String> updateRole (
            @PathVariable Long projectId,
            @RequestHeader("X-User-Id") Long userId,
            @RequestBody updateRole role
    ){
        service.updateMember(projectId,role.getUserId(),role.getRole(),userId);
         return ResponseEntity.ok("updated Role..");
    }

    @DeleteMapping("/{projectId}/delete")
    public ResponseEntity<String> deleteProject(
            @PathVariable Long projectId,
            @RequestHeader("X-User-Id") Long userId
    ){
        service.deleteProject(projectId,userId);
        return ResponseEntity.ok("Project deleted!");
    }

}
