package MapServer.server.config;

import MapServer.server.user.domain.UserRole;
import MapServer.server.user.service.UserService;
import MapServer.server.utils.JwtTokenFilter;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserService userService;
    private static String secretKey = "my-secret-key";

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .httpBasic((httpbasic) ->
                        httpbasic.disable())
                .csrf((csrf) ->
                        csrf.disable())
                .sessionManagement((session) ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .formLogin((formlogin) ->
                        formlogin.disable())
                .addFilterBefore(new JwtTokenFilter(userService, secretKey), UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests((requests) ->{
                        requests.requestMatchers("/home").permitAll();
                        requests.requestMatchers("/finedust/**").permitAll();
                        requests.anyRequest().authenticated();
                })
                .exceptionHandling((exception) -> exception.accessDeniedPage("/"));
        return httpSecurity.build();
    }
}
