package MapServer.server.FineDust.repository;

import MapServer.server.FineDust.domain.FineDustData;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FineDustRepository extends JpaRepository<FineDustData, Long> {
    List<FineDustData> findByCityNameContainingIgnoreCase(String cityName);
}
