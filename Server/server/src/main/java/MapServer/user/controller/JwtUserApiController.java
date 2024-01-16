package MapServer.user.controller;

import MapServer.user.domain.dto.JoinRequest;
import MapServer.user.domain.dto.LoginRequest;
import MapServer.user.domain.entity.UserEntity;
import MapServer.user.service.UserService;
import MapServer.utils.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class JwtUserApiController {

    private final UserService userService;


    @PostMapping("/join")
    public String join(@RequestBody JoinRequest joinRequest) {

        if(userService.checkLoginIdDuplicate(joinRequest.getLoginId())) {
            return "로그인 아이디 중복";
        }
        if(userService.checkEmailDuplicate((joinRequest.getEmail()))) {
            return "이메일 중복";
        }
        if(!joinRequest.getPassword().equals(joinRequest.getPasswordCheck())) {
            return "비밀번호를 다시 확인해 주세요";
        }
        userService.join(joinRequest);
        return "회원가입 성공";
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) {
        UserEntity user = userService.login(loginRequest);

        if(user == null) {
            return "로그인 실패";
        }

        //Value로 properity에 넣어버리기
        String secretKey = "my-secret-key";
        long expireTimeMs = 1000 * 60 * 60; // 유효시간 60분
        String jwtToken = JwtTokenUtil.createToken(user.getLoginId(), secretKey, expireTimeMs);

        return jwtToken;
    }

    @GetMapping("/info")
    public String userInfo(Authentication auth) {
        UserEntity loginUser = userService.getLoginUserById(auth.getName());
        return String.format("loginId: %s,\nrole: %s", loginUser.getLoginId(), loginUser.getRole().name());
    }
}
