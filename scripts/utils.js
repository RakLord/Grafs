export function checkUpgrades(game) {
    // Loop through the upgrades data
    let upgradeDataLength = game.upgradesData.length;
    for (let i = upgradeDataLength - 1; i >= 0; i--) {
        let upgrade = game.upgradesData[i];
        // Check if the condition for this upgrade is met
        if (game.points >= upgrade.price) {
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
            game.upgradesInShop.push(upgrade);
            game.upgradesData.splice(i, 1);
        }
    }
}