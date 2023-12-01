package MapServer.server.FineDust.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "finedust")
public class FineDustData {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "sidoName", nullable = false, length = 10)
    private String sidoName;

    @Column(name = "cityName", nullable = false, length = 10)
    private String cityName;

    @Column(name = "pm10value", nullable = false)
    private long pm10value;
}
