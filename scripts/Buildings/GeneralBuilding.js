var GeneralBuilding = function(){

    // Default values
    this.size = 1;
    this.residential = false;
    this.build_time = [0, 0];
    this.built = function() {
        return this.build_time[1] > this.build_time[0];
    }
    this.determineType = function() {
        return this.type;
    }
    this.unlocks = [];
    this.hasTask = false;
    this.task = {};

    // Rendering methods
    this.getInnerComponents = function() {
        if (!this.built()) {
            return this.generateBuildingProcessGUI();
        } else {
            return "";
        }
    }
    this.toString = function(pretty) {
        var res = "";
        var split_up = this.type.split("_");
        for (var s of split_up) {
            res += s[0].toUpperCase() + s.slice(1);
            if (pretty) {
                res += " ";
            }
        }
        if (pretty) {
            res = res.substring(0, res.length - 1);
        }
        return res;
    }
    this.generateBuildingProcessGUI = function() {
        if (this.built()) {
            return "";
        }
        var perc = Math.ceil(this.build_time[1] / this.build_time[0] * 100);
        if (perc > 100) {
            perc = 100;
        }
        var html = "<div class='build_bar'>"
                 + "<div class='build_progress_bar' style='width: " + perc + "%'></div>"
                 + "</div>"
                 + "<div class='build_highlight'></div>";
        return html;
    }

}