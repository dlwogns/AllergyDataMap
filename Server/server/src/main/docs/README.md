# 알러지 데이터 맵 백엔드 서버 

## 사용 기술
Spring framework 기반 서버 애플리케이션 <br>
Spring boot <br>
Spring JPA <br>
MySQL 

## 추후 사용 기술 일람
Auto CI/CD by github action <br>
Docker <br>
Cloud Service by AWS

## 기능 일람

## TODO
MicroService로 분리


### 지역 코드 관련 (관리자 기능)
- [x] 지역 코드 형식에 맞게 파싱
- [x] 지역 코드 데이터 디비에 저장

### 대기중 알러지 항원 API 


### 미세먼지 API
#### 데이터 추출
- [x] json 받아서 cityName, pm10value 파싱
- [x] 시도(경기, 강원, 서울 등등)별로 데이터 따로 쌓기
- [x] enum으로 시도 이름 받을 수 있게 설정
- [x] 시도 별 시 개수, 구 개수 알아내서 구현
- [x] 시도, 군구 별로 데이터 데이터베이스에 저장.
> 시도, 군구 합쳐서 primary key로 사용할 수 있도록 수정.
- [ ] 매일 새벽 4시에 갱신될 수 있도록 코드 수정.

#### client에 데이터 제공
- [ ] 전체 데이터를 json 다시 합쳐서 보내기
- [ ] 검색기능 구현시, 시도를 검색 받고 그에 따른 데이터 보내기
