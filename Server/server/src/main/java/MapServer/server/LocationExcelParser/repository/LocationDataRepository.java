package MapServer.server.LocationExcelParser.repository;

import MapServer.server.LocationExcelParser.domain.LocationData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationDataRepository extends JpaRepository<LocationData, Long> {
}
