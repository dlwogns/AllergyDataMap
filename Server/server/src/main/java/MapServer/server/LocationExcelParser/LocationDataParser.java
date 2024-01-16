package MapServer.server.LocationExcelParser;

import MapServer.server.LocationExcelParser.domain.LocationData;
import MapServer.server.LocationExcelParser.repository.LocationDataRepository;
import java.io.FileInputStream;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@AllArgsConstructor
public class LocationDataParser {
    private final LocationDataRepository locationDataRepository;
    public ResponseEntity ParseData(){
        try{

            FileInputStream file = new FileInputStream("/Users/ijaehun/Downloads/PollenAPI/code_file.xlsx");
            XSSFWorkbook xlsxfile = new XSSFWorkbook(file);

            // 이 파일은 시트가 한장이라 0으로 설정.
            XSSFSheet sheet = xlsxfile.getSheetAt(0);

            // 총 행의 수
            int rows = sheet.getPhysicalNumberOfRows();

            for(int rowidx = 0; rowidx < rows; rowidx++){
                XSSFRow rowdata = sheet.getRow(rowidx);
                if(rowdata == null) continue;
                String city_data = "";
                String district_code = "";
                for(int columnidx = 1; columnidx < 5; columnidx++){
                    XSSFCell celldata = rowdata.getCell(columnidx);
                    if(columnidx == 1){
                        district_code = celldata.toString();
                    }
                    if(columnidx != 1){
                        if(celldata == null) continue;
                        city_data += celldata.toString() + " ";
                    }
                }
                LocationData locationData = LocationData.builder()
                        .city(city_data)
                        .district_code(district_code)
                        .build();
                locationDataRepository.save(locationData);
            }
            return ResponseEntity.ok("지역 코드 저장 완료");
        }catch(Exception e){
            return ResponseEntity.status(202).body(e.getMessage());
        }
    }
}
