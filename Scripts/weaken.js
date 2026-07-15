/** @param {NS} ns **/
export async function main(ns) {
    const target = ns.args[0];

    while (true) {
        ns.print(`Weakening ${target}...`);
        await ns.weaken(target);
    }
}