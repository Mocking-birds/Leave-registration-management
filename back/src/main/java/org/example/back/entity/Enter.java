package org.example.back.entity;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Enter {
    private int id;
    private String username;
    private String state;
    private String reject;
    private String notes;
    private LocalDateTime time;
}
