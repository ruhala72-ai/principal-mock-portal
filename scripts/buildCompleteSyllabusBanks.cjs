const fs = require('fs');
const path = require('path');

// Let's create the script that builds both pristine bank files:
// 1. src/data/upscPrincipalBank.ts (120 Questions across 8 areas)
// 2. src/data/upInterCollegeBank.ts (120 Questions: 30 Sec I + 30 Sec II + 60 Sec III)

console.log("Preparing builder script...");
