package org.example.back.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.example.back.entity.Go;
import org.example.back.mapper.GoMapper;
import org.example.back.service.GoService;
import org.springframework.stereotype.Service;

@Service
public class GoServiceImpl extends ServiceImpl<GoMapper, Go> implements GoService {
}
