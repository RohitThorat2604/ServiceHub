package com.rohit.models;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstname;
    private String lastname;
    private String email;
    private String password;	
    private String contact;
    private String role;
    
    
    @OneToMany(mappedBy = "user")
    @JsonIgnoreProperties("user")
    private List<ServiceRequest> serviceRequests;


}
