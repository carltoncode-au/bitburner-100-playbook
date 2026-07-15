/** @param {NS} ns */
export async function main(ns) {
    const target = ns.args[0] ?? "n00dles";

    const securityBuffer = 5;
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