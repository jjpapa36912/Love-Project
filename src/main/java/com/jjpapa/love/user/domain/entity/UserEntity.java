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
@Entity(name = "user")
public class UserEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_id")
  public Long userId;
  @Column(name = "username")
  public String username;
  @Column(name = "nick_name")
  public String nickname;
  @Column(name = "password")
  public String password;
  @Column(name = "point")
  public Double point;
  @Column(name = "updated_at")
  public LocalDateTime updatedAt;
  @Column(name = "created_at")
  public LocalDateTime createdAt;
}
