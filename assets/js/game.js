//Game States
//"WIN" - Player robot has defeated all enemy-robots
//    ** Fight all enemy-robots
//    ** Defeat eacg enemy-robots
//"LOSE" - Player robot's health is zero or less

var fightOrSkip = function () {
  //ask player if they'd like to fight or skip using fightOrSkip function
  var promptFight = window.prompt(
    "Would you like to FIGHT or SKIP this battle?  Enter 'FIGHT' or 'SKIP' to choose."
  );
  promptFight = promptFight.toLowerCase();

  //conditional recursive function call
  if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }

  //if player picks "skip" confirm and then stop the loop
  if (promptFight === "skip") {
    //confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    //if yes(true), leave fight
    if (confirmSkip) {
      window.alert(
        playerInfo.name + " has decided to skip this fight. Goodbye!"
      );
      //subtract money from playerMoney for skipping
      playerInfo.playerMoney = playerInfo.money - 10;
      return true;
    }
  }
  return false;
};

// this creates a function named "fight"
var fight = function (enemy) {
  //keeps track of who goes first
  var isPlayerTurn = true;

  //randomize turns
  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }

  //repeat and execute as long as the enemy-robot and player-robot is alive
  while (enemy.health > 0 && playerInfo.health > 0) {
    if (isPlayerTurn) {
      //ask player if they'd like to fight or skip using fightOrSkip() function.
      if (fightOrSkip()) {
        //if true, leave fight by breaking loop
        break;
      }

      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
      //prevent negative values using Math.max();
      enemy.health = Math.max(0, enemy.health - damage);
      //Log a resulting message to the console so we know that it worked.
      console.log(
        playerInfo.name +
          " attacked " +
          enemy.name +
          ". " +
          enemy.name +
          "'s health is now " +
          enemy.health
      );

      //check enemy's health
      if (enemy.health <= 0) {
        window.alert(
          enemy.name +
            " has died. You have been awarded $20 for winning that round. Get ready for the next battle!"
        );
        //award player money for winning
        playerInfo.money = playerInfo.money + 20;
        //leave while loop if enemy is dead
        break;
      } else {
        window.alert(
          enemy.name + " still has " + enemy.health + " health left."
        );
      }
      //player gets attacked first
    } else {
      //generate random damage value based on enemy's attack power
      var damage = randomNumber(enemy.attack - 3, enemy.attack);
      //prevent negative values using Math.max();
      playerInfo.health = Math.max(0, playerInfo.health - damage);
      //Log a resulting message to the console so we know that it worked.
      console.log(
        enemy.name +
          " attacked " +
          playerInfo.name +
          ". " +
          playerInfo.name +
          " now has " +
          playerInfo.health +
          " health remaining."
      );

      //check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died!");
        //leave while() loop if player is dead
        break;
      } else {
        window.alert(
          playerInfo.name + " still has " + playerInfo.health + " health left."
        );
      }
    }
    //switch turn order for next round
    isPlayerTurn = !isPlayerTurn;
  }
};

var startGame = function () {
  // reset player stats
  playerInfo.reset();

  for (var i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
      //Alert players that they are starting the game
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

      //pick new enemy to fight based on the index of the enemyInfo array
      var pickedEnemyObj = enemyInfo[i];

      //reset pickedEnemyObj.health before starting new round
      pickedEnemyObj.health = randomNumber(40, 60);

      //pass the pickedEnemyObj variable's value into the fight function, where it will assume the value of the enemy.name parameter
      fight(pickedEnemyObj);

      //if player is still alive and we're not at the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        //ask if player wants to use the store before next round
        var storeConfirm = window.confirm(
          "The fight is over, visit the store before the next round?"
        );

        //if yes, take them to the store() function
        if (storeConfirm) {
          shop();
        }
      }
    } else {
      window.alert("You have lost your robot in battle! Game over!");
      break;
    }
  }

  //after the loop ends, player is either out of health or enemies to fight, so run the endGame function
  endGame();
};

var endGame = function () {
  //if player is still alive, player wins!
  if (playerInfo.health > 0) {
    window.alert(
      "Great job, you've survived the game! You now have a score of " +
        playerInfo.money +
        "."
    );
  } else {
    window.alert("You've lost your robot in battle.");
  }
  //ask player if they'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    //restart the game
    startGame();
  } else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

var shop = function () {
  //ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "(Player money: $" +
      playerInfo.money +
      ") Would you like to REFILL($7) your health, UPGRADE($7) your attack, or LEAVE the store? Please enter one: 1 for 'REFILL', 2 for 'UPGRADE', or 3 to 'LEAVE' to make a choice."
  );

  //parses string from shopOptionPrompt to an integer
  shopOptionPrompt = parseInt(shopOptionPrompt);

  //use switch to carry out action
  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      break;
    case 2:
      playerInfo.upgradeAttack();
      break;
    case 3:
      window.alert("Leaving the store.");
      //do nothing, so function will end
      break;
    default:
      window.alert("You did not pick a valid option. Try again.");

      //call shop() again to force player to pick a valid option
      shop();
      break;
  }
};

var randomNumber = function (min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};

var getPlayerName = function () {
  var name = "";

  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }

  console.log("Your robot's name is '" + name + "'");
  return name;
};

var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function () {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function () {
    if (this.money >= 7) {
      this.money -= 7;
      window.alert(
        "Refilling player's health by 20 for $7. You now have $" +
          this.money +
          " left."
      );
      this.health += 20;
    } else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function () {
    if (this.money >= 7) {
      this.money -= 7;
      window.alert(
        "Upgrading player's attack damage by 6 for $7. You now have $" +
          this.money +
          " left."
      );
      this.attack += 6;
    } else {
      window.alert("You don't have enough money!");
    }
  },
};

var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14),
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14),
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14),
  },
];

//start the game when the page loads
startGame();
