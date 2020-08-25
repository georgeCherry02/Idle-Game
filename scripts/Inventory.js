var Inventory = {}
Inventory.stone = 0;
Inventory.wheat = 1000;
Inventory.wood = 1000;

Inventory.updateDisplay = function() {
    document.getElementById('stone_counter').innerHTML = Inventory.stone;
    document.getElementById('wheat_counter').innerHTML = Inventory.wheat;
    document.getElementById('wood_counter').innerHTML = Inventory.wood;
}

Inventory.build = function(building) {
    for (var resource in building.build_cost) {
        Inventory[resource] -= building.build_cost[resource];
    }
    if (building.residential) {
        Population.max += building.population_capacity;
    }
    Inventory.updateDisplay();
    Population.updateDisplay();
}

Inventory.checkIfBuildable = function(building) {
    for (var resource in building.build_cost) {
        if (building.build_cost[resource] > Inventory[resource]) {
            return false;
        }
    }
    return true;
}