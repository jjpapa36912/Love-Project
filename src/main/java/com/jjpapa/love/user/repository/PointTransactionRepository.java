package com.jjpapa.love.user.repository;

import com.jjpapa.love.user.domain.entity.PointTransactionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PointTransactionRepository extends
    JpaRepository<PointTransactionEntity, Long> {

}
