package com.jjpapa.love.user.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "point_transaction")
public class PointTransactionEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "point_transaction_id")
  public Long pointTransactionId;
  @Column(name = "user_id")
  public Long userId;
  @Column(name = "type")
  public String type;
  @Column(name = "amount")
  public Double amount;
  @Column(name = "total_amount")
  public Double totalAmount;
  @Column(name = "description")
  public String description;
  @Column(name = "created_at")
  public LocalDateTime createdAt;

}
