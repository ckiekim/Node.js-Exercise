module.exports = {
    tableRows: function(row) {
        return `
            <tr>
                <td>${row.id}</td>
                <td><a href="/id/${row.id}">${row.title}</a></td>
                <td>${row.name}</td>
                <td>${row.ts}</td>
                <td><a href="/update/${row.id}">수정</a>&nbsp;&nbsp;<a href="/delete/${row.id}">삭제</a></td>
            </tr>
        `;
    }
}