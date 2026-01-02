package com.project_service.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateProjectRequest {
    String name;
    String description;
    String projectKeys;
}
