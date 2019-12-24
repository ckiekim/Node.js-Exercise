module.exports =  {
    homeNav: function(sessionUser, weather) {
        if (sessionUser.userId !== undefined) {
            return `
                <h4><a href='/create'>글 쓰기</a>&nbsp;&nbsp;&nbsp;
                <a href='/logout'>로그아웃</a>&nbsp;&nbsp;&nbsp;
                ${sessionUser.userName} 님 환영합니다.&nbsp;&nbsp;&nbsp;${weather}</h4>
            `;
        } else {
            return `
                <h4><a href=#>글 쓰기</a>&nbsp;&nbsp;&nbsp;
                <a href='/login'>로그인</a>&nbsp;&nbsp;&nbsp;
                <a href='/register'>사용자 등록</a>&nbsp;&nbsp;&nbsp;${weather}</h4>
            `;
        }
    },
    tableRow: function(id, title, writer, ts) {
        return `
            <tr>
                <td>${id}</td>
                <td><a href="/?id=${id}">${title}</a></td>
                <td>${writer}</td>
                <td>${ts}</td>
                <td><a href="/update?id=${id}">수정</a>&nbsp;&nbsp;<a href="/delete?id=${id}">삭제</a></td>
            </tr>
        `;
    },
    navBar: function(sessionUser, weather) {
        if (sessionUser.userId !== undefined) {
            return `
                <h4><a href="/">홈으로</a>&nbsp;&nbsp;&nbsp;
                <a href='/logout'>로그아웃</a>&nbsp;&nbsp;&nbsp;
                ${sessionUser.userName} 님 환영합니다.&nbsp;&nbsp;&nbsp;${weather}</h4>
            `;
        } else {
            return `
                <h4><a href="/">홈으로</a>&nbsp;&nbsp;&nbsp;
                <a href='/login'>로그인</a>&nbsp;&nbsp;&nbsp;
                <a href='/register'>사용자 등록</a>&nbsp;&nbsp;&nbsp;${weather}</h4>        
            `;
        }
    },
    weather: function(city, min, max, ico) {
        return `
            <a href='/weather'>날씨:</a> ${city}&nbsp;&nbsp;<img src="${ico}" width="50" height="50">&nbsp;&nbsp;
            최저: ${min}&#8451;, 최고: ${max}&#8451;
        `;
    },
    weatherTable: function(result) {
        return `
            <table>
                <tr><th>항목</th><th>내용</th></tr>
                <tr><td>도시명:</td><td align="center">${result.name}</td></tr>
                <tr><td>경도:</td><td align="center">${result.coord.lon}&deg;</td></tr>
                <tr><td>위도:</td><td align="center">${result.coord.lat}&deg;</td></tr>
                <tr><td>기온:</td><td align="center">${result.main.temp}&#8451;</td></tr>
                <tr><td>체감온도:</td><td align="center">${result.main.feels_like}&#8451;</td></tr>
                <tr><td>최저기온:</td><td align="center">${result.main.temp_min}&#8451;</td></tr>
                <tr><td>최고기온:</td><td align="center">${result.main.temp_max}&#8451;</td></tr>
                <tr><td>습도:</td><td align="center">${result.main.humidity}%</td></tr>
                <tr><td>풍속:</td><td align="center">${result.wind.speed}m/sec</td></tr>
                <tr><td rowspan="2">풍향:</td><td align="center">${result.wind.deg}&deg;</td></tr>
                <tr><td align="center">(정북: 0, 정동: 90, 정남: 180, 정서: 270)</td></tr>
            </table>
        `;
    }
}