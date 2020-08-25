var Unlocks = {};
Unlocks.unlockedBuildings = ["path", "tent"];

Unlocks.manageUnlocks = function(building) {
    Unlocks.unlockedBuildings.push(building.type);
    Population.addNewTasks(building);
    var resource_unlocks = building.unlocks;
    for (var i = 0; i < resource_unlocks.length; i++) {
        var resource = resource_unlocks[i];
        Unlocks.addResource(resource);
        Unlocks.addBuildings(resource);
    }
};

Unlocks.addBuildings = function(resource) {
    var buildings = Unlocks.determineBuildings(resource);
    for (var j = 0; j < buildings.length; j++) {
        var building = buildings[j];
        addBuildingButton(building.category, building.toString(false), building.toString(true));
    }
}

Unlocks.determineBuildings = function(resource) {
    switch (resource) {
        case "lumber": 
            return [new PitMine()];
        default:
            alert("Resource not defined!");
            return [];
    }
}

Unlocks.addResource = function(resource) {
    Inventory[resource] = 0;
    var init_html = document.getElementById('game_resources_counter').innerHTML;
    var pretty_resource = resource.charAt(0).toUpperCase() + resource.substring(1);
    var fin_html = init_html + "<div class='resource_counter'><p><i>" + pretty_resource + ": <span='" + resource + "_counter'>0</span></i></p></div>";
    document.getElementById('game_resources_counter').innerHTML = fin_html;
}
