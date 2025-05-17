
// CARD TABLE INITIALIZATION

let cardgrid = document.querySelector("#cardGrid");
for (let i = 0; i < 5; i++) {
  let row = document.createElement("div");
  row.className = "flex gap-8";
  for (let j = 0; j < 5; j++) {
    let cards = document.createElement("div");
    cards.className = "bg-gradient-to-b from-[#0e5fea] to-[#4072b8] h-[75px] w-[75px] rounded-[5px] cards";
    row.appendChild(cards);
  }
  cardgrid.appendChild(row);
}


// RISK DISPLAY

let header = document.querySelector("header");
let riskdiv = document.createElement("div");
riskdiv.className = "bg-gradient-to-b from-[#f9e79f] to-[#f7dc6f] w-[200px] flex text-2xl items-center justify-center border-b-black p-[5px] border-solid";
let pqr = "Bombs💣- ";
riskdiv.innerHTML = pqr;
header.append(riskdiv);


// BALANCE DISPLAY

let balancediv = document.querySelector("#Balance");
let pp = "Current Balance- $";
let q = { value: 500 };
balancediv.innerHTML = pp + q.value;


// ELEMENTS SELECTION

let start = document.querySelector("#start");
let chooserisk = document.querySelectorAll(".CR");
let stoppii = document.querySelector("#stop");
let inputi = document.querySelector("#inputamount");
let piko = document.querySelectorAll(".cards");


// HOVER EFFECTS

chooserisk.forEach(ele1 => {
  ele1.addEventListener("mouseenter", () => {
    ele1.style.cursor = "pointer";
    ele1.className = "bg-gradient-to-b from-[#4f7fcf] to-[#a2b9f7] flex text-4xl items-center justify-center border-b-black p-[5px] CR border-solid";
  });

  ele1.addEventListener("mouseleave", () => {
    ele1.className = "bg-gradient-to-b from-[#d3d705] to-[#ffecab] flex text-4xl items-center justify-center border-b-black p-[5px] CR border-solid";
  });
});

piko.forEach(ele3 => {
  ele3.addEventListener("mouseenter", () => {
    ele3.style.cursor = "pointer";
  });
});

start.addEventListener("mouseenter", () => {
  start.style.cursor = "pointer";
  start.className = "bg-gradient-to-b from-[#1b3a1b] to-[#145214] text-5xl flex items-center justify-center border-b-black border-solid p-[15px] rounded-[20px]";
});

start.addEventListener("mouseleave", () => {
  start.className = "bg-gradient-to-b from-[#28a745] to-[#198754] text-5xl flex items-center justify-center border-b-black border-solid p-[15px] rounded-[20px]";
});

stoppii.style.cursor = "pointer";


// SHUFFLE FUNCTION

async function get_shuffle_array() {
  let myarr = [];
  for (let i = 1; i <= 25; i++) myarr.push(i);

  for (let j = 24; j >= 0; j--) {
    const k = Math.floor(Math.random() * (j + 1));
    [myarr[j], myarr[k]] = [myarr[k], myarr[j]];
  }

  return myarr;
}


// WIN FUNCTION

function you_won(elee, pp, q, risk, ib) {
  elee.className = "bg-gradient-to-b from-[#2ae757] to-[#00876a] h-[75px] w-[75px] rounded-[5px] cards";

  let gain_percentage = risk == 2 ? 8 : risk == 5 ? 25 : risk == 10 ? 70 : risk == 15 ? 140 : 225;
  q.value += (ib * gain_percentage) / 100;
  balancediv.innerHTML = pp + q.value;
}


// LOSE FUNCTION

function you_lose(cardcard, risk, pp, q, inputamount, t) {
  for (let i = 0; i < 25; i++) {
    cardcard[i].className = parseInt(cardcard[i].dataset.risk) > parseInt(risk)
      ? "bg-gradient-to-b from-[#2ae757] to-[#00876a] h-[75px] w-[75px] rounded-[5px] cards"
      : "bg-gradient-to-b from-[#ff0404] to-[#c45b35] h-[75px] w-[75px] rounded-[5px] cards";
  }

  setTimeout(() => alert("YOU LOSE!!"), 500);

  let loose_percentage = risk == 2 ? 8 : risk == 5 ? 20 : risk == 10 ? 40 : risk == 15 ? 60 : 80;
  q.value = t - (inputamount * loose_percentage) / 100;
  balancediv.innerHTML = pp + q.value;
}


// INPUT HANDLER & GAME LOGIC

inputi.addEventListener("input", () => {
  let cri = document.querySelectorAll(".CR");
  cri.forEach(ele4 => {
    ele4.className = "bg-gradient-to-b from-[#d3d705] to-[#ffecab] flex text-4xl items-center justify-center border-b-black p-[5px] CR border-solid visible";
  });

  chooserisk.forEach(ele0 => {
    ele0.addEventListener("click", () => {
      let inputamount = document.querySelector("#inputamount").value;
      
      if (parseInt(inputamount) > parseInt(q.value)) {
        alert("Low Balance");
      } else {
        let risk = ele0.dataset.risk;
        riskdiv.innerHTML = pqr + risk;

        start.className = "bg-gradient-to-b from-[#28a745] to-[#198754] text-5xl flex items-center justify-center border-b-black border-solid p-[15px] rounded-[20px] visible";
        document.querySelector("#stop").className = "bg-gradient-to-b from-[#dc3545] to-[#e4606d] text-5xl flex items-center justify-center border-b-black border-solid p-[15px] rounded-[20px] visible";

        start.addEventListener("click", async () => {
          const t = q.value;
          let shuffled_array = await get_shuffle_array();
          console.log(shuffled_array);

          let cardcard = document.querySelectorAll(".cards");
          for (let i = 0; i < 25; i++) {
            cardcard[i].dataset.risk = shuffled_array[i];
          }

          cardcard.forEach(lol => {
            lol.className = "bg-gradient-to-b from-[#0e5fea] to-[#4072b8] h-[75px] w-[75px] rounded-[5px] cards";
          });

          cardcard.forEach(ele2 => {
            ele2.addEventListener("click", () => {
              if (parseInt(ele2.dataset.risk) > parseInt(risk)) {
                you_won(ele2, pp, q, risk, inputamount);
              } else {
                you_lose(cardcard, risk, pp, q, inputamount, t);
              }
            });
          });
        });
      }
    });
  });
});


// STOP BUTTON LOGIC

stoppii.addEventListener("click", () => {
  if (parseInt(q.value) >= 500) {
    alert(`Congratulations!! YOU WON $${parseInt(q.value) - 500}`);
  } else {
    alert(`ALAS!! YOU LOSS $${500 - parseInt(q.value)}`);
  }
});
