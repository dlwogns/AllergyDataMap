package MapServer.server.FineDust.domain;


public enum sidoNameinKorea {
    SEOUL("서울", 25),
    BUSAN("부산", 16),
    DAEGU("대구", 8),
    INCHEON("인천", 8),
    GWANGJU("광주", 5),
    DAEJEON("대전", 5),
    ULSAN("울산", 5),
    GYEONGGI("경기", 31),
    GANGWON("강원", 18),
    CHUNGBUK("충북", 11),
    CHUNGNAM("충남", 15),
    JEONBUK("전북", 14),
    JEONNAM("전남", 22),
    GYEONGBUK("경북", 23),
    GYEONGNAM("경남", 18),
    JEJU("제주", 2),
    SEJONG("세종", 1);
    private final String sidoName;
    private final int numberofsido;

    sidoNameinKorea(String sidoName, int numberofsido) {
        this.sidoName = sidoName;
        this.numberofsido = numberofsido;
    }

    public String getSidoName() {
        return sidoName;
    }
    public int getNumberofsido(){
        return numberofsido;
    }
}
