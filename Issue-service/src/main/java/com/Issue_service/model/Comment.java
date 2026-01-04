package com.Issue_service.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private long issueId;

    private long userId;

    @Column(nullable = false)
    private String content;

    private LocalDateTime createdAt;

    @PrePersist
    public void create(){
        this.createdAt=LocalDateTime.now();
    }
}
