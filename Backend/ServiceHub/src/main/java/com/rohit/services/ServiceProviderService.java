package com.rohit.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.rohit.models.ServiceCategory;
import com.rohit.models.ServiceProvider;
import com.rohit.repositories.ServiceCategoryRepository;
import com.rohit.repositories.ServiceProviderRepository;
import com.rohit.responseWrapper.MyResponseWrapper;

@Service
public class ServiceProviderService {
    @Autowired private ServiceProviderRepository serviceProviderRepository;
    @Autowired private ServiceCategoryRepository serviceCategoryRepository;
    @Autowired private MyResponseWrapper responseWrapper;
    
    
    public ResponseEntity<?> addProvider(ServiceProvider provider, Long categoryId) {
        Optional<ServiceCategory> category = serviceCategoryRepository.findById(categoryId);
        if (category.isPresent()) {
            provider.setServiceCategory(category.get());
            ServiceProvider saved = serviceProviderRepository.save(provider);
            responseWrapper.setMessage("Provider created");
            responseWrapper.setData(saved);
            return new ResponseEntity<>(responseWrapper, HttpStatus.CREATED);
        } else {
            responseWrapper.setMessage("Category not found");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> getAllProviders() {
        List<ServiceProvider> providers = serviceProviderRepository.findAll();
        if (providers.isEmpty()) {
            responseWrapper.setMessage("No providers found");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        } else {
            responseWrapper.setMessage("Providers found");
            responseWrapper.setData(providers);
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        }
    }
    
    public long countProviders() {
        return serviceProviderRepository.count();
    }

    public ResponseEntity<?> getProvidersByCategory(Long categoryId) {
    	Optional<ServiceCategory> category = serviceCategoryRepository.findById(categoryId);
    	if (category.isPresent()) {
    	    List<ServiceProvider> providers = category.get().getServiceProviders();
    	    if (providers.isEmpty()) {
    	        responseWrapper.setMessage("No providers found for category");
    	        responseWrapper.setData(null);
    	        return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
    	    } else {
    	        responseWrapper.setMessage("Providers found for category");
    	        responseWrapper.setData(providers);
    	        return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
    	    }
    	} else {
    	    responseWrapper.setMessage("Category not found");
    	    responseWrapper.setData(null);
    	    return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
    	}
    }

    public ResponseEntity<?> getProviderById(Long id) {
        Optional<ServiceProvider> optionalProvider = serviceProviderRepository.findById(id);

        if (optionalProvider.isPresent()) {
            responseWrapper.setMessage("Provider found");
            responseWrapper.setData(optionalProvider.get());
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        } else {
            responseWrapper.setMessage("Provider not found");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
    }


 

    public ResponseEntity<?> updateProvider(Long id, ServiceProvider provider) {
        if (serviceProviderRepository.existsById(id)) {
            provider.setId(id);
            ServiceProvider updated = serviceProviderRepository.save(provider);
            responseWrapper.setMessage("Provider updated");
            responseWrapper.setData(updated);
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        } else {
            responseWrapper.setMessage("Provider not found");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> deleteProvider(Long id) {
        if (serviceProviderRepository.existsById(id)) {
            serviceProviderRepository.deleteById(id);
            responseWrapper.setMessage("Provider deleted");
            responseWrapper.setData(null);
            
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        } else {
            responseWrapper.setMessage("Provider not found");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
    }
}