class Game {
    constructor(data) {
        this.version = "0.0.1";
    
        this.points = 0;

        this.formulaSinDivider = 40
        this.formulaSinMultiplier = 100
        this.formulaConstantOffset = 1

        this.upgradesData = [];
        this.upgradesOwned = [];
        this.upgradesInShop = [];

        this.graphFormula = function(x) {
            return (Math.sin((x + this.gameFrame) / this.formulaSinDivider) * this.formulaSinMultiplier) + this.formulaConstantOffset;
        }

        this.fpsLimit = 30;
        this.gameFrame = 0;
        this.frameCount = 0;

        $.getJSON('upgrades.json', function(data) {
            this.upgradesData = data;
        });
    }
}


