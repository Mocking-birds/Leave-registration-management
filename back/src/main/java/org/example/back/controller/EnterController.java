package org.example.back.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.extern.slf4j.Slf4j;
import org.example.back.common.R;
import org.example.back.entity.Enter;
import org.example.back.service.EnterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@Slf4j
@RequestMapping("/enter")
public class EnterController {
    @Autowired
    private EnterService enterService;

    //增
    @PostMapping("/add")
    public R addEnter(@RequestBody Enter enter) {
        // 获取当前日期和时间
        LocalDateTime now = LocalDateTime.now();

        // 定义日期时间格式
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        enter.setTime(now);

        enterService.save(enter);

        return R.success(null,"添加成功");
    }

    //删

    //改
    @PutMapping
    public R updateEnter(@RequestBody Enter enter) {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        enter.setTime(now);
        enterService.updateById(enter);
        return R.success(null,"修改成功");
    }

    //查（分页）
    @GetMapping("/get")
    public R getEnter(Integer pageNum, Integer pageSize,String state) {
        Page page = new Page(pageNum, pageSize);
        LambdaQueryWrapper<Enter> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.like(Enter::getState, state);
        queryWrapper.orderByDesc(Enter::getTime);

        enterService.page(page, queryWrapper);

        return R.success(page,"查询成功");

    }

}
