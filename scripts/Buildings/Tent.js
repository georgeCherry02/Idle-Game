var Tent = function() {
    GeneralBuilding.call(this)
    // Necessary
    this.build_time = [15, 0];
    this.build_cost = {
        "wheat": 10,
        "wood": 5
    }
    this.type = 'tent';
    // Overrides
    this.residential = true;
    this.population_capacity = 5;
}