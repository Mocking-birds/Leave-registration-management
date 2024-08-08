package org.example.back.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.example.back.entity.Record;
import org.example.back.mapper.RecordMapper;
import org.springframework.stereotype.Service;
import org.example.back.service.RecordService;

@Service
public class RecordServiceImpl extends ServiceImpl<RecordMapper, Record> implements RecordService {
}
