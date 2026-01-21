package com.project_service.service;

import com.project_service.model.project;
import com.project_service.model.project_Role;
import com.project_service.model.project_member;

import java.util.List;

public interface projectService {
    project createProject(String name,String projectKeys ,String description,long userId);
    List <project> getProjectforUser(Long userId);
    project getProjectById(Long projectId,Long userId);
    project updateProject(Long projectId,String name ,String description,Long userId);
    void addMember(Long projectId, Long targetedUserId , project_Role role, Long requesterId);
    List<project_member>members(Long projectId,Long userId);
    void updateMember(Long projectId, Long targetedUserId,project_Role role ,Long requesterId);
    void deleteProject(Long projectId,Long requesterId);
    void addByEmail(Long projectId, String email, project_Role role, Long userId);
    void deleteMember(Long projectId,Long targetedUserId,Long userId);
    project_Role getRole(Long projectId, Long userId);
}
