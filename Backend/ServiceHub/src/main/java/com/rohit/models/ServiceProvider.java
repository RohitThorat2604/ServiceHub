package com.rohit.models;



import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ServiceProvider {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String contact;
    private double serviceCharges;

    @ManyToOne
    @JoinColumn(name = "category_id")
    
    @JsonIgnoreProperties("serviceProviders") 
    private ServiceCategory serviceCategory;
    

    @OneToMany(mappedBy = "serviceProvider")
    @JsonIgnore
    private List<ServiceRequest> serviceRequests;
}
