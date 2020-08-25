function toggleBuildSubsection(type) {
    var elem = document.getElementById(type + "_subsection");
    if (elem.style.display == "none") {
        elem.style.display = "inline-block";
    } else {
        elem.style.display = "none";
    }
}

function addBuildingButton(category, className, prettyName) {
    var init_html = document.getElementById(category.name + "_subsection_buttons").innerHTML;
    var new_html = "<div class='sub_build_button' onclick='Game.build(new " + className + "())'><h5>" + prettyName + "</h5></div>";
    var fin_html = init_html + new_html;
    document.getElementById(category.name + "_subsection_buttons").innerHTML = fin_html;
}