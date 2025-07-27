package com.rohit.controllers;

import com.rohit.models.ServiceRequest;
import com.rohit.repositories.ServiceRequestRepository;
import com.rohit.services.ServiceRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
public class ServiceRequestController {

    @Autowired
    private ServiceRequestService requestService;



    @PostMapping("/requests")
    public ResponseEntity<?> createRequest(@RequestBody ServiceRequest request) {
        return requestService.createRequest(request);
    }

    @GetMapping("/requests")
    public ResponseEntity<?> getAllRequests() {
        return requestService.getAllRequests();
    }
    
    @GetMapping("/requests/count")
    public ResponseEntity<Long> getRequestCount() {
        return ResponseEntity.ok(requestService.countRequests());
    }

    @GetMapping("/requests/user/{userId}")
    public ResponseEntity<?> getUserRequests(@PathVariable Long userId) {
        return requestService.getRequestsByUser(userId);
    }



    
    @PutMapping("/requests/status/{requestId}")
    public ResponseEntity<?> updateStatus(@PathVariable Long requestId,
                                          @RequestParam String status) {
        return requestService.updateStatus(requestId, status);
    }
    
    
    @GetMapping("/requests/bookedSlots")
    public ResponseEntity<?> getBookedSlots(
            @RequestParam Long providerId,
            @RequestParam String date) {
        return requestService.getBookedSlotsByProviderAndDate(providerId, date);
    }
    
}
