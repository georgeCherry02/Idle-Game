<div class='build_buttons_container'>
    <?php
        $build_types = array("housing", "production", "aesthetic", "work_dist");
        $build_icons = array("housing" => "home", "production" => "hammer", "aesthetic" => "leaf", "work_dist" => "screwdriver");
        foreach ($build_types as $type) {
            include "./components/build_button_subsection.php";
        }
    ?>
<!--    <div class='build_button' id='aesthetic_button' onclick="toggleBuildSubsection('aesthetic')"><i class='fas fa-leaf'></i></div>
    <div class='build_subsection' id='housing_subsection' style='display: none;'>
        <
    </div>
    <div class='build_subsection' id='aesthetic_subsection' style='display: none;'></div>-->
</div>
