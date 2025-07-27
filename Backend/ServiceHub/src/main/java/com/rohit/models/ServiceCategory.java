package com.rohit.models;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Data
public class ServiceCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

   
    private String description;

   
    @OneToMany(mappedBy = "serviceCategory")
    @JsonIgnoreProperties("serviceCategory")
    private List<ServiceProvider> serviceProviders;


    
    @OneToMany(mappedBy = "serviceCategory")
    @JsonIgnore
    private List<ServiceRequest> serviceRequests;
}
