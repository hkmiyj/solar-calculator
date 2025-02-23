package com.hakimy.backend_rooftop.user.repository;

import com.hakimy.backend_rooftop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}

