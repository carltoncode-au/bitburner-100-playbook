/** @param {NS} ns */
export async function main(ns) {
    const source = ns.getHostname();
    const worker = "worker.js";
    const target = "joesguns";

    const discovered = new Set([source]);
    const queue = [source];
    const servers = [];

    // Discover every server reachable from home.
    while (queue.length > 0) {
        const current = queue.shift();

        for (const neighbour of ns.scan(current)) {
            if (!discovered.has(neighbour)) {
                discovered.add(neighbour);
                queue.push(neighbour);
                servers.push(neighbour);
            }
        }
    }

    for (const server of servers) {
        if (!ns.hasRootAccess(server)) {
            ns.tprint(`Skipped ${server}: no root access.`);
            continue;
        }

        await ns.scp(worker, server, source);

        ns.scriptKill("hack.js", server);
        ns.scriptKill("grow.js", server);
        ns.scriptKill("weaken.js", server);
        ns.scriptKill(worker, server);

        const maxRam = ns.getServerMaxRam(server);
        const usedRam = ns.getServerUsedRam(server);
        const scriptRam = ns.getScriptRam(worker, server);
        const availableRam = maxRam - usedRam;
        const threads = Math.floor(availableRam / scriptRam);

        if (threads <= 0) {
            ns.tprint(`Skipped ${server}: not enough available RAM.`);
            continue;
        }

        const pid = ns.exec(worker, server, threads, target);

        if (pid !== 0) {
            ns.tprint(
                `Started ${worker} on ${server} with ${threads} threads targeting ${target}.`
            );
        } else {
            ns.tprint(`Failed to start ${worker} on ${server}.`);
        }
    }
}