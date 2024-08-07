package org.example.back.entity;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Go {
    private int id;
    private String reason;
    private String state;
    private String reject;
    private String username;
    private LocalDateTime time;
}
