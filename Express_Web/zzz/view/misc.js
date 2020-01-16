module.exports = {
    List: function(filelist) {
        var list = '<ul>\n';
        for (let file of filelist) {
            let item = file.substring(0, file.length-4);
            list += `<li><a href="/?title=${item}">${item}</a></li>\n`;
        }
        list += '</ul>';
        return list;
    },
    navMain: function() {
        return `<a href="/">홈으로</a>&nbsp;&nbsp;
                <a href="/create">글쓰기</a>`
    },
    navList: function(id) {
        return `<a href="/">홈으로</a>&nbsp;&nbsp;
                <a href="/update/${id}">수정하기</a>&nbsp;&nbsp;
                <a href="/delete/${id}">삭제하기</a>`;
    },
    navOp: function() {
        return `<a href="/">홈으로</a>`;
    },
    tableMain: function(row) {
        return `<tr>
            <td>${row.id}</td>
            <td style="text-align: left;"><a href="/id/${row.id}">${row.title}</a></td>
            <td>${row.userId}</td>
            <td>${row.ts}</td>
            <td style="text-align: right;">${row.hit}</td>
        </tr>`;
    },
    tableItem: function(row) {
        let _content = row.content.replace(/\r\n/g, '<br>');
        return `
            <tr><td>ID</td><td>${row.id}</td></tr>
            <tr><td>제목</td><td>${row.title}</td></tr>
            <tr><td>글쓴이</td><td>${row.userId}</td></tr>
            <tr><td>최종수정시간</td><td>${row.ts}</td></tr>
            <tr><td>조회수</td><td>${row.hit}</td></tr>
            <tr><td>내용</td><td>${_content}</td></tr>`;
    }
}