<?php
    include_once "./components/header.php";
?>
<div class='content_container'>
    <div id='board_container'></div>
    <div id='game_control_container'>
        <?php
            include_once "./components/resource_counters.php";
            include_once "./components/building_buttons.php";
        ?>
    </div>
</div>
<?php
    $enum_names = array("BuildingCategories");
    foreach ($enum_names as $enum) {
        echo "<script src='./scripts/enums/" . $enum . ".js'></script>";
    }
?>
<script src='./scripts/Inventory.js'></script>
<script src='./scripts/Population.js'></script>
<script src='./scripts/Tile.js'></script>
<script src='./scripts/Board.js'></script>
<script src='./scripts/Game.js'></script>
<script src='./scripts/Unlocks.js'></script>
<script src='./scripts/buildings/GeneralBuilding.js'></script>
<?php
    $building_types = array("Tent", "LumberMill", "Path", "PitMine");
    foreach ($building_types as $type) {
        echo "<script src='./scripts/buildings/" . $type . ".js'></script>";
    }
    include_once "./components/footer.php";
?>