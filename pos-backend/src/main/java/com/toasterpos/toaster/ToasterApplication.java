package com.toasterpos.toaster;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class ToasterApplication {

	public static void main(String[] args) {
		SpringApplication.run(ToasterApplication.class, args);
	}

}
