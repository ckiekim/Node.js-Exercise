module.exports =  {
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