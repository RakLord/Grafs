// import { Game } from "./game.js";
import { drawGraph } from "./graph.js";
// import { saveGame } from "./saving.js";

/*
yDisplay.html('<p>ΔY: ' + window.deltaY + '</p>');
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
        game.frameCount++;
        // Redraw the graph every n frames
        if (game.frameCount >= 60 / game.fpsLimit) {
            game.gameFrame++;
            $('#frame-display').html(`Frame: ${game.gameFrame}`);
            let deltaY = drawGraph(ctx, canvas, game);
            game.points += deltaY;
            game.frameCount = 0;
        }

        checkUpgrades();
        updateConstants();
        pointsDisplay.html('<p>' + Math.round(game.points) + '</p>');
        
        requestAnimationFrame(tick);
    }

    // Start game loop
    tick();
});


$(window).on("resize", function() {
    canvas.width = $('#right-container').width();
    canvas.height = $('#right-container').height();
});



// Function to check for upgrade conditions
function checkUpgrades() {
    // Loop through the upgrades data
    for (let i = 0; i < game.upgradesData.length; i--) {
        let upgrade = game.upgradesData[i];
        
        // Check if the condition for this upgrade is met
        if (game.points >= upgrade.price && !game.upgradesInShop.includes(upgrade.name)) {
            // Add this upgrade to the #upgrades div
            $('#upgrades').append(`
                <div class="upgrade">
                    <h2>${upgrade.name}</h2>
                    <p>${upgrade.description}</p>
                    <p>Price: ${upgrade.price}</p>
                    <p>Formula: ${upgrade.formula}</p>
                    <button class="buy-button" data-upgrade="${upgrade.name}">Buy</button>
                </div>
            `);
            console.log(upgrade)
            game.upgradesInShop.append(upgrade);
            game.upgradesData.splice(i, 1);
        }
    }
}

// Call checkUpgrades in the tick function or wherever you update the points

// Add click event handler for the buy buttons
$('#upgrades').on('click', '.buy-button', function() {
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