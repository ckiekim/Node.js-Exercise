let express = require('express');
let app = express();
let indexDir = `/public`;
app.use(express.static(__dirname + indexDir));

app.listen(8843, function () {
    console.log(`Server running`);
});