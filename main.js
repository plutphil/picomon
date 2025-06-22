const progressBar = document.getElementById("progressBar");
const catchstatusbar = document.getElementById("catchstatusbar");

let progressBarvalue = 0;
let direction = 1; // 1 for increasing, -1 for decreasing
let doanim = true;
let catchanim = false;
let catchanimval = 100;
function animateProgress() {
    if (doanim) {
        progressBarvalue += direction;

        if (progressBarvalue >= 100 || progressBarvalue <= 0) {
            direction *= -1; // Reverse the direction
        }
        progressBar.value = progressBarvalue;
    }
    if(catchanim){
        catchanimval-=1;
        catchstatusbar.value=catchanimval;
        if(catchanimval<=0)catchanim=false;
    }
    requestAnimationFrame(animateProgress); // Keep the animation smooth
}
animateProgress(); // Start the animatio
let netcount = 10;
let fruitcount = 10;
function updatecounts() {
    netcountspan = document.getElementById("netcountspan");
    netcountspan.textContent = "" + netcount;
    fruitcountspan = document.getElementById("fruitcount");
    fruitcountspan.textContent = "" + fruitcount;
    
    netcountspan = document.getElementById("netcount");
    netcountspan.textContent = "" + netcount;
    fruitcountspan = document.getElementById("fruitcountinv");
    fruitcountspan.textContent = "" + fruitcount;
}
function docatch() {
    if (netcount <= 0) {
        netcount = 0;
        document.getElementById("catchstatus").textContent = "no more nets";
        return;
    }
    netcount--;
    updatecounts();
    const btncatch = document.getElementById("btncatch");
    const backbtncatch = document.getElementById("backbtncatch");
    btncatch.disabled = true;
    backbtncatch.disabled = true;
    doanim = false;
    let t = progressBarvalue / 100 - 0.5;
    t *= 2;
    document.getElementById("catchstatus").textContent = "catching...";
    catchanimval = 100;
    catchanim = true;
    if (1 - t * t + Math.random() > 1.5) {
        setTimeout(e => {
            document.getElementById("catchstatus").textContent = "success!";
            c = tocatch.splice(tocatch.indexOf(currentcreature), 1);
            console.log("catching", c);
            c = generateIndividual(c[0]);
            catchedcreatures.push(c)
            setTimeout(e => {
                btncatch.disabled = false;
                backbtncatch.disabled = false;
                fillCreatureInfo(c);
                showscreen("creatureinfo");
                document.getElementById("creatureinfo").querySelector(".backbutton").onclick = e => {
                    creaturescreen();
                }
            }, 1000)
        }, 1500)
    } else {
        setTimeout(e => {
            document.getElementById("catchstatus").textContent = "failed!";
            doanim = true;
            btncatch.disabled = false;
            backbtncatch.disabled = false;
        }, 1500)
    }
}
function showscreen(s) {
    document.querySelectorAll(".screen").forEach(e => {
        e.style.display = "none";
    })
    document.getElementById(s).style.display = "block";
    document.getElementById("catchstatus").textContent = "";
    progressBarvalue = 0;
    doanim = true;
    direction = 1;
}
showscreen("mainscreen")
//showscreen("refillstation")
let catchedcreatures = [];

c = generateIndividual(pickRandom(allcreatures))
catchedcreatures.push(c);

//opencatched();

creaturemap = {}
allcreatures.forEach(e => {
    creaturemap[e.name] = e;
})

fillCreatureInfo(c);
function fillCreatureInfo(c) {
    document.getElementById("creatureinfoimg").src = c.type.img;
    document.getElementById("creatureinfoname").textContent = c.name;
    document.getElementById("creatureinfonweight").textContent = c.weight.toFixed(1);
    document.getElementById("creatureinfonheight").textContent = c.height.toFixed(1);
    document.getElementById("creatureinfonwidth").textContent = c.width.toFixed(1);
    document.getElementById("creatureinfostrength").textContent = c.strength.toFixed(1);
    document.getElementById("creatureinfotimecatched").textContent = c.timecatched;
    creatureinfontraits = document.getElementById("creatureinfontraits")
    creatureinfontraits.innerHTML = "";
    c.type.traits.forEach(e => {
        console.log(e)
        traitspan = document.createElement("span")
        traitspan.className = "trait";
        traitspan.textContent = e;
        traitspan.style.background = traitsWithColors[e];
        creatureinfontraits.appendChild(traitspan)
    })
}
function updatecreaturescreen(){
    document.getElementById("creatures").innerHTML = "";
    tocatch.forEach(e => {
        addCreature(e, "creatures")
    });
    if(tocatch.length==0){
        document.getElementById("creatures").textContent = "No Creatures";
    }
}
function creaturescreen() {
    showscreen("creaturescreen");
    updatecreaturescreen();
}
//const base64Image = generateCreatureBase64();
//document.body.innerHTML = `<img src="${base64Image}" alt="Pixel Creature">`;

let currentcreature = null;

function opencatchscreen(c) {
    currentcreature = c;
    document.getElementById("tocatch").src = c.img;
    document.getElementById("catchname").textContent = c.name;
    showscreen("catchscreen");
}

function opencatched() {
    document.getElementById("catchedcreatures").innerHTML = "";
    showscreen("catchedscreen");
    document.getElementById("creatureinfo").querySelector(".backbutton").onclick = e => {
        showscreen("catchedscreen")
    }
    catchedcreatures.forEach(e => {
        addCatchedCreature(e);
    })
}

function addCreature(c) {
    let divcreature = document.createElement("div");
    divcreature.className = "creature";
    let creatureimg = document.createElement("img");
    creatureimg.src = c.img;
    let creaturename = document.createElement("span");
    creaturename.textContent = c.name;
    divcreature.appendChild(creatureimg);
    divcreature.appendChild(creaturename)
    document.getElementById("creatures").appendChild(divcreature)
    divcreature.onclick = () => {
        const crt = c;
        opencatchscreen(crt);
    }
}

function addCatchedCreature(c) {
    let divcreature = document.createElement("div");
    divcreature.className = "creature";
    let creatureimg = document.createElement("img");
    creatureimg.src = c.type.img;


    let creaturename = document.createElement("span");
    creaturename.textContent = c.name;
    divcreature.appendChild(creaturename)
    let creatureinfotext = document.createElement("span");
    creatureinfotext.textContent = `  
            ${c.timecatched} _ Strength 
            ${c.strength.toFixed(2)}
            `;



    let creatureimgdiv = document.createElement("div");
    creatureimgdiv.appendChild(creatureimg);
    divcreature.appendChild(creatureimgdiv);

    let creaturetextdiv = document.createElement("div");
    creaturetextdiv.appendChild(creaturename);
    creaturetextdiv.appendChild(creatureinfotext);
    divcreature.appendChild(creaturetextdiv);



    document.getElementById("catchedcreatures").appendChild(divcreature)
    divcreature.onclick = () => {
        const crt = c;
        showscreen("creatureinfo");
        fillCreatureInfo(crt);
    }
    savegame();
}
let tocatch = [];

let nextrefill = performance.now() + 1000 * 3;
let refillbutton = document.getElementById("refillbutton");
function randInt(min, max) {
    return min + Math.floor(Math.random() * (max - min));
}
refillbutton.onclick = e => {

    refillbutton.disabled = true;
    nextrefill = performance.now() + 1000 * 20;
    newitems = document.getElementById("newitems");
    newnets = randInt(1, 10);
    newfruits = randInt(1, 10);
    netcount += newnets;
    fruitcount += newfruits;
    newitems.innerHTML = "+ " + newfruits + " Nets<br>" + "+ " + newfruits + " Fruits\n";
    savegame();
};
setInterval(e => {
    let a = nextrefill - performance.now();
    a /= 1000;
    a = a.toFixed(0);
    if (a <= 0) {
        a = 0;
        refillbutton.disabled = false;
    } else {
        refillbutton.disabled = true;
    }
    document.getElementById("nextrefilltime").textContent = " " + a + " s ";
}, 1)
function savegame() {
    localStorage.setItem("save", JSON.stringify(
        {
            netcount,
            fruitcount,
            catchedcreatures,
            tocatch
        }
    ));
}
function tick(){
    if(tocatch.length<10){
        tocatch.push(pickRandom(allcreatures));
    }
    updatecreaturescreen();
    setTimeout(tick,(10+Math.random()*30)*1000);
}
if (localStorage) {
    let savestate = localStorage.getItem("save");

    if (savestate) {
        savestate = JSON.parse(savestate);
        netcount = savestate.netcount;
        fruitcount = savestate.fruitcount;
        catchedcreatures = savestate.catchedcreatures;
        updatecounts();
        setTimeout(e=>{
            tick();
        },1000);
    }else{
        for (let i = 0; i < 10; i++) {
            tocatch.push(pickRandom(allcreatures));
        }
        
    }
}