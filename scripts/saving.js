 function newGame() {
    return new Game();
}

function saveGame() {
    localStorage.setItem("grafsSave", getSaveString());
    console.log("Saved");
}

function getSaveString() {
    let save = getMinimalGameObj();
    return JSON.stringify(save);
}

function getMinimalGameObj() {
    let ret = {
        version: game.version,
        points: game.points,
        formulaSinDivider: game.formulaSinDivider,
        formulaSinMultiplier: game.formulaSinMultiplier,
        formulaConstantOffset: game.formulaConstantOffset,
        upgradesData: game.upgradesData,
        upgradesOwned: game.upgradesOwned,
        upgradesInShop: game.upgradesInShop,
    };
    console.log(ret);
    return ret;
}