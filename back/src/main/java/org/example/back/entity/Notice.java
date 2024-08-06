package org.example.back.entity;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Notice {
    private int id;
    private String title;
    private String content;
    private LocalDateTime time;
}
