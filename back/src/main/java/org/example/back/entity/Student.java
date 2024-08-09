package org.example.back.entity;

//学生用户

import lombok.Data;

@Data
public class Student {
    private int id;
    private String username;
    private String password;
}
