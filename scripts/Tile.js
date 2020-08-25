function Tile(type, pos) {
    this.type = type;
    this.col = pos[0];
    this.row = pos[1];
    this.getRenderableForm = function() {
        var rand_type = 1 + Math.floor(Math.random() * 3);
        var render_type = this.type;
        var html = "<div class='board_tile " 
                 + render_type
                 + " type-" + rand_type + "' "
                 + "id='tile-" + this.col + "-" + this.row + "' "
                 + "onclick='Board.handleTileSelect(" + this.col + ", " + this.row + ")'>"
                 + "</div>";
        return html;
    }
    this.updateTile = function(type)  {
        if (this.type == 'water') {
            return;
        }
        var elem = this.getElement();
        elem.classList.remove(this.type);
        elem.classList.add(type);
        this.type = type;
    }
    this.updateInnerComponents = function() {
        var inner_components = "";
        if (this.builtOn()) {
            inner_components = this.building.getInnerComponents();
        }
        this.getElement().innerHTML = inner_components;
    }
    this.buildOnTile = function(building) {
        if (building.size == 1) {
            this.building = building;
        }
        this.updateTile(building.determineType(this.col, this.row));
    }
    this.builtOn = function() {
        return this.building != undefined;
    }
    this.getElement = function() {
        return document.getElementById('tile-' + this.col + "-" + this.row);
    }
    this.handleSelect = function() {
        switch(this.type) {
            case "wheat":
                Inventory.wheat++;
                break;
            case "forest":
                Inventory.wood++;
                break;
        }
        Inventory.updateDisplay();
    }
}