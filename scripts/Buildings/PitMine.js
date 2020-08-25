function PitMine() {
    GeneralBuilding.call(this)
    this.type = "pit_mine";
    this.category = BuildingCategories.production;
    this.build_time = [30, 0];
    this.build_cost = {
        "lumber": 10,
        "wood": 20
    }
    this.unlocks = ["cobble", "rock"];
    this.hasTask = true;
    this.task = {
        "name": "Pit Mine",
        "production": {
            "resources": ["rock", "cobble"],
            "base_amounts": [0, 2],
            "modifiers": [1, 1],
            "probabilities": [0.5, 0.5]
        },
        "min_amount": 1,
        "max_amount": 5
    }
}