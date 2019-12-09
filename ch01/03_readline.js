var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
}); 

rl.setPrompt('>> ');
rl.prompt();
rl.on('line', function (cmd) {
    console.log('You just typed: '+cmd);
});

/*
readline.cursorTo(process.stdout, 60, 30);
rl.on('line', function (cmd) {
    console.log('You just typed: '+cmd);
});
*/