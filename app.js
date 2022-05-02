const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json({ limit: '5gb', extended: true }))
app.use(express.urlencoded({ limit: '5gb', extended: true }))
 
    var whitelist = [
        'http://localhost:5000'
    ];
 
    function isOriginAllowed(origin) {
        console.log(
            "new origin",
            origin,
            whitelist,
            whitelist.indexOf(origin) !== -1
        );
        return true //whitelist.indexOf(origin) !== -1;
    }
 
    var corsOptions = function (req, cb) {
        var origin = req.header("Origin") || req.headers.origin;
        console.log("Origin: ", origin);
        const originFromHost = req.protocol + "://" + req.hostname;
        console.log("Origin from host: ", originFromHost);
        var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
        console.log("full url", fullUrl);
        var anotherUrl = req.get("hostname") + req.url;
        console.log("another url", anotherUrl);
        console.log(
            "request",
            req.headers["x-forwarded-for"] || req.connection.remoteAddress
        );
 
        var cOptions = {
            origin: function (origin, callback) {
                if (isOriginAllowed(origin) || isOriginAllowed(originFromHost))
                    callback(null, true);
                else
                    callback(
                        new Error(
                            "Not allowed by CORS, try again <br/> \n" +
                                JSON.stringify(origin, null, 2)
                        ),
                        false
                    );
            },
            credentials: true,
        };
 
        cb(null, cOptions); // callback expects two parameters: error and options
    };
 
 
    app.use(cors(corsOptions));
    app.use('/static', express.static('public'))
 
    /*app.get('/', function(req, res){
        return res.send('Hello! The API is working');
    });*/
 
    app.listen({port}, async ()=>{
        console.log('Hello! The API is at http://localhost:'+port+'/api');
    });