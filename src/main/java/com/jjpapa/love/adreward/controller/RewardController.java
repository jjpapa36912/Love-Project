package com.jjpapa.love.adreward.controller;

import com.jjpapa.love.adreward.dto.RewardRequest;
import com.jjpapa.love.adreward.service.RewardService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/reward")
public class RewardController {

    private final RewardService rewardService;

    public RewardController(RewardService rewardService) {
        this.rewardService = rewardService;
    }

    @GetMapping("/available")
    public ResponseEntity<?> isAvailable(@RequestParam String userId) {
        boolean allowed = rewardService.isRewardAllowed(userId);
        return ResponseEntity.ok(Map.of("allowed", allowed));
    }

    @PostMapping("/claim")
    public ResponseEntity<?> claimReward(@RequestBody RewardRequest req) {
        if (!rewardService.isRewardAllowed(req.getUserId())) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("일일 보상 한도 초과");
        }

        rewardService.logRewardUsage(req.getUserId());
        // TODO: 코인 지급 로직 추가

        return ResponseEntity.ok("보상 지급 완료");
    }
}