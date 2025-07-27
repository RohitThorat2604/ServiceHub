package com.rohit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rohit.models.User;

public interface UserRepository extends JpaRepository<User, Long> {

	 
	User findByEmailAndPassword(String email, String password);

	User findByEmail(String email);

	
	}
