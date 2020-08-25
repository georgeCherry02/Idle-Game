var Population = {}

Population.count = 0;
Population.max = 0;

Population.tasks = {
    "no_job": {
        "name": "Unemployed",
        "production": {
            "resources": [],
            "amounts": []
        },
        "min_amount": 0,
        "max_amount": "none",
        "batch_amount": 1,
        "amount": 0
    },
    "building": {
        "name": "Building",
        "current_tiles": [],
        "min_amount": 1,
        "max_amount": "none",
        "batch_amount": 3,
        "amount": 0
    },
    "gather_wheat": {
        "name": "Gather Wheat",
        "production": {
            "resources": ["wheat"],
            "base_amounts": [1],
            "modifiers": [1],
            "probabilities": [0.75]
        },
        "min_amount": 1,
        "max_amount": "none",
        "batch_amount": 5,
        "amount": 0
    },
    "gather_wood": {
        "name": "Gather Wood",
        "production": {
            "resources": ["wood"],
            "base_amounts": [1],
            "modifiers": [1],
            "probabilities": [0.5]
        },
        "min_amount": 1,
        "max_amount": "none",
        "batch_amount": 5,
        "amount": 0
    }
}

Population.updateDisplay = function() {
    document.getElementById('population_counter').innerHTML = Population.count + "/" + Population.max;
}

Population.updateTaskDisplay = function() {
    for (var task in Population.tasks) {
        if (Population.tasks.hasOwnProperty(task)) {
            document.getElementById(task).innerHTML = Population.tasks[task]["amount"];
        }
    }
}

Population.modifyCount = function(amount) {
    var init_pop = Population.count;
    Population.count += amount;
    if (Population.count > Population.max) {
        Population.count = Population.max;
    } else if (Population.count < 0) {
        Population.count = 0;
    }
    if (Population.count > init_pop) {
        Population.tasks["no_job"]["amount"] += (Population.count - init_pop);
    }
    Population.updateDisplay();
    Population.updateTaskDisplay();
}

Population.addToBuildQueue = function(tile) {
    Population.tasks["building"].current_tiles.push(tile);
    tile.updateInnerComponents();
}

Population.addNewTasks = function(building) {
    Population.tasks[building.type] = building.task;
    Population.tasks[building.type].amount = 0;
    Population.tasks[building.type].batch_amount = building.task.max_amount;
    Population.addNewTaskToDisplay(building);
}

Population.addNewTaskToDisplay = function(building) {
    var init_html = document.getElementById('work_dist_subsection_buttons').innerHTML;
    var new_task_html = "<div class='sub_build_button'>"
                      +     "<h5>" + building.task.name + ": <span id='" + building.type + "'>0</span>/<span id='" + building.type + "_limit'>" + building.task.max_amount + "</span></h5>"
                      +     "<div class='modify_task_button positive' onclick=\"Population.addToTask('" + building.type + "')\"><i class='fas fa-plus'></i></div>"
                      +     "<div class='modify_task_button negative' onclick=\"Population.removeFromTask('" + building.type + "')\"><i class='fas fa-minus'></i></div>"
                      + "</div>";
    document.getElementById('work_dist_subsection_buttons').innerHTML = init_html + new_task_html;
}

Population.manageTaskLimitations = function(building) {
    if (building.hasTask) {
        Population.tasks[building.type]["max_amount"] += building.task.max_amount;
        document.getElementById(building.type + "_limit").innerHTML = Population.tasks[building.type].max_amount;
    }
}

Population.addToTask = function(task) {
    if (Population.tasks["no_job"]["amount"] > 0) {
        if (Population.tasks[task]["max_amount"] === "none" || Population.tasks[task]["amount"] < Population.tasks[task]["max_amount"]) {
            Population.tasks[task]["amount"]++;
            Population.tasks["no_job"]["amount"]--;
        }
    }
    Population.updateTaskDisplay();
}

Population.removeFromTask = function(task) {
    if (Population.tasks[task]["amount"] > 0) {
        Population.tasks[task]["amount"]--;
        Population.tasks["no_job"]["amount"]++;
    }
    Population.updateTaskDisplay();
}

Population.updateResources = function() {
    Inventory.wheat -= Population.count;
    // Simulate starvation
    if (Inventory.wheat < 0) {
        Population.count += Inventory.wheat;
        Inventory.wheat = 0;
    }
    // Simulate productivity
    var production, amount_working, number_of_workers_per_batch, number_of_batches, residual_amount_of_workers; 
    for (var task in Population.tasks) {
        if (Population.tasks.hasOwnProperty(task)) {
            amount_working = Population.tasks[task]["amount"];
            number_of_workers_per_batch = Population.tasks[task]["batch_amount"];
            number_of_batches = Math.floor(amount_working / number_of_workers_per_batch);
            residual_amount_of_workers = amount_working % number_of_workers_per_batch;
            // Try to simulate building stuff
            if (task == "building") {
                for (var i = 0; i <= number_of_batches && i < Population.tasks["building"].current_tiles.length; i++) { 
                    var building = Population.tasks["building"].current_tiles[i].building;
                    if (!building.built()) {
                        console.log("Still attempting to build...");
                        if (i == number_of_batches) {
                            building.build_time[1] += residual_amount_of_workers;
                        } else {
                            building.build_time[1] += number_of_workers_per_batch;
                        }
                    }
                    Population.tasks["building"].current_tiles[i].updateInnerComponents();
                    if (building.built()) {
                        Population.tasks["building"].current_tiles.splice(i, 1);
                    }
                }
            } else if (amount_working >= Population.tasks[task]["min_amount"]) {
                production = Population.tasks[task]["production"];
                var amounts = [];
                // Now need to fine tune economy however this function works
                // Alongside this may want to look at optimisation
                for (var i = 0; i < production.resources.length; i++) {
                    var base_amount = production.base_amounts[i] * amount_working;
                    var batch_amount = Math.floor(production.modifiers[i] * production.probabilities[i] * number_of_batches * number_of_workers_per_batch);
                    var residual_amount = 0;
                    if (Math.random() < production.probabilities[i]) {
                        residual_amount = Math.ceil(production.modifiers[i] * residual_amount_of_workers);
                    }
                    amounts.push(base_amount + batch_amount + residual_amount);
                }
                var affordable = true;
                var i = 0;
                while (affordable && i < amounts.length) {
                    // This is guaranteed by hard coding
                    // Will check through testing, the plan is that all buildings list costs first in tasks
                    if (amounts[i] >= 0) {
                        break;
                    }
                    affordable = Inventory[production.resources[i]] + amounts[i] >= 0;
                    i++;
                }
                if (affordable) {
                    for (var i = 0; i < amounts.length; i++) {
                        Inventory[production.resources[i]] += amounts[i];
                    }
                }
            }
        }
    }
}