/** @param {NS} ns **/
export async function main(ns) {
    const target = ns.args[0];

    while (true) {
        ns.print(`Growing ${target}...`);
        await ns.grow(target);
    }
}