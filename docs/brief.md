# Seed Swap: Garden Seed Packet Vault
You're an avid home gardener with a shoebox overflowing with seed packets — some half-used, some expired, some gifted from neighbors. Build a single-page **Seed Packet Vault** where you can catalog every packet in your stash.

Each seed entry should capture:
- **Plant name** (e.g. 'Cherry Tomato – Sun Gold')
- **Seed source** (bought, saved, swapped, gifted)
- **Packet year / expiration**
- **Quantity remaining** (full / partial / nearly empty)
- **Notes** (e.g. 'great germination last spring', 'needs soaking overnight')

The vault should display all seeds as a browsable card grid. Users should be able to **filter by source type** (bought / saved / swapped / gifted) and **sort by expiration year** so they know which seeds to use up first. Each card should visually flag packets that are expired or expiring this year with a distinct color or badge.

A simple **stats bar** at the top should show total packets, how many are expiring soon, and a breakdown count by source type.

All data must persist in `localStorage` so the vault survives a page refresh. No backend, no login required.