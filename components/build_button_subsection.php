<div class='build_button' id='<?php echo $type; ?>_button' onclick="toggleBuildSubsection('<?php echo $type; ?>')"><i class='fas fa-<?php echo $build_icons[$type]; ?>'></i></div>
<div class='build_subsection' id='<?php echo $type; ?>_subsection' style='display: none;'>
    <div class='build_subsection_close' onclick="toggleBuildSubsection('<?php echo $type; ?>')"><i class='fas fa-times'></i></div>
    <div id='<?php echo $type; ?>_subsection_buttons'>
    <?php
        include("./components/build_button_subsections/" . $type . ".php");
    ?>
    </div>
</div>