package MapServer.server.FineDust.service;

import MapServer.server.FineDust.domain.FineDustData;
import MapServer.server.FineDust.repository.FineDustRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FineDustService {
    private final FineDustRepository fineDustRepository;

    @Autowired
    public FineDustService(FineDustRepository fineDustRepository){
        this.fineDustRepository = fineDustRepository;
    }
    public void saveFineDustData(String cityName, int pm10value){
        FineDustData fineDustData = new FineDustData();
        fineDustData.setCityName(cityName);
        fineDustData.setPm10value(pm10value);
        fineDustRepository.save(fineDustData);
    }
}
