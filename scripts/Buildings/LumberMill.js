function LumberMill() {
    GeneralBuilding.call(this);
    this.type='lumber_mill';
    this.build_time = [30, 0];
    this.build_cost = {
        "wood": 50
    }
    this.unlocks = ["lumber"];
    this.hasTask = true;
    this.task = {
        "name": "Lumber Mill",
        "production": {
            "resources": ["wood", "lumber"],
            "base_amounts": [-2, 1],
            "modifiers": [-1, 0],
            "probabilities": [0.5, 0]
        },
        "min_amount": 2,
        "max_amount": 6
    }
}