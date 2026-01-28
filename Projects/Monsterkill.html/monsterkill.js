const monsterHealthBar = document.getElementById("monster-health");
const playerHealthBar = document.getElementById("player-health");
const attackBtn = document.getElementById("attack-btn");
/*
const strongAttackBtn = document.getElementById("strong-attack-btn");
const healBtn = document.getElementById("heal-btn");
const logBtn = document.getElementById("log-btn");*/

let monsterHealth = Number(prompt("Enter monster's health:", "100"));
let playerHealth = Number(prompt("Enter player's health:", "100"));
updateHealthBars();

attackBtn.addEventListener("click", function() {
    const playerDamage = Math.floor(Math.random() * 15) + 5;
    const monsterDamage = Math.floor(Math.random() * 15) + 5;
    monsterHealth -= playerDamage;
    playerHealth -= monsterDamage;
    updateHealthBars();
    checkGameOver();
}); 


function updateHealthBars() {
    monsterHealthBar.style.width = monsterHealth + "%";
    playerHealthBar.style.width = playerHealth + "%";
}           
function checkGameOver() {
    if (monsterHealth <= 0 && playerHealth <= 0) {
        alert("It's a draw!");
    }
    else if (monsterHealth <= 0) {
        alert("You won!");
    }
    else if (playerHealth <= 0) {
        alert("You lost!");
    }
}


/*
strongAttackBtn.addEventListener("click", function() {
    const playerDamage = Math.floor(Math.random() * 25) + 10;   
    const monsterDamage = Math.floor(Math.random() * 15) + 5;
    monsterHealth -= playerDamage;
    playerHealth -= monsterDamage;
    updateHealthBars();
    checkGameOver();
}
);  
healBtn.addEventListener("click", function() {
    const healValue = Math.floor(Math.random() * 20) + 10;      
    playerHealth += healValue;
    if (playerHealth > 100) playerHealth = 100; 
    const monsterDamage = Math.floor(Math.random() * 15) + 5;   
    playerHealth -= monsterDamage;
    updateHealthBars();
    checkGameOver();
}
);  
logBtn.addEventListener("click", function() {
    console.log(`Player Health: ${playerHealth}, Monster Health: ${monsterHealth}`);
});*/

