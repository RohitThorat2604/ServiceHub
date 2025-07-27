package com.rohit.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.rohit.models.ServiceCategory;
import com.rohit.repositories.ServiceCategoryRepository;
import com.rohit.responseWrapper.MyResponseWrapper;

@Service
public class ServiceCategoryService {
    @Autowired private ServiceCategoryRepository serviceCategoryRepository;
    @Autowired private MyResponseWrapper responseWrapper;
    
    public ResponseEntity<?> addCategory(ServiceCategory category) {
        ServiceCategory saved = serviceCategoryRepository.save(category);
        responseWrapper.setMessage("Category created");
        responseWrapper.setData(saved);
        return new ResponseEntity<>(responseWrapper, HttpStatus.CREATED);
    }

    public ResponseEntity<?> getAllCategories() {
        List<ServiceCategory> categories = serviceCategoryRepository.findAll();
        if (categories.isEmpty()) {
            responseWrapper.setMessage("No categories found");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        } else {
            responseWrapper.setMessage("Categories found");
            responseWrapper.setData(categories);
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        }
    }
    
    public ResponseEntity<?> getCategoryById(Long id) {
        Optional<ServiceCategory> category = serviceCategoryRepository.findById(id);
        if (category.isPresent()) {
            responseWrapper.setMessage("Services found");
            responseWrapper.setData(category.get());
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        } else {
            responseWrapper.setMessage("Services not found");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
    }

 

    public ResponseEntity<?> updateCategory(Long id, ServiceCategory category) {
        if (serviceCategoryRepository.existsById(id)) {
            category.setId(id);
            ServiceCategory updated = serviceCategoryRepository.save(category);
            responseWrapper.setMessage("Category updated");
            responseWrapper.setData(updated);
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        } else {
            responseWrapper.setMessage("Category not found");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> deleteCategory(Long id) {
        if (serviceCategoryRepository.existsById(id)) {
            serviceCategoryRepository.deleteById(id);
            responseWrapper.setMessage("Category deleted");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        } else {
            responseWrapper.setMessage("Category not found");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
    }
}