package MapServer.LocationExcelParser.repository;

import MapServer.LocationExcelParser.domain.LocationData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationDataRepository extends JpaRepository<LocationData, Long> {
}
