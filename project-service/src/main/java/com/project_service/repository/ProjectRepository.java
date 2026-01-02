package com.project_service.repository;

import com.project_service.model.project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<project, Long> {

    Optional<project> findByProjectKeys(String projectKeys);
    boolean existsByProjectKeys(String projectKeys);
}
