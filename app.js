const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

app.use(express.static('public'));


app.get('/', (req,res) => {
    res.sendfile(__dirname + 'index.html');
});



app.listen(port, () => {
    console.log('listening on 3000');
});
