// CARD TABLE HERE
let cardgrid=document.querySelector("#cardGrid");
for(i=0;i<5;i++)
{
  let row=document.createElement("div")
  row.className="flex gap-8";
  for(j=0;j<5;j++)
  {
    let cards=document.createElement("div")
    cards.className="bg-gradient-to-b from-[#0e5fea] to-[#4072b8] h-[75px] w-[75px] rounded-[5px] cards";
    row.appendChild(cards);
  }
  cardgrid.appendChild(row);
}
// Risk here
let header=document.querySelector("header");
let riskdiv=document.createElement("div")
riskdiv.className="bg-gradient-to-b from-[#f9e79f] to-[#f7dc6f] w-[200px] flex text-2xl items-center justify-center border-b-black p-[5px] border-solid"
let pqr="Bombs💣- ";
riskdiv.innerHTML=pqr;
header.append(riskdiv)


// START FROM HERE
let start=document.querySelector("#start");
let chooserisk=document.querySelectorAll(".CR");

// HOVER EFFECT
chooserisk.forEach(ele1=>{
  ele1.addEventListener("mouseenter",function(){
    ele1.style.cursor="pointer"
    ele1.className="bg-gradient-to-b from-[#4f7fcf] to-[#a2b9f7] flex text-4xl items-center justify-center border-b-black p-[5px] CR border-solid"
  })
  ele1.addEventListener("mouseleave",function(){
    ele1.className="bg-gradient-to-b from-[#d3d705] to-[#ffecab] flex text-4xl items-center justify-center border-b-black p-[5px] CR  border-solid"
  })
})

let piko=document.querySelectorAll(".cards")
piko.forEach(ele3=>{
    ele3.addEventListener("mouseenter",function(){
      ele3.style.cursor="pointer"
    })
})
start.addEventListener("mouseenter",function(){
  start.style.cursor="pointer";
  start.className="bg-gradient-to-b from-[#1b3a1b] to-[#145214] text-5xl flex items-center justify-center border-b-black border-solid p-[15px] rounded-[20px]"
})
start.addEventListener("mouseleave",function(){
  start.className="bg-gradient-to-b from-[#28a745] to-[#198754] text-5xl flex items-center justify-center border-b-black border-solid p-[15px] rounded-[20px]"
})

// Balance Div
let balancediv=document.querySelector("#Balance");
let pp="Current Balance- $"
let q={value:500};
balancediv.innerHTML=pp+q.value;




// SHUFFLE FUNCTION
async function get_shuffle_array() {
      let myarr = [];
      for (let i = 1; i <= 25; i++) {
        myarr.push(i);
      }
      for (let j = 24; j >= 0; j--) {
        const k = Math.floor(Math.random() * (j + 1));
        let temp = myarr[j];
        myarr[j] = myarr[k];
        myarr[k] = temp;
      }
      return myarr;
}


// GET 
function you_won(elee,pp,q,risk,ib)
{

  elee.className="bg-gradient-to-b from-[#2ae757] to-[#00876a] h-[75px] w-[75px] rounded-[5px] cards"

  let gain_percentage;
  if(risk==2) gain_percentage=8;
  else if(risk==5) gain_percentage=25;
  else if(risk==10) gain_percentage=70;
  else if(risk==15) gain_percentage=140;
  else gain_percentage=225;


  q.value+=(ib*gain_percentage)/100;

  balancediv.innerHTML=pp+q.value;
}

function you_lose(cardcard,risk,pp,q,inputamount,t)
{
  for(let i=0;i<25;i++)
  {
    if(parseInt(cardcard[i].dataset.risk)>parseInt(risk))
    {
      cardcard[i].className="bg-gradient-to-b from-[#2ae757] to-[#00876a] h-[75px] w-[75px] rounded-[5px] cards"
    }
    else
    {
      cardcard[i].className="bg-gradient-to-b from-[#ff0404] to-[#c45b35] h-[75px] w-[75px] rounded-[5px] cards"
    }
  }

  setTimeout(function(){
    alert("YOU LOSE!!")
  },500)

  let loose_percentage;
  if(risk==2) loose_percentage=8;
  else if(risk==5) loose_percentage=20;
  else if(risk==10) loose_percentage=40;
  else if(risk==15) loose_percentage=60;
  else loose_percentage=80;


  q.value=t-(inputamount*loose_percentage)/100;

  balancediv.innerHTML=pp+q.value;
}

// YOU HAVE GIVE INPUT;

inputi=document.querySelector("#inputamount");
inputi.addEventListener("input",function(){

  let cri=document.querySelectorAll(".CR");

  cri.forEach(ele4=>{
    ele4.className="bg-gradient-to-b from-[#d3d705] to-[#ffecab] flex text-4xl items-center justify-center border-b-black p-[5px] CR border-solid visible"
  })

  // YOU HAVE CLICKED ON CR
chooserisk.forEach(ele0=>{
  ele0.addEventListener("click",function(){
    

    let inputamount=document.querySelector("#inputamount").value;
    let balance=document.querySelector("#Balance").dataset.risk;
    if(parseInt(inputamount)>parseInt(q.value))
      {
        alert("Low Balance");
      }
      else
      {
        let risk=ele0.dataset.risk;
        riskdiv.innerHTML=pqr+risk;
        start.className="bg-gradient-to-b from-[#28a745] to-[#198754] text-5xl flex items-center justify-center border-b-black border-solid p-[15px] rounded-[20px] visible"
      
      // YOU HAVE CLICKED ON START
      start.addEventListener("click",async function(){


        let t=q.value
        let shuffled_array=await get_shuffle_array()
        console.log(shuffled_array)
        
          cardcard=document.querySelectorAll(".cards");
          for(let i=0;i<25;i++)
          {
            cardcard[i].dataset.risk=shuffled_array[i];
          }

          // Refreshes the CARD
          cardcard.forEach(lol=>{
            lol.className="bg-gradient-to-b from-[#0e5fea] to-[#4072b8] h-[75px] w-[75px] rounded-[5px] cards"
          })




          // YOU HAVE CLICKED ON CARD
          cardcard.forEach(ele2=>{
            ele2.addEventListener("click",function(){
              if(parseInt(ele2.dataset.risk)>parseInt(risk))
              {
                you_won(ele2,pp,q,risk,inputamount)
              }
              else
              {
                you_lose(cardcard,risk,pp,q,inputamount,t)
              }



            })
          })

        
      })




    }

  }


  )
})



})

// YOU HAVE CLICKED ON STOP
let stoppii=document.querySelector("#stop");
stop.addEventListener("click",function(){
  if(parseInt(q.value)>=500)
  {
    alert(`Congratulations!! YOU WON $${parseInt(q.value)-500}`)
  }
  else
  {
    alert(`ALAS!! YOU LOSS $${500-parseInt(q.value)}`)
  }
})



