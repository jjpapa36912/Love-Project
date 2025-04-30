package com.jjpapa.love.adreward.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RewardRequest {
    private String userId;
    private int amount; // 선택 사항: 프론트에서 보상 금액 전달 시 사용
}