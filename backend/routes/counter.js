var express = require("express");
var router = express.Router();
const requestIp = require('request-ip');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'clicker'
});
connection.connect();

const getCurrentClick = (connection, callback) => {
    connection.query('SELECT COUNT(*) as clicks FROM counter', function (error, results){
        if (error) throw error;
        callback(results[0].clicks);
    })
}

const salvaClick = (connection, oggettoClick, callback) => {
    
    connection.query('INSERT INTO counter (data, ip_address, browser_agent) VALUES (?,?,?)', [oggettoClick.data, oggettoClick.ip_address, oggettoClick.browser_agent], function(error){
        if (error) throw error;
        callback();
    })
}


router.post("/", function(req, res, next) {
   // const body = req.body 
    const agent = req.header("user-agent");
    const clientIp = requestIp.getClientIp(req);
    const tempo = (new Date()).toISOString().slice(0, 19).replace('T', ' ');

    salvaClick(connection, {
        data: tempo,
        ip_address: clientIp,
        browser_agent: agent,
    }, function(){
        getCurrentClick(connection, function(counter){
            res.json({success: true , counter});
        })
       
       // console.log({data: {body, clientIp, tempo, agent}})
    })
    
});

router.get("/", function(req, res, next) {
    getCurrentClick(connection, function(counter){
        res.json({counter});
    } )

});

module.exports = router;