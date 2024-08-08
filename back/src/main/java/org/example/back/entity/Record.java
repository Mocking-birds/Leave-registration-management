package org.example.back.entity;

import lombok.Data;

import java.time.LocalDateTime;

//出入校申请记录
@Data
public class Record {
    private Integer id;
    private String username;
    private String state;
    private String reject;
    private String notes;
    private LocalDateTime time;
    private String reason;
    private String type;
}
