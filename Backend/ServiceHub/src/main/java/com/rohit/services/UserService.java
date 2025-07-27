package com.rohit.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.rohit.models.ServiceCategory;
import com.rohit.models.ServiceProvider;
import com.rohit.models.User;
import com.rohit.repositories.UserRepository;
import com.rohit.responseWrapper.MyResponseWrapper;

@Service
public class UserService {
    @Autowired private UserRepository userRepository;
    @Autowired private MyResponseWrapper responseWrapper;
    
    
    
    
    public ResponseEntity<?> registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            responseWrapper.setMessage("Email already registered");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_ACCEPTABLE);
        }
        else {
        	 User savedUser = userRepository.save(user);
             responseWrapper.setMessage("User registered successfully");
             responseWrapper.setData(savedUser);
             return new ResponseEntity<>(responseWrapper, HttpStatus.CREATED);
        }
    }


    
    public ResponseEntity<?> loginUser(User user) {
        User existingUser = userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
        if (existingUser != null) {
            responseWrapper.setMessage("Login successful");
            responseWrapper.setData(existingUser);
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        } else {
            responseWrapper.setMessage("Invalid email or password");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.UNAUTHORIZED);
        }
    }

    public ResponseEntity<?> addUser(User user) {
        User saved = userRepository.save(user);
        responseWrapper.setMessage("User created");
        responseWrapper.setData(saved);
        return new ResponseEntity<>(responseWrapper, HttpStatus.CREATED);
    }
    

    public ResponseEntity<?> getAllUsers() {
        List<User> users = userRepository.findAll();
        if (users.isEmpty()) {
            responseWrapper.setMessage("No users found");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        } else {
            responseWrapper.setMessage("Users found");
            responseWrapper.setData(users);
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        }
    }
    
    public long countUsers() {
        return userRepository.count(); 
    }
    
    


    public ResponseEntity<?> getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);

        if (user.isPresent()) {
            responseWrapper.setMessage("User found");
            responseWrapper.setData(user.get());
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        } else {
            responseWrapper.setMessage("User not found");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
    }



    public ResponseEntity<?> updateUser(Long id, User user) {
        if (userRepository.existsById(id)) {
            user.setId(id);
            User updated = userRepository.save(user);
            responseWrapper.setMessage("User updated");
            responseWrapper.setData(updated);
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        } else {
            responseWrapper.setMessage("User not found");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            responseWrapper.setMessage("User deleted");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        } else {
            responseWrapper.setMessage("User not found");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
    }
}