package org.example.back.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.extern.slf4j.Slf4j;
import org.example.back.common.R;
import org.example.back.entity.Go;
import org.example.back.service.GoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/go")
public class GoController {
    @Autowired
    private GoService goService;

    //增
    @PostMapping("/add")
    public R add(@RequestBody Go go) {
        // 获取当前日期和时间
        LocalDateTime now = LocalDateTime.now();

        // 定义日期时间格式
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        go.setTime(now);

        goService.save(go);
        return R.success(null,"添加成功");
    }

    //删

    //改(状态)
    @PutMapping
    public R update(@RequestBody Go go) {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        go.setTime(now);
        goService.updateById(go);
        return R.success(null,"修改成功");
    }

    //查(分页)
    @GetMapping("/get")
    public R get(Integer pageNum ,Integer pageSize,String state) {
        log.info("pageNum:{},pageSize:{}",pageNum,pageSize);
        Page page = new Page(pageNum, pageSize);
        LambdaQueryWrapper<Go> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.like(Go::getState,state);
        queryWrapper.orderByDesc(Go::getTime);

        goService.page(page, queryWrapper);

        return R.success(page,"查询成功");
    }

    //查（通过Username）
    @GetMapping("/get/student")
    public R getStudent(Integer pageNum ,Integer pageSize,String username) {
        log.info("pageNum:{},pageSize:{}",pageNum,pageSize);
        if(pageNum == null || pageNum == 0){
            LambdaQueryWrapper<Go> queryWrapper = new LambdaQueryWrapper<>();
            queryWrapper.like(Go::getUsername,username);
            queryWrapper.orderByDesc(Go::getTime);
            List<Go> list = goService.list(queryWrapper);
            return R.success(list,"查询成功");
        }

        Page page = new Page(pageNum, pageSize);
        LambdaQueryWrapper<Go> queryWrapper1 = new LambdaQueryWrapper<>();
        queryWrapper1.eq(Go::getUsername,username);
        queryWrapper1.orderByDesc(Go::getTime);
        goService.page(page, queryWrapper1);

        return R.success(page,"查询成功");
    }

}
