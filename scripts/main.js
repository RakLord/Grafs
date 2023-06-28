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
    let upgradeName = $(this).data('upgrade');
    let upgrade = game.upgradesInShop.find(upg => upg.name === upgradeName);

    // Check if player has enough points
    if (game.points >= upgrade.price) {
        game.points -= upgrade.price;
        $(this).parent().remove();
        // Add the upgrade to the upgradesOwned list
        game.upgradesOwned.push(upgrade.name);
        console.log("Upgrade Bought: ", upgradeName);
        
    }
});