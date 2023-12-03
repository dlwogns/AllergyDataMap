package MapServer.server.FineDust.controller;

import MapServer.server.FineDust.domain.FineDustData;
import MapServer.server.FineDust.service.FineDustService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/finedust")
@PropertySource("classpath:finedust.properties")
@RequiredArgsConstructor
@Slf4j
public class FineDustController {
    @Autowired
    private final RestTemplate restTemplate;

    @Autowired
    private final FineDustService fineDustService;
    @Value("${apiUrl}")
    private String apiUrl;
    @Value("${returnType}")
    private String returnType;
    @Value("${serviceKey}")
    private String serviceKey;

    @GetMapping("/save")
    public ResponseEntity<String> getDataFromApi() throws URISyntaxException {

        // todo
        // ENUM으로 변경
        String[] sidoNameList = {"서울", "부산", "대구", "인천", "광주", "대전", "울산", "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주", "세종"};

        for(String sidoName : sidoNameList){
            UriComponentsBuilder builder = setURL(sidoName);
            URI uri = new URI(builder.toUriString());
            String jsonString = restTemplate.getForObject(uri, String.class);
            ObjectMapper objectMapper = new ObjectMapper();
            List<FineDustData> fineDustDataBysidoName = parseData(jsonString, objectMapper, sidoName);
            for(FineDustData fineDustData : fineDustDataBysidoName){
                fineDustService.saveFineDustData(fineDustData);
            }
        }
        return ResponseEntity.ok("Data saved");
    }
    private UriComponentsBuilder setURL(String sidoName){
        String searchCondition = "DAILY";
        int pageNo = 1;
        int numOfRows = 25;

        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(apiUrl)
                .queryParam("sidoName", sidoName)
                .queryParam("searchCondition", searchCondition)
                .queryParam("pageNo", pageNo)
                .queryParam("numOfRows", numOfRows)
                .queryParam("returnType", returnType)
                .queryParam("serviceKey", serviceKey);
        return builder;
    }
    private List<FineDustData> parseData(String jsonString, ObjectMapper objectMapper, String sidoName){
        try{
            JsonNode jsonNode = objectMapper.readTree(jsonString);
            JsonNode itemsNode = jsonNode.path("response").path("body").path("items");
            List<FineDustData> fineDustDataList = new ArrayList<>();
            for(JsonNode item : itemsNode){
                String cityName = sidoName +" "+ item.path("cityName").asText();
                int pm10Value = item.path("pm10Value").asInt();
                FineDustData fineDustData = new FineDustData();
                fineDustData.setCityName(cityName);
                fineDustData.setPm10value(pm10Value);
                fineDustDataList.add(fineDustData);
            }
            return fineDustDataList;
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
