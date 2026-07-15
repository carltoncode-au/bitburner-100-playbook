/** @param {NS} ns **/
export async function main(ns) {
    const target = ns.args[0];

    while (true) {
        ns.print(`Hacking ${target}...`);
        const money = await ns.hack(target);
        ns.print(`Stole $${ns.format.number(money)}`);
    }
}