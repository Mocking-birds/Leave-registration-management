package org.example.back.controller;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Mapper;
import org.example.back.common.R;
import org.example.back.entity.Student;
import org.example.back.service.StudentService;
import org.example.back.utils.TokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/student")
public class StudentController {
    @Autowired
    private StudentService studentService;

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
    //改

    //查(id)
    @GetMapping("/{id}")
    public R get(@PathVariable Integer id) {
        Student student = studentService.getById(id);
        return R.success(student,"查询成功");
    }

}
