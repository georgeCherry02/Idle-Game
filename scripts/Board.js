var Board = {}
Board.state = {};

Board.initialise = function() {
    for (var j = 0; j < 100; j++) {
        Board.state[j] = [];
        for (var i = 0; i < 100; i++) {
            Board.state[j].push(new Tile('grass', [i, j]));
        }
    }
    // Need a second loop to allow for further generation between before render
    var html = "<div class='board'>";
    for (var j = 0; j < 100; j++) {
        html += "<div class='board_row'>";
        for (var i = 0; i < 100; i++) {
            html += Board.state[j][i].getRenderableForm();
        }
        html += "</div>";
    }
    html += "</div>";
    document.getElementById('board_container').innerHTML = html;
    Board.generateWater();
    Board.generateWheat();
    Board.generateForest();
}

Board.checkIfBuildable = function() {
    return !Board.selected_tile.builtOn();
}

Board.build = function(new_building) {
    if (Board.selected_tile != undefined && Board.selected_tile.type == 'grass') {
        Board.selected_tile.buildOnTile(new_building);
        return Board.selected_tile;
    }
}

Board.handleTileSelect = function(col, row) {
    Board.selected_tile = Board.state[row][col];
    Board.state[row][col].handleSelect();
}

Board.generateForest = function() {
    const number_of_forests = 4 + Math.floor(Math.random() * 2);
    for (var i = 1; i <= number_of_forests; i++) {
        // Generate specifications of each forest
        var forest_loc = Board.getRandomLocation();
        var second_forest_centre_x_change = 4 + Math.floor(Math.random() * 5);
        var second_forest_centre_y_change = 4 + Math.floor(Math.random() * 5);
        var second_forest_loc = [forest_loc[0] + second_forest_centre_x_change, forest_loc[1] + second_forest_centre_y_change];
        var first_forest_height = 10 + Math.ceil(Math.random() * 7);
        var first_forest_width = 10 + Math.ceil(Math.random() * 7);
        var second_forest_height = 5 + Math.ceil(Math.random() * 10);
        var second_forest_width = 5 + Math.ceil(Math.random() * 10);
        // Generate first forest
        for (var di = -Math.floor(first_forest_width / 2); di <= Math.floor(first_forest_width / 2); di++) {
            var col = forest_loc[0] + di;
            if (col < 0 || col >= 100) {
                continue;
            }
            for (var dj = -Math.floor(first_forest_height / 2); dj <= Math.floor(first_forest_height / 2); dj++) {
                var row = forest_loc[1] + dj;
                if (row < 0 || row >= 100) {
                    continue;
                }
                var prob_spawn = Math.random();
                var prob_i = 2 * Math.abs(di)/first_forest_width;
                var prob_j = 2 * Math.abs(dj)/first_forest_height;
                if (Math.pow(Math.pow(prob_i, 2) + Math.pow(prob_j, 2), 3) < prob_spawn) {
                    Board.state[row][col].updateTile('forest');
                }
            }
        }
        // Generate second forest
        for (var di = -Math.floor(second_forest_width / 2); di <= Math.floor(second_forest_width / 2); di++) {
            var col = second_forest_loc[0] + di;
            if (col < 0 || col >= 100) {
                continue;
            }
            for (var dj = -Math.floor(second_forest_height / 2); dj <= Math.floor(second_forest_height / 2); dj++) {
                var row = second_forest_loc[1] + dj;
                if (row < 0 || row >= 100) {
                    continue;
                }
                var prob_spawn = Math.random();
                var prob_i = 2 * Math.abs(di)/second_forest_width;
                var prob_j = 2 * Math.abs(dj)/second_forest_height;
                if (Math.pow(Math.pow(prob_i, 2) + Math.pow(prob_j, 2), 3) < prob_spawn) {
                    Board.state[row][col].updateTile('forest');
                }
            }
        }
    }
}

Board.generateWater = function() {
    const number_of_lakes = 12 + Math.floor(Math.random() * 5);
    // Generate each lake
    for (var i = 1; i <= number_of_lakes; i++) {
        // Determine center of lake
        var lake_loc = Board.getRandomLocation();
        // Determine height and width
        var lake_height = 5 + Math.ceil(Math.random() * 15);
        var lake_width = 5 + Math.ceil(Math.random() * 15);
        for (var di = -Math.floor(lake_width / 2); di <= Math.floor(lake_width / 2); di++) {
            var col = lake_loc[0] + di;
            if (col < 0 || col >= 100) {
                continue;
            }
            for (var dj = -Math.floor(lake_height / 2); dj <= Math.floor(lake_height / 2); dj++) {
                var row = lake_loc[1] + dj;
                if (row < 0 || row >= 100) {
                    continue;
                }
                var prob_spawn = Math.random();
                var prob_i = 2 * Math.abs(di)/lake_width;
                var prob_j = 2 * Math.abs(dj)/lake_height;
                if (Math.pow(Math.pow(prob_i, 2) + Math.pow(prob_j, 2), 3) < prob_spawn) {
                    Board.state[row][col].updateTile('water')
                }
            }
        }
    }
}

Board.generateWheat = function() {
    const number_of_wheat_fields = 2 + Math.floor(Math.random() * 2);
    for (var i = 1; i <= number_of_wheat_fields; i++) {
        var wheat_loc = Board.getRandomLocation();
        var wheat_height = 15 + Math.ceil(Math.random() * 10);
        var wheat_width = 15 + Math.ceil(Math.random() * 10);
        for (var di = -Math.floor(wheat_width / 2); di <= Math.floor(wheat_width / 2); di++) {
            var col = wheat_loc[0] + di;
            if (col < 0 || col >= 100) {
                continue;
            }
            for (var dj = -Math.floor(wheat_height / 2); dj <= Math.floor(wheat_height / 2); dj++) {
                var row = wheat_loc[1] + dj;
                if (row < 0 || row >= 100) {
                    continue;
                }
                var prob_spawn = Math.random();
                // Think about logic for this
                var prob_i = 2 * Math.abs(di) / wheat_width;
                var prob_j = 2 * Math.abs(dj) / wheat_height;
                var gen = true;
                if (prob_i > 0.9 || prob_j > 0.9) {
                    gen = Math.random() < 0.25;
                } else if (prob_i > 0.75 || prob_j > 0.75) {
                    gen = Math.random() < 0.70;
                }
                if (gen) {
                    Board.state[row][col].updateTile('wheat');
                }
            }
        }
    }
}

Board.getRandomLocation = function() {
    var col = Math.floor(Math.random() * 100);
    var row = Math.floor(Math.random() * 100);
    return [col, row];
}