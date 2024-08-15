package org.example.back.controller;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Mapper;
import org.example.back.common.R;
import org.example.back.entity.Student;
import org.example.back.service.EnterService;
import org.example.back.service.StudentService;
import org.example.back.utils.TokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@RestController
@Slf4j
@RequestMapping("/student")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @Autowired
    private EnterService enterService;

    //登录
    @PostMapping("/login")
    public R login(@RequestBody Student student) {
        LambdaQueryWrapper<Student> queryWrapper = new LambdaQueryWrapper();
        queryWrapper.eq(Student::getUsername,student.getUsername());

        Student one = studentService.getOne(queryWrapper);
        if(one == null){
            return R.error("用户不存在");
        } else if (!one.getPassword().equals(student.getPassword())) {
            return R.error("密码错误");
        }

        String token = TokenUtils.createTokenByStudent(student);
        one.setToken(token);
        studentService.updateById(one);

        return R.success(one,"登录成功");
    }

    //注册
    @PostMapping("/register")
    public R add(@RequestBody Student student) {
        LambdaQueryWrapper<Student> queryWrapper = new LambdaQueryWrapper();
        queryWrapper.eq(Student::getUsername,student.getUsername());
        Student one = studentService.getOne(queryWrapper);

        if(one != null){
            return R.error("用户名已存在");
        } else if (student.getPassword() == null) {
            return R.error("密码不能为空");
        }

        studentService.save(student);
        return R.success(null,"注册成功");
    }

    //删

//    //改(头像)
    @PostMapping("/avatar")
    public R avatar(@RequestParam(value = "file", required = false) MultipartFile file,Student student) {
        log.info("file: {},student: {}",file,student);
        //非空判断
        if(file.isEmpty()){
            return R.error("图片上传失败");
        }

        //获取上传文件名
        String originalFilename = file.getOriginalFilename();
        //防止重名覆盖，系统时间戳+文件后缀名
        String fileName = System.currentTimeMillis() + "." + originalFilename.substring(originalFilename.lastIndexOf(".")+1);

        //设置保存地址
        String path = "D:\\Leave-registration-management\\front\\static\\";
        File dest = new File(path + fileName);
        //判断文件是否存在，不存在就创建一个
        if(!dest.getParentFile().exists()){
            dest.getParentFile().mkdirs();
        }

        try{
            //保存到文件夹里
            file.transferTo(dest);

            student.setAvatar(dest.getAbsolutePath());

            studentService.updateById(student);


            return R.success(student,"文件上传成功");
        }catch (Exception e){
            e.printStackTrace();
            return R.error(e.getMessage());
        }
    }

    //查(id)
    @GetMapping("/{id}")
    public R get(@PathVariable Integer id) {
        Student student = studentService.getById(id);
        return R.success(student,"查询成功");
    }

}
