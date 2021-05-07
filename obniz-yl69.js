var Obniz = require("obniz");

var obniz = new Obniz("6803-6143");
obniz.onconnect = async function () {
    var sensor = obniz.wired("SEN0114", { vcc: 0, gnd: 1, output: 2 });
    var count = 0;    // count temperature change
sensor.onchange = function (humidity) {
 //console.log(humidity)
 humidity = ((100 - (humidity / 5 / 1023) * 100000) / 70) * 100;
 console.log(humidity);
 //obniz.display.print(humidity)
};
}