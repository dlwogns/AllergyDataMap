package MapServer.user.service;

import MapServer.user.domain.dto.JoinRequest;
import MapServer.user.domain.dto.LoginRequest;
import MapServer.user.domain.entity.UserEntity;
import MapServer.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    // Login by Spring Security
    // private final BCryptPasswordEncoder encoder;

    /**
     * login Id 중복 체크
     * 중복시 true return
     * @param loginId
     * @return
     */
    public boolean checkLoginIdDuplicate(String loginId) {
        return userRepository.existsByLoginId(loginId);
    }

    /**
     * 회원가입 1
     * @param req
     */
    public void join(JoinRequest req) {
        userRepository.save(req.toEntity());
    }

    /**
     * 회원가입 2
     * 비밀번호 암호화
     * @param req
     */
//    public void join2(JoinRequest req) {
//        userRepository.save(req.toEntity(encoder.encode(req.getPassword())));
//    }

    /**
     * 기본 로그인. 단순 비밀번호 비교
     * @param req
     * @return
     */
    public UserEntity login(LoginRequest req) {
        Optional<UserEntity> optionalUser = userRepository.findByLoginId(req.getLoginId());

        if(optionalUser.isEmpty())
            return null;

        UserEntity user = optionalUser.get();

        if(!user.getPassword().equals(req.getPassword())) {
            return null;
        }
        return user;
    }


    /**
     * 인증, 인가시 사용
     * @param userId
     * @return
     */
    public UserEntity getLoginUserById(String userId) {
        if(userId == null) return null;

        Optional<UserEntity> optionalUser = userRepository.findByLoginId(userId);
        if(optionalUser.isEmpty()) return null;

        return optionalUser.get();
    }




}
