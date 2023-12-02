package MapServer.server.FineDust.repository;

import MapServer.server.FineDust.domain.FineDustData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FineDustRepository extends JpaRepository<FineDustData, Long> {
}
