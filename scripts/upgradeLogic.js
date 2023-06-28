
function upgradeUpdate(game){
    game.upgradesOwned.forEach((upgrade) => {
        if (upgrade.name === "Offset Increase 1" && upgrade.processed === false) {
            game.formulaConstantOffset *= 2;
            upgrade.processed = true;
        }

        if (upgrade.name === "Offset Increase 2" && upgrade.processed === false) {
            game.formulaConstantOffset *= 2;
            upgrade.processed = true;
        }
        if (upgrade.name === "Offset Increase 3 (MAX)" && upgrade.processed === false) {
            game.formulaConstantOffset *= 10;
            upgrade.processed = true;
        }
        if (upgrade.name === "Increase Sin Multiplier 1" && upgrade.processed === false) {
            game.formulaSinMultiplier *= 2;
            upgrade.processed = true;
        }
    });
}