package com.project_service.dto;

import com.project_service.model.project_Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class addMemberRequest {
    private long userId;
    private project_Role role;
}
