package MapServer.server.FineDust.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "finedust")
public class FineDustData {

    @Id
    private String cityName;

    @Column(name = "pm10value", nullable = false)
    private long pm10value;

    @Column(name = "dataTime", nullable = false)
    private String dataTime;
}
