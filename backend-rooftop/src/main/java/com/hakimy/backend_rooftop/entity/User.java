package com.hakimy.backend_rooftop.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "\\d{10,15}", message = "Invalid phone number format")
    private String phoneNumber;

    @Email(message = "Invalid email format")
    private String email;
}

