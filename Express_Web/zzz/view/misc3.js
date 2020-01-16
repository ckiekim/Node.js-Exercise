module.exports = {
    navMain:    function(userName) {
                    if (userName !== undefined) {
                        return `<a href="/create">글쓰기</a>&nbsp;&nbsp;
                                <a href="/logout">로그아웃</a>&nbsp;&nbsp;
                                ${userName} 님 환영합니다.`;
                    } else {
                        return `<a href="/">홈으로</a>&nbsp;&nbsp;
                                <a href='/login'>로그인</a>&nbsp;&nbsp;
                                <a href='/register'>사용자 등록</a>`;
                    }
                },
    navList:    function(userName, id) {
                    if (userName !== undefined) {
                        return `<a href="/">홈으로</a>&nbsp;&nbsp;
                                <a href="/create">글쓰기</a>&nbsp;&nbsp;
                                <a href="/update/${id}">수정하기</a>&nbsp;&nbsp;
                                <a href="/delete/${id}">삭제하기</a>&nbsp;&nbsp;
                                <a href="/logout">로그아웃</a>&nbsp;&nbsp;
                                ${userName} 님 환영합니다.`;  
                    } else {
                        return `<a href="/">홈으로</a>&nbsp;&nbsp;
                                <a href='/login'>로그인</a>&nbsp;&nbsp;
                                <a href='/register'>사용자 등록</a>`;
                    }
                },
    navOp:      function(req) {
                    if (req.session.userId !== undefined) {
                        return `<a href="/">홈으로</a>&nbsp;&nbsp;
                                <a href="/logout">로그아웃</a>&nbsp;&nbsp;
                                ${req.session.userName} 님 환영합니다.`;  
                    } else {
                        return `<a href="/">홈으로</a>&nbsp;&nbsp;
                                <a href='/login'>로그인</a>&nbsp;&nbsp;
                                <a href='/register'>사용자 등록</a>`;
                    }
                },
    navUser:   function() {
                    return `<a href="/">홈으로</a>`;
                },
    tableMain:  function(row) {
                    return `<tr>
                        <td>${row.id}</td>
                        <td style="text-align: left;"><a href="/id/${row.id}">${row.title}</a></td>
                        <td>${row.name}</td>
                        <td>${row.ts}</td>
                        <td style="text-align: right;">${row.hit}</td>
                    </tr>`;
                },
    tableItem:  function(id, title, userId, ts, hit, content) {
                    return `
                        <tr><td>ID</td><td>${id}</td></tr>
                        <tr><td>제목</td><td>${title}</td></tr>
                        <tr><td>글쓴이</td><td>${userId}</td></tr>
                        <tr><td>최종수정시간</td><td>${ts}</td></tr>
                        <tr><td>조회수</td><td>${hit}</td></tr>
                        <tr><td>내용</td><td>${content}</td></tr>`;
                }
}