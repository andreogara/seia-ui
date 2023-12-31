const http = require("http");
const fs = require("fs");
const port = process.env.PORT || 9000;

const requestListener = function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    if (req.method === "POST") {
        let chunk = '';
        req.on('data', function(data) {
           chunk += data;
        });
        req.on('end', function(){
            fs.writeFileSync(__dirname+'/database/data.json', chunk);
            res.end(JSON.stringify({success: true}))
        });
    }
    if (req.method === "GET") {
        fs.readFile(__dirname+'/database/data.json', 'utf8', function(err, data){
            if(err) {
                res.end(JSON.stringify(data));
            }
            res.end(JSON.stringify(data));
        });
    }
};

const server = http.createServer(requestListener);
server.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});