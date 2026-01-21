package com.project_service.service;

import com.project_service.exception.AccessDeniedException;
import com.project_service.exception.ResourceNotFound;
import com.project_service.model.project;
import com.project_service.model.project_Role;
import com.project_service.model.project_member;
import com.project_service.repository.ProjectMemeberRepository;
import com.project_service.repository.ProjectRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.project_service.model.project_Role.OWNER;

@Service
@Transactional
public class projectServiceImpl implements projectService{

    @Autowired
    private final ProjectRepository repository;

    @Autowired
    private final ProjectMemeberRepository memeberRepository;
    private final IssueClient client;
    private final UserClient userClient;

    public projectServiceImpl(ProjectRepository repository, ProjectMemeberRepository memeberRepository, IssueClient client, UserClient userClient){
        this.memeberRepository=memeberRepository;
        this.repository=repository;
        this.client = client;
        this.userClient = userClient;
    }

    @Override
    public project createProject(String name, String projectKeys, String description, long userId) {

        //Uniqueness of keys
        if (repository.existsByProjectKeys(projectKeys)){
            throw new IllegalArgumentException("Already projectkeys exits");
        }
        project project=new project();
        project.setName(name);
        project.setProjectKeys(projectKeys);
        project.setDescription(description);

        project savedproject = repository.save(project);

        project_member member=new project_member();
        member.setProjectId(project.getId());
        member.setUserId(userId);
        member.setRole(OWNER);

        memeberRepository.save(member);


        return savedproject;
    }

    @Override
    public List<project> getProjectforUser(Long userId) {

        return memeberRepository.findByuserId(userId).stream()
                .map(member-> repository.findById(member.getProjectId())
                        .orElseThrow(()->new RuntimeException("Project Not Found for Id "+ member.getProjectId())))
                .collect(Collectors.toList());
    }

    @Override
    public project getProjectById(Long projectId, Long userId) {
        project project =repository.findById(projectId)
                .orElseThrow(()->new ResourceNotFound("project not found..!"));

        memeberRepository.findByProjectIdAndUserId(projectId,userId).orElseThrow(()->
                new AccessDeniedException("Access denied: User not a project member."));

        return project;
    }

    @Override
    public project updateProject(Long projectId, String name, String description, Long userId) {
       project project =repository.findById(projectId)
               .orElseThrow(()->new ResourceNotFound("Project not found..!"));
       memeberRepository.findByProjectIdAndUserIdAndRoleIn(projectId,userId,
               List.of(OWNER,project_Role.MANAGER))
               .orElseThrow(()->
                       new AccessDeniedException("Access denied: User not a project Owner or Manager."));

       project.setName(name);
       project.setDescription(description);
       return  repository.save(project);
    }

    @Override
    public void addMember(Long projectId, Long targetedUserId, project_Role role, Long requesterId) {
        project project=repository.findById(projectId)
                .orElseThrow(()->new ResourceNotFound("Project Not Exits.."));
        memeberRepository.findByProjectIdAndUserIdAndRoleIn(projectId,requesterId,
                List.of(OWNER,project_Role.MANAGER))
                .orElseThrow(()->new AccessDeniedException("Only Owner and Manager Allowed to Add Member..!"));
        if (memeberRepository.existsByProjectIdAndUserId(projectId,targetedUserId)){
            throw  new IllegalArgumentException("Already a project Member..!");
        }
        if (role== OWNER){
            throw  new IllegalArgumentException("Cannot Assign Owner");
        }
        project_member member =new project_member();
        member.setProjectId(projectId);
        member.setUserId(targetedUserId);
        member.setRole(role);
       memeberRepository.save(member);
    }

    @Override
    public List<project_member> members(Long projectId, Long userId) {
        repository.findById(projectId)
                .orElseThrow(()-> new ResourceNotFound("Project Not Found..!"));

      memeberRepository.findByProjectIdAndUserId(projectId,userId)
              .orElseThrow(()->new AccessDeniedException("User Not in Project"));
        return memeberRepository.findByProjectId(projectId);
    }

    @Override
    public void updateMember(Long projectId, Long targetedUserId, project_Role role, Long requesterId) {
        repository.findById(projectId)
                .orElseThrow(()->new ResourceNotFound("Project Not Exists.."));
       project_member member= memeberRepository.findByProjectIdAndUserId(projectId,requesterId)
                .orElseThrow(()->new AccessDeniedException("User is Not Member of Project"));
        if (member.getRole()!= OWNER){
            throw new AccessDeniedException("Only Owner Can Update User Role..");
        }
        project_member target =memeberRepository.findByProjectIdAndUserId(projectId,targetedUserId)
                .orElseThrow(()->new AccessDeniedException("User not member in project.."));

        if (role==OWNER){
            throw new IllegalArgumentException("Cannot assign OWNER role..");
        }
        if (targetedUserId.equals(requesterId)){
            throw new IllegalArgumentException("OWNER cannot change own role");
        }

        target.setRole(role);
        memeberRepository.save(target);
    }

    @Override
    public void deleteProject(Long projectId, Long requesterId) {
        project project =repository.findById(projectId)
                .orElseThrow(()->new ResourceNotFound("project not exists"));
        project_member member =memeberRepository.findByProjectIdAndUserId(projectId,requesterId)
                .orElseThrow(()->new AccessDeniedException("user not a project member"));
        if (member.getRole()!=OWNER){
            throw new AccessDeniedException("Only Owner Can Delete project..");
        }
        client.deleteIssuesByProject(projectId);
        memeberRepository.deleteByProjectId(projectId);
        repository.delete(project);
    }

    @Override
    public void addByEmail(Long projectId, String email, project_Role role, Long userId) {
        project project =repository.findById(projectId)
                .orElseThrow(()->new ResourceNotFound("project not exists"));

        memeberRepository.findByProjectIdAndUserIdAndRoleIn(projectId,userId, List.of(project_Role.OWNER, project_Role.MANAGER))
                .orElseThrow(()->new AccessDeniedException("only manager and owner can add members..!"));

        Long targetUserId;
        try {
            targetUserId = userClient.getUserIdByEmail(email);
        } catch (Exception e) {
//            e.printStackTrace();
            throw new ResourceNotFound("User not registered with this email");
        }

        if (memeberRepository.existsByProjectIdAndUserId(projectId,targetUserId)){
            throw new IllegalArgumentException("user already a member!");
        }
        if (role== OWNER){
            throw new IllegalArgumentException("Cannot assign owner role");
        }
        project_member member=new project_member();
        member.setProjectId(projectId);
        member.setRole(role);
        member.setUserId(targetUserId);
        memeberRepository.save(member);

    }

    @Override
    public void deleteMember(Long projectId, Long targetedUserId, Long userId) {
        project project =repository.findById(projectId)
                .orElseThrow(()->new ResourceNotFound("project not exists"));

       project_member member =memeberRepository.findByProjectIdAndUserId(projectId,userId)
               .orElseThrow(()->new AccessDeniedException("Not a project member"));

       if(member.getRole()!=OWNER){
           throw  new AccessDeniedException("Only Owner can remove member ..! ");
       }

       if (targetedUserId.equals(userId)){
           throw new AccessDeniedException("Owner cant remove self");
       }

       project_member targetMember= memeberRepository.findByProjectIdAndUserId(projectId,targetedUserId)
               .orElseThrow(()->new AccessDeniedException("targeted user not a project member"));

       if (targetMember.getRole()==OWNER){
           throw new AccessDeniedException("Cannot remove Owner..!");
       }
        memeberRepository.deleteByProjectIdAndUserId(projectId,targetedUserId);
    }

    @Override
    public project_Role getRole(Long projectId, Long userId) {
        project_member member= memeberRepository.findByProjectIdAndUserId(projectId,userId)
                .orElseThrow(()->new AccessDeniedException("not a project member"));
       return member.getRole();
    }
}
