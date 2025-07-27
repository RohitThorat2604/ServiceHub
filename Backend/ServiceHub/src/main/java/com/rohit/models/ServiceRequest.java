package com.rohit.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Data
public class ServiceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String status;

    private LocalDateTime preferredDateTime;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties("serviceRequests")
    private User user;

    @ManyToOne
    @JoinColumn(name = "provider_id")
    @JsonIgnoreProperties("serviceRequests")
    private ServiceProvider serviceProvider;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonIgnoreProperties({"serviceProviders", "serviceRequests"})
    private ServiceCategory serviceCategory;
}
