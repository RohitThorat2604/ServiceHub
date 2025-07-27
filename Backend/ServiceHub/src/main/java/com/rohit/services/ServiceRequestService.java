package com.rohit.services;

import com.rohit.models.ServiceCategory;
import com.rohit.models.ServiceProvider;
import com.rohit.models.ServiceRequest;
import com.rohit.models.User;
import com.rohit.repositories.ServiceCategoryRepository;
import com.rohit.repositories.ServiceProviderRepository;
import com.rohit.repositories.ServiceRequestRepository;
import com.rohit.repositories.UserRepository;
import com.rohit.responseWrapper.MyResponseWrapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ServiceRequestService {

    @Autowired private UserRepository userRepository;
    @Autowired private ServiceRequestRepository requestRepository;
    @Autowired private ServiceProviderRepository providerRepository;
    @Autowired private ServiceCategoryRepository categoryRepository;
    @Autowired private MyResponseWrapper responseWrapper;

   
    public ResponseEntity<?> createRequest(ServiceRequest request) {
        if (request.getUser() == null || request.getUser().getId() == null) {
            responseWrapper.setMessage("User is required");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.BAD_REQUEST);
        }

        Optional<User> userOpt = userRepository.findById(request.getUser().getId());
        if (userOpt.isEmpty()) {
            responseWrapper.setMessage("User not found");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }

        if (request.getServiceCategory() == null || request.getServiceCategory().getId() == null) {
            responseWrapper.setMessage("Service Category is required");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.BAD_REQUEST);
        }

        Optional<ServiceCategory> categoryOpt = categoryRepository.findById(request.getServiceCategory().getId());
        if (categoryOpt.isEmpty()) {
            responseWrapper.setMessage("Service Category not found");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }

        if (request.getServiceProvider() != null && request.getServiceProvider().getId() != null) {
            Optional<ServiceProvider> providerOpt = providerRepository.findById(request.getServiceProvider().getId());
            if (providerOpt.isEmpty()) {
                responseWrapper.setMessage("Service Provider not found");
                responseWrapper.setData(null);
                return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
            }
            request.setServiceProvider(providerOpt.get());
        }

        request.setUser(userOpt.get());
        request.setServiceCategory(categoryOpt.get());
        request.setStatus("PENDING");

        ServiceRequest saved = requestRepository.save(request);
        responseWrapper.setMessage("Service request submitted");
        responseWrapper.setData(saved);
        return new ResponseEntity<>(responseWrapper, HttpStatus.CREATED);
    }

  
    public ResponseEntity<?> getAllRequests() {
        List<ServiceRequest> list = requestRepository.findAll();
        if (list.isEmpty()) {
            responseWrapper.setMessage("No requests found");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        } else {
            responseWrapper.setMessage("All requests fetched");
            responseWrapper.setData(list);
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        }
    }

  
    public ResponseEntity<?> getRequestsByUser(Long userId) {
        List<ServiceRequest> list = requestRepository.findByUserId(userId);
        if (list.isEmpty()) {
            responseWrapper.setMessage("No requests for this user");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        } else {
            responseWrapper.setMessage("User requests fetched");
            responseWrapper.setData(list);
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        }
    }

 
    public long countRequests() {
        return requestRepository.count();
    }

 
    public ResponseEntity<?> updateStatus(Long requestId, String status) {
        Optional<ServiceRequest> reqOpt = requestRepository.findById(requestId);

        if (reqOpt.isEmpty()) {
            responseWrapper.setMessage("Service request not found");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        } else {
            if (!List.of("APPROVED", "REJECTED", "PENDING").contains(status.toUpperCase())) {
                responseWrapper.setMessage("Invalid status value: " + status);
                responseWrapper.setData(null);
                return new ResponseEntity<>(responseWrapper, HttpStatus.BAD_REQUEST);
            } else {
                ServiceRequest request = reqOpt.get();
                request.setStatus(status.toUpperCase());
                ServiceRequest updated = requestRepository.save(request);

                responseWrapper.setMessage("Service request status updated to " + status.toUpperCase());
                responseWrapper.setData(updated);
                return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
            }
        }
    }




    
    public ResponseEntity<?> getBookedSlotsByProviderAndDate(Long providerId, String dateStr) {
        Optional<ServiceProvider> providerOpt = providerRepository.findById(providerId);

        if (providerOpt.isEmpty()) {
            responseWrapper.setMessage("Service Provider not found");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }

        LocalDate date;
        try {
            date = LocalDate.parse(dateStr);
        } catch (Exception e) {
            responseWrapper.setMessage("Invalid date format, expected yyyy-MM-dd");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.BAD_REQUEST);
        }

        List<ServiceRequest> all = requestRepository.findByServiceProviderId(providerId);

        List<String> bookedTimes = all.stream()
                .filter(r -> r.getStatus().equalsIgnoreCase("APPROVED"))
                .filter(r -> r.getPreferredDateTime().toLocalDate().equals(date))
                .map(r -> r.getPreferredDateTime().toLocalTime().toString().substring(0, 5))
                .toList();

        if (bookedTimes.isEmpty()) {
            responseWrapper.setMessage("No booked slots found for this provider on " + dateStr);
            responseWrapper.setData(bookedTimes); 
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        } else {
            responseWrapper.setMessage("Booked slots fetched successfully");
            responseWrapper.setData(bookedTimes);
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        }
    }

}
