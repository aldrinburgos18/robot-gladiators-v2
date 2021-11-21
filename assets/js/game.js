//Game States
//"WIN" - Player robot has defeated all enemy-robots
//    ** Fight all enemy-robots
//    ** Defeat eacg enemy-robots
//"LOSE" - Player robot's health is zero or less

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

// this creates a function named "fight"
var fight = function (enemyName) {
  //repeat and execute as long as the enemy-robot and player-robot is alive
  while (enemyHealth > 0 && playerHealth > 0) {
    //Ask the player if they want to SKIP or FIGHT this round
    var promptFight = window.prompt(
      "Would you like to FIGHT or SKIP this battle?  Enter 'FIGHT' or 'SKIP' to choose."
    );

    if (promptFight.toLowerCase() === "skip") {
      //confirm if player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      //if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerName + " has decided to skip this fight. Goodbye!");
        //subtract money from playerMoney for skipping
        playerMoney = playerMoney - 10;
        console.log(playerName + " now has $" + playerMoney + "left.");
        break;
      }
      //if no (false), ask question again by running fight() again
      else {
        fight();
      }
    }
    //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
    enemyHealth = enemyHealth - playerAttack;
    //Log a resulting message to the console so we know that it worked.
    console.log("The enemy's health is now " + enemyHealth);
    //check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyName + " has died. Get ready for the next battle!");
      //award player money for winning
      playerMoney = playerMoney + 20;
      //leave while loop if enemy is dead
      break;
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

    //check player's health
    if (playerHealth <= 0) {
      window.alert(playerName + " has died!");
      //leave while() loop if player is dead
      break;
    } else {
      window.alert(playerName + " still has " + playerHealth + " health left.");
    }
  }
};

for (var i = 0; i < enemyNames.length; i++) {
  if (playerHealth > 0) {
    //Alert players that they are starting the game
    window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

    //pick new enemy to fight based on the index of the enemyNames array
    var pickedEnemyName = enemyNames[i];

    //reset enemyHealth before starting new round
    enemyHealth = 50;

    //pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
    fight(pickedEnemyName);
  } else {
    window.alert("You have lost your robot in battle! Game over!");
    break;
  }
}
