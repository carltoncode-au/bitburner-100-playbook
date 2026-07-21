/** @param {NS} ns */
export async function main(ns) {
    const target = ns.args[0] ?? "n00dles";

    // Weaken if security rises more than 5 above the server minimum.
    const securityBuffer = 5;

    // Grow whenever money falls below 25% of the server maximum.
    const moneyThreshold = 0.25;

    while (true) {
        const currentSecurity = ns.getServerSecurityLevel(target);
        const minimumSecurity = ns.getServerMinSecurityLevel(target);

        const currentMoney = ns.getServerMoneyAvailable(target);
        const maximumMoney = ns.getServerMaxMoney(target);

        if (currentSecurity > minimumSecurity + securityBuffer) {
            await ns.weaken(target);
        } else if (currentMoney < maximumMoney * moneyThreshold) {
            await ns.grow(target);
        } else {
            await ns.hack(target);
        }
    }
}