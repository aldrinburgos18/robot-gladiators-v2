//Game States
//"WIN" - Player robot has defeated all enemy-robots
//    ** Fight all enemy-robots
//    ** Defeat eacg enemy-robots
//"LOSE" - Player robot's health is zero or less

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;
var enemyName = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

// this creates a function named "fight"
var fight = function () {
  //Alert players that they are starting the round
  window.alert("Welcome to Robot Gladiators!");

  //Ask the player if they want to SKIP or FIGHT this round
  var promptFight = window.prompt(
    "Would you like to FIGHT or SKIP this battle?  Enter 'FIGHT' or 'SKIP' to choose."
  );

  if (promptFight.toLowerCase() === "fight") {
    //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
    enemyHealth = enemyHealth - playerAttack;
    //Log a resulting message to the console so we know that it worked.
    console.log("The enemy's health is now " + enemyHealth);
    //check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyName + " has died.");
    } else {
      window.alert(enemyName + " still has " + enemyHealth + " health left.");
    }
    // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
    playerHealth = playerHealth - enemyAttack;
    //Log a resulting message to the console so we know that it worked.
    console.log(
      enemyName +
        " attacked " +
        playerName +
        ". " +
        playerName +
        " now has " +
        playerHealth +
        " health remaining."
    );
  } else if (promptFight.toLowerCase() === "skip") {
    //confirm if player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    //if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerName + " has decided to skip this fight. Goodbye!");
      //subtract money from playerMoney for skipping
      playerMoney = playerMoney - 2;
      console.log(playerName + " now has " + playerMoney + "$ left.");
    }
    //if no (false), ask question again by running fight() again
    else {
      fight();
    }
  } else {
    window.alert("You need to choose a valid option. Try again");
  }

  //check player's health
  if (playerHealth <= 0) {
    window.alert(playerName + " has died.");
  } else {
    window.alert(playerName + " still has " + playerHealth + " health left.");
  }
};

//fight();
