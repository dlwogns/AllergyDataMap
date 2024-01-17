package MapServer.server.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;

public class JwtTokenUtil {

    /**
     * 토큰 발급
     * @param loginId
     * @param key
     * @param expireTimeMs
     * @return
     */
    public static String createToken(String loginId, String key, long expireTimeMs) {
        // Claim = Jwt Token에 들어갈 정보.
        // Claim에 loginId를 넣어줌으로써 나중에 꺼낼 수 있음.
        Claims claims = Jwts.claims();
        claims.put("loginId", loginId);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()))
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
    }

    /**
     * extractClaims의 결과에서 id 꺼내기
     * @param token
     * @param secretKey
     * @return
     */
    public static String getLoginId(String token, String secretKey) {
        return extractClaims(token, secretKey).get("loginId").toString();
    }

    /**
     * Token 만료 시간이 지났는지 확인
     * @param token
     * @param secretKey
     * @return
     */
    public static boolean isExpired(String token, String secretKey) {
        Date expiredDate = extractClaims(token, secretKey).getExpiration();
        return expiredDate.before(new Date());
    }

    /**
     * SecretKey를 사용해 token parsing
     * @param token
     * @param secretKey
     * @return
     */
    private static Claims extractClaims(String token, String secretKey){
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
    }
}
