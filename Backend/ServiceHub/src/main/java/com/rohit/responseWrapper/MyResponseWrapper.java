package com.rohit.responseWrapper;

	import lombok.Data;
	import org.springframework.stereotype.Component;

	@Component
	@Data
	public class MyResponseWrapper {
	    private String message;
	    private Object data;
	}

