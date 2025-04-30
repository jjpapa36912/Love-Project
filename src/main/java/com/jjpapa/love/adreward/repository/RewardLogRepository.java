package com.jjpapa.love.adreward.repository;

import com.jjpapa.love.adreward.entity.RewardLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;

public interface RewardLogRepository extends JpaRepository<RewardLog, Long> {
    long countByUserIdAndRewardedAt(String userId, LocalDate rewardedAt);
}