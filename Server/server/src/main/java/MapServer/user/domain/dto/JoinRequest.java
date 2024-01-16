package MapServer.user.domain.dto;

import MapServer.user.domain.UserRole;
import MapServer.user.domain.entity.UserEntity;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class JoinRequest {
    @NotBlank(message = "로그인 아이디 없음")
    private String loginId;

    @NotBlank(message = "비밀번호 없음")
    private String password;
    private String passwordCheck; // 패스워드 확인 문구

    @NotBlank(message = "이메일 없음")
    private String email;

    private String cityName;
    private String cityDtl;

    public UserEntity toEntity(){
        return UserEntity.builder()
                .loginId(this.loginId)
                .password(this.password)
                .email(this.email)
                .role(UserRole.USER)
                .build();
    }

    public UserEntity toEntity(String encodedPassword){
        return UserEntity.builder()
                .loginId(this.loginId)
                .password(encodedPassword)
                .email(this.email)
                .role(UserRole.USER)
                .cityName(this.cityName)
                .cityDtl(this.cityDtl)
                .build();
    }



}
