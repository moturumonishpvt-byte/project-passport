import { execSync } from 'node:child_process';
import process from 'node:process';

console.log('═══════════════════════════════════════════════════════════');
console.log('       Project Passport — Full Verification Suite         ');
console.log('═══════════════════════════════════════════════════════════\n');

const steps = [
  { name: 'Environment Check', cmd: 'node ./scripts/check-environment.mjs' },
  { name: 'SDD Artifacts Validation', cmd: 'node ./.specify/scripts/validate-sdd.mjs' },
  { name: 'Prettier Code Formatting Check', cmd: 'npx prettier --check .' },
  { name: 'ESLint Code Quality Check', cmd: 'npx eslint .' },
  { name: 'TypeScript Typecheck (compile)', cmd: 'npx tsc -p ./ --noEmit' },
  { name: 'Extension Bundling (esbuild)', cmd: 'node esbuild.config.mjs' },
  { name: 'Vitest Automated Test Suite', cmd: 'npx vitest run' },
];

let allPassed = true;

for (let i = 0; i < steps.length; i++) {
  const step = steps[i];
  console.log(`[${i + 1}/${steps.length}] Running: ${step.name}...`);
  try {
    execSync(step.cmd, { stdio: 'inherit', env: process.env });
    console.log(`✅ [${i + 1}/${steps.length}] ${step.name} passed.\n`);
  } catch (err) {
    console.error(`❌ [${i + 1}/${steps.length}] ${step.name} FAILED!`);
    allPassed = false;
    break;
  }
}

console.log('───────────────────────────────────────────────────────────');
if (allPassed) {
  console.log('🎉 ALL PROJECT VERIFICATION CHECKS PASSED SUCCESSFULLY!\n');
  process.exit(0);
} else {
  console.error('🚨 Project verification failed. Resolve the issue above before committing.\n');
  process.exit(1);
}
