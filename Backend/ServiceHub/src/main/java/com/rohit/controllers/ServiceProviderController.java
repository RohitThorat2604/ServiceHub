package com.rohit.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.rohit.models.ServiceProvider;
import com.rohit.services.ServiceProviderService;

@RestController
	@CrossOrigin("*")
	public class ServiceProviderController {

	    @Autowired
	    private ServiceProviderService serviceProviderService;

	    @GetMapping("/providers")
	    public ResponseEntity<?> getAllProviders() {
	        return serviceProviderService.getAllProviders();
	    }
	    
	    @GetMapping("/providers/count")
	    public ResponseEntity<Long> getProviderCount() {
	        return ResponseEntity.ok(serviceProviderService.countProviders());
	    }

	    @GetMapping("/providers/category/{categoryId}")
	    public ResponseEntity<?> getProvidersByCategory(@PathVariable Long categoryId) {
	        return serviceProviderService.getProvidersByCategory(categoryId);
	    }

	    @PostMapping("/providers/add/{categoryId}")
	    public ResponseEntity<?> addProvider(@RequestBody ServiceProvider provider,@PathVariable Long categoryId) {
	        return serviceProviderService.addProvider(provider, categoryId);
 	    }

	    @GetMapping("/providers/{providerId}")
	    public ResponseEntity<?> getProviderById(@PathVariable Long providerId){
	    	return serviceProviderService.getProviderById(providerId);
	    }
	    
	    @PutMapping("/providers/{providerId}")
	    public ResponseEntity<?> updateProvider(@PathVariable Long providerId, @RequestBody ServiceProvider provider) {
	        return serviceProviderService.updateProvider(providerId, provider);
	    }

	    @DeleteMapping("/providers/{providerId}")
	    public ResponseEntity<?> deleteProvider(@PathVariable Long providerId) {
	        return serviceProviderService.deleteProvider(providerId);
	    }
	}
