package org.example.back.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.extern.slf4j.Slf4j;
import org.example.back.common.R;
import org.example.back.entity.Enter;
import org.example.back.entity.Go;
import org.example.back.entity.Record;
import org.example.back.service.EnterService;
import org.example.back.service.GoService;
import org.example.back.service.RecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.stream.Collectors;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/record")
public class RecordController {
    @Autowired
    private RecordService recordService;

    @Autowired
    private GoService goService;

    @Autowired
    private EnterService enterService;

    //查(分页)
    @GetMapping("/get")
    public R getRecord(Integer pageSize, Integer pageNum,String state) {
        Go go = new Go();
        Enter enter = new Enter();

        List<Go> list = goService.list();
        List<Enter> list1 = enterService.list();

        //获取当前Record（出入校申请记录）
        List<Record> recordsAll = recordService.list();
        recordsAll.stream().map((item)->{
            return item;
        }).collect(Collectors.toList());

        //删除整个Record
        recordService.removeBatchByIds(recordsAll);

        //重新定义一个Record数组
        List<Record> records = new ArrayList<>();

        //将go（出校申请）中的数据赋值到records（申请记录）中
        list.stream().map((item)->{
            Record record = new Record();
            record.setUsername(item.getUsername());
            record.setTime(item.getTime());
            record.setState(item.getState());
            record.setReject(item.getReject());
            record.setReason(item.getReason());
            record.setNotes("");
            record.setType("出校申请");
            records.add(record);
            return records;
        }).collect(Collectors.toList());

        //将enter（返校申请）中的数据赋值到records（申请记录）中
        list1.stream().map((item)->{
            Record record = new Record();
            record.setUsername(item.getUsername());
            record.setTime(item.getTime());
            record.setState(item.getState());
            record.setReject(item.getReject());
            record.setReason("");
            record.setNotes(item.getNotes());
            record.setType("返校申请");
            records.add(record);
            return records;
        }).collect(Collectors.toList());

        //将records（申请记录）中的数据按照创建时间进行排序
        records.stream().sorted(Comparator.comparing(Record::getTime).reversed()).collect(Collectors.toList());

        //批量添加
        recordService.saveBatch(records);


        Page<Record> page = new Page<>(pageNum, pageSize);
        LambdaQueryWrapper<Record> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.like(Record::getState,state);
        queryWrapper.orderByDesc(Record::getTime);
        recordService.page(page, queryWrapper);

        return R.success(page,"查询成功");

    }
}
