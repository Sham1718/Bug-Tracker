package com.Issue_service.repository;


import com.Issue_service.model.ProjectMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectMemberRepository extends JpaRepository<ProjectMember,Long> {
    boolean existsByProjectId(Long projectid);
    boolean existsByProjectIdAndUserId(Long projectId,Long userId);

}
