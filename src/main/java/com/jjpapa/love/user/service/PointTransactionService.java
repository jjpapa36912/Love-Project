package com.jjpapa.love.user.service;

import com.jjpapa.love.user.repository.PointTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PointTransactionService {
  private final PointTransactionRepository pointTransactionRepository;

}
