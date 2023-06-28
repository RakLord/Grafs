export function drawGraph(ctx, canvas, game) {
    let minY = 0;
    let maxY = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw a horizontal opaque white line across the middle of the canvas
    ctx.beginPath(); 
    ctx.moveTo(0, canvas.height / 2); 
    ctx.lineTo(canvas.width, canvas.height / 2); 
    ctx.lineWidth = 3; 
    ctx.strokeStyle = '#ffffff'; 
    ctx.stroke(); // Draw the line
    
    // Draw a new graph
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#ff0000';
    ctx.beginPath();

    for (let x = 0; x < canvas.width * 0.7; x++) {
        // Use graphFormula to compute newY
        let newY = game.graphFormula(x, game.gameFrame);
        let y = canvas.height / 2 - newY; // This has to be - to move graph UP and not affect deltaY

        ctx.lineTo(x, y);

        if (newY >= maxY) maxY = newY;
        if (newY <= minY) minY = newY;
    }

    ctx.stroke();



    let deltaY = maxY + minY;
    return deltaY
}
