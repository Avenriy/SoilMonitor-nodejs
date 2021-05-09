// setup for obniz
var Obniz = require("obniz");
// const lineNotify = require('line-notify-nodejs')('URK5sUZsb0rKoo4eT2Q8uZRotaguX8pe3brOIF'); // 先ほど生成したトークン
var obniz = new Obniz("6803-6143");
const https = require("https")
const querystring = require("querystring")

const Token = "m25sPSpBradH3IXJ8kCDNLzxedR6eGgc0LNP0FBHC6M"
const content = querystring.stringify({
    message: "水やりしてください"
})

const options = {
    hostname: "notify-api.line.me",
    path: "/api/notify",
    method: "POST",
    headers: {
        "Content-type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(content),
        "Authorization": `Bearer ${Token}`
    }
}

const request = https.request(options, res => {
    res.setEncoding("utf8")
    res.on("data", console.log)
    res.on("error", console.log)
})

// setup for chart.js
// var Chart = require('chart.js');
// var Canvas = require('canvas');
// var myChart = new Canvas(400,400);

// setup for param
// var ctx = document.getElementById("myChart");
// var soilLists = [];
// var labelLists = [];

// start obniz
obniz.onconnect = async function () {

    var sensor = obniz.wired("SEN0114", { vcc: 0, gnd: 1, output: 2 });
    var count = 0;    // count temperature change
    sensor.onchange = function (humidity) {
        obniz.repeat(async function (){
            humidity = ((90 - (humidity / 5 / 1023) * 100000) / 70) * 100;
            console.log(humidity);
            
            if(humidity <= 75){
            request.write(content)
            request.end()
            }
        }, 1000*60); //リピートインターバルが1min
    };
}
