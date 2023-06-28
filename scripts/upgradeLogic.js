const upgradesEffects = {
    "Offset Increase 1": (game, upgrade) => {
        if (!upgrade.processed) {
            game.formulaConstantOffset *= 2;
            upgrade.processed = true;
        }
    },
    "Offset Increase 2": (game, upgrade) => {
        if (!upgrade.processed) {
            game.formulaConstantOffset *= 2;
            upgrade.processed = true;
        }
    },
    "Offset Increase 3 (MAX)": (game, upgrade) => {
        if (!upgrade.processed) {
            game.formulaConstantOffset *= 10;
            upgrade.processed = true;
        }
    },
    "Increase Sin Multiplier 1": (game, upgrade) => {
        if (!upgrade.processed) {
            game.formulaSinMultiplier *= 1.2;
            upgrade.processed = true;
        }
    },
    "Translate Wave 1": (game, upgrade) => {
        if (!upgrade.processed) {
            game.formulaConstantOffset += game.formulaSinMultiplier * 0.8;
            upgrade.processed = true;
        }
    },
    "Decreased Frequency 1": (game, upgrade) => {
        if (!upgrade.processed) {
            game.formulaSinDivider *= 1.5;
            upgrade.processed = true;
        }
    },
    "Decreased Frequency 2": (game, upgrade) => {
        if (!upgrade.processed) {
            game.formulaSinDivider *= 1.5;
            upgrade.processed = true;
        }
    },
    "Decreased Frequency 3": (game, upgrade) => {
        if (!upgrade.processed) {
            game.formulaSinDivider *= 1.5;
            upgrade.processed = true;
        }
    }
}

function upgradeUpdate(game) {
    game.upgradesOwned.forEach((upgrade) => {
        const effect = upgradesEffects[upgrade.name];
        if (effect) {
            effect(game, upgrade);
        }
    });
}
