let balancey = document.getElementById("Balance");
balance = balancey.innerHTML;
balance = balance.substring(18, 21);
console.log(balance);

let q = parseInt(balance);

let chooserisk = document.querySelectorAll(".CR");
Array.from(chooserisk).forEach(function (element0) {
  element0.addEventListener("click", function () {
    let risk = element0.innerHTML;
    let risky = risk.substring(0, 2);
    risk = parseInt(risk);

    let t;
    let p;

    switch (risk) {
      case 5:
        t = 5;
        p = 5;
        break;
      case 25:
        t = 25;
        p = 25;
        break;
      case 50:
        t = 50;
        p = 50;
        break;
      case 75:
        t = 100;
        p = 75;
        break;
      case 90:
        t = 300;
        p = 90;
        break;
      default:
        t = 0;
    }

    let start = document.querySelector("#start");
    start.addEventListener("click", function () {
      let cards = document.querySelectorAll(".cards");
      Array.from(cards).forEach(function (element1) {
        element1.addEventListener("click", function () {
          let x = Math.floor(Math.random() * 101);

          if (x >= risk) {
            element1.className = `bg-gradient-to-b from-[#0e5fea] to-[#4072b8] h-[75px] w-[75px] rounded-[5px] cards`;
            console.log("win");
            q = q + (t * q) / 100;
            console.log(q);
            balancey.innerHTML = "Current Balance-$" + q;
          } else {
            element1.className = `bg-gradient-to-b from-[#ff0404] to-[#c45b35] h-[75px] w-[75px] rounded-[5px] cards`;
            console.log("lose");
            q = q - (p * q) / 100;
            console.log(q);
            balancey.innerHTML = "Current Balance-$" + q;
          }

          setTimeout(() => {
            element1.className = `bg-gradient-to-b from-[#2ae757] to-[#00876a] h-[75px] w-[75px] rounded-[5px] cards`;
          }, 2000);
        });
      });
    });

    console.log(`Risk set to- ${risk}`);
  });
});
