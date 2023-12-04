package MapServer.server.FineDust.service;

import MapServer.server.FineDust.domain.FineDustData;
import MapServer.server.FineDust.repository.FineDustRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FineDustService {
    private final FineDustRepository fineDustRepository;

    @Autowired
    public FineDustService(FineDustRepository fineDustRepository) {
        this.fineDustRepository = fineDustRepository;
    }

    public void saveFineDustData(FineDustData fineDustData) {
        fineDustRepository.save(fineDustData);
    }

    public List<FineDustData> getAllFineDustData() {
        return fineDustRepository.findAll();
    }

    public List<FineDustData> searchByCityName(String cityName) {
        return fineDustRepository.findByCityNameContainingIgnoreCase(cityName);
    }
}
