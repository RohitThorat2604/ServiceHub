package com.rohit.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rohit.models.ServiceCategory;
import com.rohit.models.ServiceProvider;

@Repository
public interface ServiceProviderRepository extends JpaRepository<ServiceProvider, Long> {
	List<ServiceProvider> findByServiceCategoryId(Long categoryId);
	


	
}
