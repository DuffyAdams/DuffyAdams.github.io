var button = document.getElementById("clickme");
var button2 = document.getElementById("upgrade");
document.getElementById("upgrade").disabled = true;
var button3 = document.getElementById("passiveUpgrade");
document.getElementById("passiveUpgrade").disabled = true;
var countDisplay = document.getElementById("count-display");

// Select the button
const btn = document.getElementById("lightmode");
// Select the stylesheet <link>
const theme = document.getElementById("theme-link");

// Listen for a click on the button
btn.addEventListener("click", function() {
  // If the current URL contains "ligh-theme.css"
  if (theme.getAttribute("href") == "styles.css") {
    // ... then switch it to "dark-theme.css"
    theme.href = "dark-styles.css";
    
  // Otherwise...
  } else {
    // ... switch it to "light-theme.css"
    theme.href = "styles.css";
  }
});

count = 0;
upgrade = 0;
seconds = 0;
upgradeCost = 10;
passiveUpgrade = 0;
passiveUpgradeCost = 10;
clickPower = 1;
timeSpeed = 1000;
x = 0;
function check_count() {
  convertCount = nFormatter(count,2);
  upgradeCost = round5(upgradeCost)
  passiveUpgradeCost = round5(passiveUpgradeCost)

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
  countDisplay.innerHTML = (convertCount);

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
  check_count();
  button2.innerHTML = "Clicker Upgrade: " + (clickPower) + " (" + (upgradeCost) + ")";
  countDisplay.innerHTML = (count);

}

function passiveUpgradeFunc() {
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
  }
  x++;
  check_count();
  button3.innerHTML = "Auto Click Upgrade: " + (passiveUpgrade) + " (" + (passiveUpgradeCost) + ")";
  check_count();



}

