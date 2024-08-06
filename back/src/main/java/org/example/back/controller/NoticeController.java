package org.example.back.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.extern.slf4j.Slf4j;
import org.example.back.common.R;
import org.example.back.entity.Notice;
import org.example.back.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@Slf4j
@RequestMapping("/notice")
public class NoticeController{
    @Autowired
    private NoticeService noticeService;

    //增
    @PostMapping("/add")
    public R addNotice(@RequestBody Notice notice){
        notice.setTime(LocalDateTime.now());
        noticeService.save(notice);
        return R.success(null,"添加成功");
    }

    //删
    @DeleteMapping("/delete")
    public R deleteNotice(Integer id){
        noticeService.removeById(id);
        return R.success(null,"删除成功");
    }

    //改
    @PutMapping
    public R updateNotice(@RequestBody Notice notice){
        noticeService.updateById(notice);
        return R.success(null,"修改成功");
    }

    //查
    @GetMapping("/get")
    public R getNotice(Integer pageNum, Integer pageSize){
        log.info("pageNum:{},pageSize:{}", pageNum, pageSize);

        Page page = new Page(pageNum, pageSize);
        LambdaQueryWrapper<Notice> queryWrapper = new LambdaQueryWrapper<Notice>()
                .orderByAsc(Notice::getTime);

        noticeService.page(page, queryWrapper);
        return R.success(page,"查询成功");
    }
}
