package com.rohit.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rohit.models.ServiceCategory;
import com.rohit.services.ServiceCategoryService;

@RestController
@CrossOrigin("*")
public class ServiceCategoryController {

    @Autowired
    private ServiceCategoryService serviceCategoryService;

    @GetMapping("/services")
    public ResponseEntity<?> getAllCategories() {
        return serviceCategoryService.getAllCategories();
    }

    @GetMapping("/services/{categoryId}")
    public ResponseEntity<?> getCategoryById(@PathVariable Long categoryId) {
        return serviceCategoryService.getCategoryById(categoryId);
    }

    @PostMapping("/services/add")
    public ResponseEntity<?> addCategory(@RequestBody ServiceCategory category) {
        return serviceCategoryService.addCategory(category);
    }

    @PutMapping("/services/{categoryId}")
    public ResponseEntity<?> updateCategory(@PathVariable Long categoryId, @RequestBody ServiceCategory category) {
        return serviceCategoryService.updateCategory(categoryId, category);
    }

    @DeleteMapping("/services/{categoryId}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long categoryId) {
        return serviceCategoryService.deleteCategory(categoryId);
    }
}

