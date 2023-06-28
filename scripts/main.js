import { drawGraph } from "./graph.js";
import { checkUpgrades } from "./utils.js";
/*

*/

let game;
let canvas;
let ctx;

$(document).ready(function() {

    const pointsDisplay = $('#points-display');

    canvas = document.getElementById('graph-canvas');
    ctx = canvas.getContext('2d');

    // Make sure the canvas fills its container
    canvas.width = $('#right-container').width();
    canvas.height = $('#right-container').height();
    
    let yDisplay = $("#y-display");

    game = newGame();

    function updateConstants() {
        $('#constant-items').html(`
            <p>Divider: ${game.formulaSinDivider}</p>
            <p>Multiplier: ${game.formulaSinMultiplier}</p>
            <p>Offset: ${game.formulaConstantOffset}</p>
        `);
    }

    function tick() {
        let deltaY = 0;
        game.frameCount++;
        // Runs every 60 frames
        if (game.frameCount >= 60 / game.fpsLimit) {
            game.gameFrame++;

            $('#frame-display').html(`Frame: ${game.gameFrame}`);

            deltaY = drawGraph(ctx, canvas, game);

            yDisplay.html('<p>ΔY: ' + deltaY.toFixed(2) + '</p>');
            pointsDisplay.html('<p>' + game.points.toFixed(2) + '</p>');

            checkUpgrades(game);
            updateConstants();

            game.frameCount = 0;
        }        
        game.points += deltaY;
        requestAnimationFrame(tick);
    }
    // Start game loop
    tick();
});


$(window).on("resize", function() {
    canvas.width = $('#right-container').width();
    canvas.height = $('#right-container').height();
});


// Add click event handler for the buy buttons
$('#upgrades').on('click', '.buy-button', function() {
    console.log("Clicked" + $(this));
    let upgradeName = $(this).data('upgrade');
    
    // Find the upgrade data
    let upgrade = upgradesData.find(upg => upg.name === upgradeName);
    
    // Check if player has enough points
    if (points >= upgrade.price) {
        // Subtract the price from the points
        points -= upgrade.price;
        
        // Remove the upgrade from the #upgrades div
        $(this).parent().remove();
        
        // Add the upgrade to the upgradesOwned list
        upgradesOwned.push(upgrade.name);
        
        // Add upgrade logic here (modify the graph)
    }
});