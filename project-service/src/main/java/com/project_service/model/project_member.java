package com.project_service.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class project_member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false)
    private long projectId;
    @Column(nullable = false)
    private long userId;
    @Enumerated(EnumType.STRING)
    private project_Role role;
    private LocalDateTime joinAt;

    @PrePersist
    protected void oncreate(){
        this.joinAt=LocalDateTime.now();
    }


}
