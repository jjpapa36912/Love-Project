package com.jjpapa.love.adreward.service;

import com.jjpapa.love.adreward.dto.RewardRequest;
import com.jjpapa.love.adreward.entity.RewardLog;
import com.jjpapa.love.adreward.repository.RewardLogRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

@Service
public class RewardService {

    private final RewardLogRepository rewardLogRepository;

    public RewardService(RewardLogRepository rewardLogRepository) {
        this.rewardLogRepository = rewardLogRepository;
    }

    public boolean isRewardAllowed(String userId) {
        long count = rewardLogRepository.countByUserIdAndRewardedAt(userId, LocalDate.now());
        return count < 5;
    }

    public void logRewardUsage(String userId) {
        RewardLog log = new RewardLog();
        log.setUserId(userId);
        log.setRewardedAt(LocalDate.now());
        rewardLogRepository.save(log);
    }
}