var btn = document.querySelector("#increment");
var ctr = document.querySelector("#counter");
var upg = document.querySelector("#upgradeClick");
var upgps = document.querySelector("#upgradePerSec");
var upgcp = document.querySelector("#upgradeClickPrice");
var save = document.querySelector("#saveGame");

var counter = 0;
var clickUpgrade = 1;
var perSecUpgrade = 0;
var upgradeClickPrice = 10;
var upgradePerSecPrice = 15;

document.getElementById("clickUpgrade").innerHTML = " " + clickUpgrade;
document.getElementById("upgradeClickPrice").innerHTML =
  " " + upgradeClickPrice;

var increment = function () {
  counter += clickUpgrade;
  ctr.textContent = counter;
};
var upgradeClick = function () {
  if (counter >= upgradeClickPrice) {
    clickUpgrade++;
    counter = counter - upgradeClickPrice;
    ctr.textContent = counter;
    upgradeClickPrice = Math.round(upgradeClickPrice * 1.1);
    document.getElementById("clickUpgrade").innerHTML = " " + clickUpgrade;
    document.getElementById("upgradeClickPrice").innerHTML =
      " " + upgradeClickPrice;
  }
};
var upgradePerSec = function () {
  if (counter >= upgradePerSecPrice) {
    perSecUpgrade++;
    counter = counter - upgradePerSecPrice;
    upgradePerSecPrice = Math.round(upgradePerSecPrice * 1.1);
    setInterval(oneSecondFunction, 1000);
    ctr.textContent = counter;
    document.getElementById("perSecUpgrade").innerHTML =
      "(" + perSecUpgrade + ")";
    console.log(upgradePerSecPrice);
  }
};
var oneSecondFunction = function () {
  counter++;
  ctr.textContent = counter;
};
var savedGame = function download(filename, text) {
  var pom = document.createElement('a');
  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  pom.setAttribute('download', filename);

  if (document.createEvent) {
      var event = document.createEvent('MouseEvents');
      event.initEvent('click', true, true);
      pom.dispatchEvent(event);
  }
  else {
      pom.click();
  }
}

btn.addEventListener("click", increment);
upg.addEventListener("click", upgradeClick);
upgps.addEventListener("click", upgradePerSec);
save.addEventListener("click", savedGame('ClickerSaveFile.txt', counter));
