
$(document).ready(function() {
    // Get a reference to the canvas and its context
    const canvas = document.getElementById('graph-canvas');
    const ctx = canvas.getContext('2d');

    // Make sure the canvas fills its container
    canvas.width = $('#right-container').width();
    canvas.height = $('#right-container').height();

    // Export the canvas and ctx
    window.graphCanvas = canvas;
    window.graphCtx = ctx;

    yDisplay = $("#y-display");

    // Create drawGraph function
    window.drawGraph = function(gameFrame) {
        let minY = 0;
        let maxY = 0;
    
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        // Draw a new graph
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineWidth = 8;
        ctx.strokeStyle = '#ff0000';
        ctx.beginPath();
    
        for (let x = 0; x < canvas.width * 0.7; x++) {
            // Use graphFormula to compute newY
            let newY = window.graphFormula(x, gameFrame);
            let y = canvas.height / 2 + newY;
    
            ctx.lineTo(x, y);
    
            if (newY >= maxY) maxY = newY;
            if (newY <= minY) minY = newY;
        }
    
        ctx.stroke();
    
        window.deltaY = maxY + minY;
        yDisplay.html('<p>ΔY: ' + window.deltaY + '</p>');
    }
});


