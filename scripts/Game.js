var Game = {}

Game.tick_speed_seconds = 5;
Game.count = 0;

Game.initialise = function() {
    // Create board state object
    Board.initialise();
    Inventory.updateDisplay();
    Population.updateDisplay();
}

Game.build = function(new_building) {
    console.log(new_building);
    if (Inventory.checkIfBuildable(new_building) && Board.checkIfBuildable()) {
        Inventory.build(new_building);
        var build_location = Board.build(new_building);
        // Add building to build queue
        Population.addToBuildQueue(build_location);
        // Checks if you've already built one of these
        if (!Unlocks.unlockedBuildings.includes(new_building.type)) {
            // If you haven't unlocked runs all unlocks
            Unlocks.manageUnlocks(new_building);
        } else {
            // If you have only takes into account impact on tasks
            Population.manageTaskLimitations(new_building);
        }
    }
}

Game.draw = function() {
    Inventory.updateDisplay();
    Population.updateDisplay();
}
Game.update = function() {
    Population.updateResources();
}
Game.run = function() {
    Game.update();
    Game.draw();
}

Game.initialise();
Game._intervalId = setInterval(Game.run, 1000 * Game.tick_speed_seconds);