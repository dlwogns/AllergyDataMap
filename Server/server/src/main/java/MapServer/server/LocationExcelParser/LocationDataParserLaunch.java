package MapServer.server.LocationExcelParser;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class LocationDataParserLaunch {
    @Autowired
    LocationDataParser locationDataParser;

    @GetMapping("/parse")
    public String launch(){
        log.info("launch start");
        locationDataParser.ParseData();
        return "ok";
    }
}
