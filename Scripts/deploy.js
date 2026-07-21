/** @param {NS} ns */
export async function main(ns) {
    const worker = "worker.js";
    const source = "home";

    // Discover every server connected to the network.
    const servers = discoverServers(ns, source);

    // Automatically choose the most profitable server that can be hacked.
    const target = chooseBestTarget(ns, servers);

    if (!target) {
        ns.tprint("ERROR: No suitable hacking target was found.");
        return;
    }

    ns.tprint(`Selected target: ${target}`);

    for (const server of servers) {
        // Keep home RAM free for programs and utility scripts.
        if (server === source) {
            continue;
        }

        if (!ns.hasRootAccess(server)) {
            ns.tprint(`Skipped ${server}: no root access.`);
            continue;
        }

        const maxRam = ns.getServerMaxRam(server);

        if (maxRam === 0) {
            ns.tprint(`Skipped ${server}: no RAM.`);
            continue;
        }

        // Stop the previous worker before calculating available RAM.
        ns.scriptKill(worker, server);

        await ns.scp(worker, server, source);

        const usedRam = ns.getServerUsedRam(server);
        const scriptRam = ns.getScriptRam(worker, server);
        const availableRam = maxRam - usedRam;
        const threads = Math.floor(availableRam / scriptRam);

        if (threads <= 0) {
            ns.tprint(`Skipped ${server}: insufficient available RAM.`);
            continue;
        }

        const pid = ns.exec(worker, server, threads, target);

        if (pid === 0) {
            ns.tprint(`ERROR: Failed to start ${worker} on ${server}.`);
        } else {
            ns.tprint(
                `Started ${worker} on ${server} with ${threads} threads targeting ${target}.`
            );
        }
    }
}

/**
 * Recursively discovers every server connected to home.
 *
 * @param {NS} ns
 * @param {string} startingServer
 * @returns {string[]}
 */
function discoverServers(ns, startingServer) {
    const discovered = [];
    const queue = [startingServer];

    while (queue.length > 0) {
        const server = queue.shift();

        if (discovered.includes(server)) {
            continue;
        }

        discovered.push(server);

        for (const neighbour of ns.scan(server)) {
            if (!discovered.includes(neighbour)) {
                queue.push(neighbour);
            }
        }
    }

    return discovered;
}

/**
 * Chooses the best currently hackable target using expected money per unit
 * of hacking time.
 *
 * @param {NS} ns
 * @param {string[]} servers
 * @returns {string | null}
 */
function chooseBestTarget(ns, servers) {
    const hackingLevel = ns.getHackingLevel();
    let bestTarget = null;
    let bestScore = 0;

    for (const server of servers) {
        if (!ns.hasRootAccess(server)) {
            continue;
        }

        if (ns.getServerRequiredHackingLevel(server) > hackingLevel) {
            continue;
        }

        const maxMoney = ns.getServerMaxMoney(server);

        if (maxMoney <= 0) {
            continue;
        }

        const hackPercentage = ns.hackAnalyze(server);
        const hackChance = ns.hackAnalyzeChance(server);
        const hackTime = ns.getHackTime(server);

        const score =
            (maxMoney * hackPercentage * hackChance) / hackTime;

        if (score > bestScore) {
            bestScore = score;
            bestTarget = server;
        }
    }

    return bestTarget;
}