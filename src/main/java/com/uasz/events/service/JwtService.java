package com.uasz.events.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets; // Add this import
import java.util.Base64; // Add this import
import java.security.Key;
import java.util.Date;

@Component
public class JwtService {
	static final long EXPIRATIONTIME = 86400000; // 1 day in ms
	static final String PREFIX = "Bearer";
	// Generate secret key. Only for the demonstration
	// You should read it from the application configuration
	static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
	// Generate JWT token
	
	public String getToken(String username) {
		String token = Jwts.builder()
			  .setSubject(username)
			  .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
			  .signWith(key)
			  .compact();

		return token;
  }
	
	// Get a token from request Authorization header, 
	// parse a token and get username
	public String getAuthUser(HttpServletRequest request) {
		String token = request.getHeader(HttpHeaders.AUTHORIZATION);
		// System.out.println("The header is :"+token);
		
		if (token != null) {
			if (token.startsWith(PREFIX)) {
				// It's a JWT token, proceed with JWT parsing
				String user = Jwts.parserBuilder()
						.setSigningKey(key)
						.build()
						.parseClaimsJws(token.replace(PREFIX, "").trim())
						.getBody()
						.getSubject();

				if (user != null) {
					return user;
				}
			} else {
				// It's another type of token (e.g., Basic Auth), handle it accordingly
				if (token.startsWith("Basic ")) {
					// Extract username and password from Basic Auth token
					String base64Credentials = token.substring("Basic ".length()).trim();
					String credentials = new String(Base64.getDecoder().decode(base64Credentials), StandardCharsets.UTF_8);
					final String[] values = credentials.split(":", 2);
					if (values.length == 2) {
						String username = values[0];
						// You can use the username or password as needed
						return username;
					}
				}

				// If Basic Auth token is not valid or doesn't follow the expected format, handle accordingly
				// ...
			}
		}
		return null;
	}
}