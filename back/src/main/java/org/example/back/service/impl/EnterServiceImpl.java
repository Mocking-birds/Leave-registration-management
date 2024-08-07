package org.example.back.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.example.back.entity.Enter;
import org.example.back.mapper.EnterMapper;
import org.example.back.service.EnterService;
import org.springframework.stereotype.Service;

@Service
public class EnterServiceImpl extends ServiceImpl<EnterMapper, Enter> implements EnterService {
}
