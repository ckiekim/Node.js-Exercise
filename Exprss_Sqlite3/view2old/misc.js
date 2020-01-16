module.exports =  {
    homeNav: function(sessionUser) {
        if (sessionUser.userId !== undefined) {
            return `
                <h4><a href='/create'>글 쓰기</a>&nbsp;&nbsp;&nbsp;
                <a href='/logout'>로그아웃</a>&nbsp;&nbsp;&nbsp;
                ${sessionUser.userName} 님 환영합니다.</h4>
            `;
        } else {
            return `
                <h4><a href=#>글 쓰기</a>&nbsp;&nbsp;&nbsp;
                <a href='/login'>로그인</a>&nbsp;&nbsp;&nbsp;
                <a href='/register'>사용자 등록</a></h4>
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
    navBar: function(sessionUser) {
        if (sessionUser.userId !== undefined) {
            return `
                <h4><a href="/">홈으로</a>&nbsp;&nbsp;&nbsp;
                <a href='/logout'>로그아웃</a>&nbsp;&nbsp;&nbsp;
                ${sessionUser.userName} 님 환영합니다.</h4>
            `;
        } else {
            return `
                <h4><a href="/">홈으로</a>&nbsp;&nbsp;&nbsp;
                <a href='/login'>로그인</a>&nbsp;&nbsp;&nbsp;
                <a href='/register'>사용자 등록</a></h4>        
            `;
        }
    }
}