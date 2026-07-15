/** @param {NS} ns **/
export async function main(ns) {
    const server = ns.getHostname();
    const neighbours = ns.scan(server);

    const hackingLevel = ns.getHackingLevel();

    let availableOpeners = 0;

    if (ns.fileExists("BruteSSH.exe", "home")) availableOpeners++;
    if (ns.fileExists("FTPCrack.exe", "home")) availableOpeners++;
    if (ns.fileExists("relaySMTP.exe", "home")) availableOpeners++;
    if (ns.fileExists("HTTPWorm.exe", "home")) availableOpeners++;
    if (ns.fileExists("SQLInject.exe", "home")) availableOpeners++;

    ns.tprint(`Connected to ${server}:`);
    ns.tprint(`Port openers available: ${availableOpeners}`);

    for (const neighbour of neighbours) {
        const requiredLevel =
            ns.getServerRequiredHackingLevel(neighbour);

        const requiredPorts =
            ns.getServerNumPortsRequired(neighbour);

        const hasRoot =
            ns.hasRootAccess(neighbour);

        const currentMoney =
            ns.getServerMoneyAvailable(neighbour);

        const maxMoney =
            ns.getServerMaxMoney(neighbour);

        const canHack =
            hackingLevel >= requiredLevel;

        const canRoot =
            availableOpeners >= requiredPorts;

        let status;

        if (hasRoot) {
            status = "ROOTED";
        } else if (canRoot) {
            status = "ROOTABLE NOW";
        } else {
            status = "LOCKED";
        }

        ns.tprint(
            `${neighbour} | ` +
            `Hack: ${requiredLevel} ${canHack ? "(OK)" : "(LOW)"} | ` +
            `Ports: ${requiredPorts}/${availableOpeners} | ` +
            `Status: ${status} | ` +
            `Money: $${ns.format.number(currentMoney)} / ` +
            `$${ns.format.number(maxMoney)}`
        );
    }
}