$(document).ready(function() {

    const pointsDisplay = $('#points-display');
    
    window.formulaSinDivider = 40
    window.formulaSinMultiplier = 100
    window.formulaConstantOffset = 1

    // Declare an array to store the upgrades data
    window.upgradesData = [];
    window.upgradesOwned = [];
    window.upgradesInShop = []

    function updateConstants() {
        $('#constant-items').html(`
            <p>Divider: ${window.formulaSinDivider}</p>
            <p>Multiplier: ${window.formulaSinMultiplier}</p>
            <p>Offset: ${window.formulaConstantOffset}</p>
        `);
    }

    // Default graph formula
    window.graphFormula = function(x, gameFrame) {
        return (Math.sin((x + gameFrame) / window.formulaSinDivider) * window.formulaSinMultiplier) + window.formulaConstantOffset;
    }



    window.points = points = 0;
    
    // Define gameFrame
    let gameFrame = 0;

    // Define FPS limit and frame count
    const fpsLimit = 30;  // Set your desired FPS limit
    let frameCount = 0;

    // Define tick function
    function tick() {
        // Increment frame count
        frameCount++;

        // Redraw the graph every n frames
        if (frameCount >= 60 / fpsLimit) {
            // Increment gameFrame
            gameFrame++;
            $('#frame-display').html(`Frame: ${gameFrame}`);
            drawGraph(gameFrame);
            window.points += window.deltaY;
            frameCount = 0;
        }

        checkUpgrades();
        updateConstants();
        pointsDisplay.html('<p>Points: ' + window.points + '</p>');
        

        // Request the next frame
        requestAnimationFrame(tick);
    }

    // Start the game loop
    tick();
});


$(window).on("resize", function() {
    window.graphCanvas.width = $('#right-container').width();
    window.graphCanvas.height = $('#right-container').height();

    // Redraw the graph after resizing
    drawGraph(gameFrame);
});

// Load the upgrades data into memory
$.getJSON('upgrades.json', function(data) {
    window.upgradesData = data;
});

// Function to check for upgrade conditions
function checkUpgrades() {
    // Loop through the upgrades data
    for (let i = 0; i < window.upgradesData.length; i--) {
        let upgrade = window.upgradesData[i];
        
        // Check if the condition for this upgrade is met
        if (window.points >= upgrade.price && !window.upgradesInShop.includes(upgrade.name)) {
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
            window.upgradesInShop.append(upgrade);
            window.upgradesData.splice(i, 1);
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
    if (window.points >= upgrade.price) {
        // Subtract the price from the points
        points -= upgrade.price;
        
        // Remove the upgrade from the #upgrades div
        $(this).parent().remove();
        
        // Add the upgrade to the upgradesOwned list
        upgradesOwned.push(upgrade.name);
        
        // Add upgrade logic here (modify the graph)
    }
});