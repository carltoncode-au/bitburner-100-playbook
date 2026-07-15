/** @param {NS} ns **/
export async function main(ns) {
    const servers = [
        "joesguns",
        "phantasy",
        "silver-helix",
        "avmnite-02h",
        "omega-net"
    ];

    for (const s of servers) {
        ns.tprint("================================");
        ns.tprint("Server: " + s);
        ns.tprint("Max Money: $" + ns.format.number(ns.getServerMaxMoney(s)));
        ns.tprint("Min Security: " + ns.getServerMinSecurityLevel(s));
        ns.tprint("Hack Chance: " + (ns.hackAnalyzeChance(s) * 100).toFixed(2) + "%");
        ns.tprint("Hack Time: " + (ns.getHackTime(s) / 1000).toFixed(1) + "s");
    }
}