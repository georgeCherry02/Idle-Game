function Path() {
    GeneralBuilding.call(this);
    this.type = 'path';
    this.build_cost = {
        "wood": 1
    }
    this.determineType = function(col, row, secondary_update) {
        // Gather where paths are
        var above = false, below = false, left = false, right = false;
        if (row - 1 >= 0) {
            above = this.checkLocationHasPath(col, row - 1);
        }
        if (row + 1 < 100) {
            below = this.checkLocationHasPath(col, row + 1);
        }
        if (col - 1 >= 0) {
            left = this.checkLocationHasPath(col - 1, row);
        }
        if (col + 1 < 100) {
            right = this.checkLocationHasPath(col + 1, row)
        }
        if (!secondary_update) {
            this.updateSurroundingPaths(col, row, [above, below, left, right]);
        }
        if (above) {
            if (below) {
                if (right) {
                    if (left) {
                        return 'path-cross';
                    }
                    return 'path-t-right';
                } else if (left) {
                    return 'path-t-left';
                }
                return 'path-vert';
            } else if (right) {
                if (left) {
                    return 'path-t-up';
                }
                return 'path-top-right';
            } else if (left) {
                return 'path-left-top';
            }
            return 'path-nub-top';
        } else if (right) {
            if (left) {
                if (below) {
                    return 'path-t-down';
                }
                return 'path-hori';
            } else if (below) {
                return 'path-right-bottom';
            }
            return 'path-nub-right';
        } else if (below) {
            if (left) {
                return 'path-bottom-left';
            }
            return 'path-nub-down';
        } else if (left) {
            return 'path-nub-left';
        }
        return 'path-dot';
    }
    this.checkLocationHasPath = function(col, row) {
        if (Board.state[row][col].builtOn()) {
            return Board.state[row][col].building.type == 'path';
        }
        return false;
    }
    this.updateSurroundingPaths = function(col, row, paths_to_update) {
        for (var i = 0; i < paths_to_update.length; i++) {
            var temp_col = col;
            var temp_row = row;
            if (paths_to_update[i]) {
                switch(i) {
                    case 0:
                        temp_row--;
                        break;
                    case 1:
                        temp_row++;
                        break;
                    case 2:
                        temp_col--;
                        break;
                    case 3:
                        temp_col++;
                        break;
                }
                Board.state[temp_row][temp_col].updateTile(Board.state[temp_row][temp_col].building.determineType(temp_col, temp_row, true))
            }
        }
    }
}