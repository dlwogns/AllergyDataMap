package MapServer.server.LocationExcelParser;

import MapServer.server.LocationExcelParser.repository.LocationDataRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class LocationDataParserLaunch {
    @Autowired
    LocationDataParser locationDataParser;
    @Autowired
    LocationDataRepository locationDataRepository;

    @GetMapping("/parse")
    public String launch(){
        log.info("launch start");
        if(locationDataRepository.count() > 0){
            return "data already exists";
        }
        locationDataParser.ParseData();
        return "ok";
    }
}
