package org.example.back.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import lombok.extern.slf4j.Slf4j;
import org.example.back.common.R;
import org.example.back.entity.User;
import org.example.back.service.UserService;
import org.example.back.utils.TokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    //登录
    @PostMapping("/login")
    public R login(@RequestBody User user) {
        log.info("login user: {}", user);

        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<User>();
        queryWrapper.eq(User::getUsername, user.getUsername());

        User one = userService.getOne(queryWrapper);
        if (one == null) {
            return R.error("用户不存在");
        }else if(!one.getPassword().equals(user.getPassword())){
            return R.error("密码错误");
        }

        String token = TokenUtils.createToken(user);
        one.setToken(token);
        userService.updateById(one);

        return R.success(one, "登录成功");
    }

    //注册
    @PostMapping("/register")
    public R register(@RequestBody User user) {
        log.info("register user: {}", user);

        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(User::getUsername, user.getUsername());
        User one = userService.getOne(queryWrapper);
        if (one != null) {
            return R.error("用户名已存在");
        }

        userService.save(user);
        return R.success(null,"注册成功");

    }
}
