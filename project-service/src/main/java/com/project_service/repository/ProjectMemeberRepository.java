package com.project_service.repository;

import com.project_service.model.project_Role;
import com.project_service.model.project_member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectMemeberRepository extends JpaRepository<project_member,Long> {

    Optional<project_member> findByProjectIdAndUserId(Long projectId,Long userId);
    List<project_member>findByuserId(long userId);
    List<project_member>findByProjectId(long projectId);

    boolean existsByProjectIdAndUserId(Long projectId, Long userId);
//
//    boolean existsByProjectIdAndUserIdAndRole(
//            Long projectId,
//            Long userId,
//            project_Role role
//    );

    Optional<project_member> findByProjectIdAndUserIdAndRoleIn(Long projectID,Long userId,List<project_Role>roles);
}
