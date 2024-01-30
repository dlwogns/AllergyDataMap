package MapServer.server.user.repository;

import MapServer.server.user.domain.entity.UserEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    boolean existsByLoginId(String loginId);
    boolean existsByEmail(String email);
    Optional<UserEntity> findByLoginId(String loginId);
    Optional<UserEntity> findByEmail(String email);
}
