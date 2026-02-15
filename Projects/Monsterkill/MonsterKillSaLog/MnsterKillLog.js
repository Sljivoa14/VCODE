const monsterHealthBar = document.getElementById("monster-health");
const playerHealthBar = document.getElementById("player-health");
const attackBtn = document.getElementById("attack-btn");
const strongAttackBtn = document.getElementById("strong-attack-btn");
const healBtn = document.getElementById("heal-btn");
const logBtn = document.getElementById("log-btn");

let monsterHealth = Number(prompt("Enter monster's health:", "100"));
let playerHealth = Number(prompt("Enter player's health:", "100"));
const maxPlayerHealth = 100;
const maxMonsterHealth = 100;

const logNormalAttackMode = 'Player Attack';
const logStrongAttackMode = 'Player Strong Attack';
const logHealMode = 'Player Heal';
const logMonsterAttackMode = 'Monster Attack';
const logGameOver = 'Game Over';

let battleLog = [];

updateHealthBars();


//log 
function writeLog(event, data, currentPlayerHealthValue, currentMonsterHealthValue){ 

    const logEntry = {
        event: event,
        data: data,
        currentPlayerHealthValue: currentPlayerHealthValue,
        currentMonsterHealthValue: currentMonsterHealthValue
        
    };
    battleLog.push(logEntry);
    console.log(battleLog);
}

//validate health input
for(;;){
    if(monsterHealth <=maxMonsterHealth && playerHealth <=maxPlayerHealth){
            break;
        }

if(monsterHealth >maxMonsterHealth && playerHealth >maxPlayerHealth){
    alert("Both health values cannot be greater than 100. Please enter valid values.");
    monsterHealth = Number(prompt("Enter monster's health:", "100"));
    playerHealth = Number(prompt("Enter monster's health:", "100"));
        
}

else if(playerHealth >maxPlayerHealth && monsterHealth <=maxMonsterHealth){
    alert("Player health cannot be greater than 100. Please enter a valid value.");
    playerHealth = 100;
    monsterHealth = 100;

    
}
else if(monsterHealth >maxMonsterHealth && playerHealth <=maxPlayerHealth){
    alert("Monster health cannot be greater than 100. Please enter a valid value.");
    monsterHealth = 100;
    playerHealth = 100;

}
else{
    break;
}};


//atack
attackBtn.addEventListener("click", function() {
    const playerDamage = Math.floor(Math.random() * 15) + 5;
    const monsterDamage = Math.floor(Math.random() * 15) + 5;
    monsterHealth -= playerDamage;// monsterHealth = monsterHealth - playerDamage
    playerHealth -= monsterDamage;// playerHealth = playerHealth - monsterDamage
    updateHealthBars();
    checkGameOver();
    battleLog.push(`Player attacked for ${playerDamage} damage. Monster attacked for ${monsterDamage} damage.`);
});
writeLog(logNormalAttackMode, `Player attacked for ${playerDamage} damage. Monster attacked for ${monsterDamage} damage.`, playerHealth, monsterHealth);


//strong atack
strongAttackBtn.addEventListener("click", function() {
    const playerDamage = Math.floor(Math.random() * 25) + 10;   
    const monsterDamage = Math.floor(Math.random() * 15) + 10;
    monsterHealth -= playerDamage;
    playerHealth -= monsterDamage;
    updateHealthBars();
    checkGameOver();
    battleLog.push(`Player performed a strong attack for ${playerDamage} damage. Monster attacked for ${monsterDamage} damage.`);
});  


//heal
healBtn.addEventListener("click", function() {
    const healValue = Math.floor(Math.random() * 20) + 10;      
    playerHealth += healValue;
    if (playerHealth > 100) playerHealth = 100; 
    const monsterDamage = Math.floor(Math.random() * 15) + 5;   
    playerHealth -= monsterDamage;
    updateHealthBars();
    checkGameOver();
    battleLog.push(`Player healed for ${healValue}. Monster attacked for ${monsterDamage} damage.`);
}); 


//update health bars
function updateHealthBars(){
    monsterHealthBar.style.width = monsterHealth + "%";
    playerHealthBar.style.width = playerHealth + "%";
}

//log
logBtn.addEventListener("click", function () {
  console.table(battleLog);
});


//check game over
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
};


