# Bitburner Research Library

> Curated reference material used to support the Bitburner 100% Playbook.

---

# Purpose

This document tracks useful Bitburner references, guides, discussions, and verified facts.

The Playbook answers: **What are we doing?**  
The Research Library answers: **Why do we believe this is correct?**

---

# Reliability Scale

| Rating | Meaning |
|---|---|
| ★★★★★ | Official documentation or source code |
| ★★★★☆ | Strong community consensus or maintained guide |
| ★★★☆☆ | Useful but needs verification |
| ★★☆☆☆ | Anecdotal or narrow use case |
| ★☆☆☆☆ | Outdated, unreliable, or superseded |

---

# Official Resources

## Official Documentation

**URL:**  
https://bitburner-fork-oddiz.readthedocs.io/

**Reliability:** ★★★★★

**Topics:**
- Netscript
- Game mechanics
- Guides and tips

**Status:** Active reference

**Notes:**  
Primary reference for documented game mechanics and scripting behaviour.

---

## Official NS API Reference

**URL:**  
https://github.com/bitburner-official/bitburner-src/blob/stable/markdown/bitburner.ns.md

**Reliability:** ★★★★★

**Topics:**
- Complete Netscript API
- Function reference
- Parameters
- Return values
- Available namespaces

**Status:** Active reference

**Notes:**  
Authoritative reference for every `ns` function. Use when writing scripts or verifying API behaviour.

---

## Official Getting Started Guide

**URL:**  
https://github.com/bitburner-official/bitburner-src/blob/stable/src/Documentation/doc/en/help/getting_started.md

**Reliability:** ★★★★★

**Topics:**
- Early-game progression
- Starter scripts
- Rooting servers
- Purchasing servers
- Hacknet
- Early hacking strategy

**Status:** Active reference

**Notes:**  
Official beginner guide. Excellent for understanding intended progression. Strategy recommendations should be validated against current game balance before being incorporated into the Playbook.

---

## Official Source Code

**URL:**  
https://github.com/bitburner-official/bitburner-src

**Reliability:** ★★★★★

**Topics:**
- Achievement logic
- Hidden mechanics
- Exact formulas
- Current implementation

**Status:** Active reference

**Notes:**  
Ultimate source of truth. Use to verify undocumented mechanics, achievement requirements, formulas, and implementation details.

---

# Community Resources

## Placeholder - Steam Achievement Guide

**URL:**  
TBD

**Reliability:** ★★★☆☆

**Topics:**
- Achievements

**Status:** Pending review

**Notes:**  
Potentially useful, but must be verified before influencing the Playbook.

---

# Verified Knowledge

## Achievement Routing

**Status:** Pending

**Sources:**
- TBD

**Summary:**  
TBD

---

# Current Research Focus

## Automation Strategy

**Status:** Active

**Summary:**

Our current strategy favours reliable, unattended automation over short-term optimisation.

**Key Decisions**

- Use a central `deploy.js` script to automatically deploy workers to every rooted server.
- Use a generic `worker.js` that continuously decides whether to weaken, grow, or hack based on the server's current state.
- Allow deployment to any target by passing the desired server to `deploy.js`, avoiding hard-coded targets.
- Optimise for continuous progression while offline or AFK rather than maximum income per second.
- Delay advanced HWGW batch hacking until later in the playthrough when RAM, hacking speed, and available tools make batching worthwhile.

**Outcome**

This approach provides stable income, consistent hacking experience, and a strong platform for progressing through factions, augmentations, and eventually the remaining achievements.

---

# Research Log

## 2026-07-10

- Created Research Library.
- Added initial official documentation and source code references.

## 2026-07-12

- Added the official NS API Reference as the primary scripting reference.
- Added the official Getting Started Guide as the canonical early-game progression reference.
- Clarified the distinct roles of the documentation, API reference, guide, and source code.

## 2026-07-21

- Documented the current automation architecture built around `deploy.js` and `worker.js`.
- Confirmed the transition from individual hack scripts to a self-balancing worker model.
- Recorded the decision to prioritise reliability and unattended progression before advanced batch hacking.
- Identified achievement-focused research as the next major area of investigation following faction progression and BruteSSH acquisition.