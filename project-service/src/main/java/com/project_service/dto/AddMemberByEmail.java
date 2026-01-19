package com.project_service.dto;

import com.project_service.model.project_Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddMemberByEmail {
    private String email;
    private project_Role role;
}
