class Game {
    constructor(data) {
        this.version = "0.0.1";
    
        this.points = 0;

        this.formulaSinDivider = 8
        this.formulaSinMultiplier = 100
        this.formulaConstantOffset = 0.01

        this.upgradesData = [];
        this.upgradesOwned = [];
        this.upgradesInShop = [];

        this.graphFormula;

        this.graphFormula = function(x) {
            return (Math.sin((x + this.gameFrame) / this.formulaSinDivider) * this.formulaSinMultiplier) + this.formulaConstantOffset;
        }

        this.fpsLimit = 30;
        this.gameFrame = 0;
        this.frameCount = 0;

        const loadJSON = new Promise((resolve, reject) => {
            $.getJSON('upgrades.json', (data) => {
                resolve(data);
            }).fail((error) => {
                reject(error);
            });
        });

        loadJSON.then((data) => {
            this.upgradesData = data;
            // Continue with the program logic here
        }).catch((error) => {
            // Handle error loading JSON
        });
    }
}


