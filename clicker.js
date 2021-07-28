var button = document.getElementById("clickme");
var button2 = document.getElementById("upgrade");
document.getElementById("upgrade").disabled = true;
var button3 = document.getElementById("passiveUpgrade");
document.getElementById("passiveUpgrade").disabled = true;
var countDisplay = document.getElementById("count-display");

const btn = document.getElementById("lightmode");
const theme = document.getElementById("theme-link");
const savbtn = document.getElementById("saveButton")

btn.addEventListener("click", function () {
  if (theme.getAttribute("href") == "styles.css") {
    theme.href = "dark-styles.css";
  } else {
    theme.href = "styles.css";
  }
});

function startGame(){
  convertCount = 0;
  count = 0;
  upgrade = 0;
  seconds = 0;
  upgradeCost = 10;
  clickPower = 1;
  passiveUpgradeCost = 10;
  passiveUpgrade = 0;
  timeSpeed = 1000;
  x = 0;
}
startGame();
load();
displayButtons();
check_count();



function displayButtons(){
  convertCount = nFormatter(count, 2);
  upgradeCost = round5(upgradeCost)
  passiveUpgradeCost = round5(passiveUpgradeCost)

  countDisplay.innerHTML = (convertCount);
  button2.innerHTML = "Clicker Upgrade: " + (clickPower) + " (" + (upgradeCost) + ")";
  button3.innerHTML = "Auto Click Upgrade: " + (passiveUpgrade) + " (" + (passiveUpgradeCost) + ")";


}


function save() {
  localStorage.setItem('upgrade', JSON.stringify(upgrade));
  localStorage.setItem('count', JSON.stringify(count));
  localStorage.setItem('seconds', JSON.stringify(seconds));
  localStorage.setItem('upgradeCost', JSON.stringify(upgradeCost));
  localStorage.setItem('passiveUpgrade', JSON.stringify(passiveUpgrade));
  localStorage.setItem('passiveUpgradeCost', JSON.stringify(passiveUpgradeCost));
  localStorage.setItem('clickPower', JSON.stringify(clickPower));
  localStorage.setItem('timeSpeed', JSON.stringify(timeSpeed));
  localStorage.setItem('x', JSON.stringify(x));

}
function load() {
  upgrade = JSON.parse(localStorage.getItem('upgrade') || 0);
  count = JSON.parse(localStorage.getItem('count') || 0);
  seconds = JSON.parse(localStorage.getItem('seconds') || 0);
  upgradeCost = JSON.parse(localStorage.getItem('upgradeCost') || 10);
  passiveUpgrade = JSON.parse(localStorage.getItem('passiveUpgrade') || 0);
  passiveUpgradeCost = JSON.parse(localStorage.getItem('passiveUpgradeCost') || 10);
  clickPower = JSON.parse(localStorage.getItem('clickPower') || 1);
  timeSpeed = JSON.parse(localStorage.getItem('timeSpeed') || 1000);
  x = JSON.parse(localStorage.getItem('x'));
}

function check_count() {

  if (count >= (upgradeCost)) {
    document.getElementById("upgrade").disabled = false;
  } else {
    document.getElementById("upgrade").disabled = true;
  }
  if (count >= (passiveUpgradeCost)) {
    document.getElementById("passiveUpgrade").disabled = false;
  } else {
    document.getElementById("passiveUpgrade").disabled = true;
  }
displayButtons();
save();
}
function nFormatter(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "Q" },
    { value: 1e18, symbol: "Qu" },
    { value: 1e21, symbol: "S" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function (item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}
function update() {

  count += 1;
  check_count();
}
function clickMeFunc() {
  count += clickPower;
  check_count();
}
function round5(x) {
  return Math.ceil(x / 5) * 5;
}
function buyUpgradeFunc() {
  count -= upgradeCost;
  upgrade += 1;
  upgradeCost = upgradeCost * 1.1;
  clickPower += 1;
  button2.innerHTML = "Clicker Upgrade: " + (clickPower) + " (" + (upgradeCost) + ")";
  countDisplay.innerHTML = (count);
  check_count();
}
function passiveUpgradeFunc() {
  myInterval =  0;

  while (x < 1) {
    myInterval = setInterval(update, timeSpeed);
    x++;
  }
  count -= Math.round(passiveUpgradeCost);
  passiveUpgrade += 1;
  passiveUpgradeCost = passiveUpgradeCost * 1.1;
  timeSpeed = timeSpeed / 1.10; //speeds up 10% every upgrade
  if (passiveUpgrade > 50) {
    myInterval = setInterval(update, timeSpeed);
  }
  if (x > 1) {
    clearInterval(myInterval);
    myInterval = setInterval(update, timeSpeed);
    check_count();

  }
  x++;
  check_count();




}

