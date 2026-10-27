import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../');

console.log('🔍 Validating Spec-Driven Development (SDD) artifacts...');

let hasErrors = false;

function error(msg) {
  console.error(`❌ SDD Validation Error: ${msg}`);
  hasErrors = true;
}

function success(msg) {
  console.log(`✅ ${msg}`);
}

// 1. Check canonical constitution
const canonicalConstitutionPath = path.join(rootDir, '.specify', 'memory', 'constitution.md');
if (!fs.existsSync(canonicalConstitutionPath)) {
  error('Canonical constitution missing at .specify/memory/constitution.md');
} else {
  success('Found canonical constitution at .specify/memory/constitution.md');
}

// 2. Check specs/constitution.md link
const specsConstitutionPath = path.join(rootDir, 'specs', 'constitution.md');
if (!fs.existsSync(specsConstitutionPath)) {
  error('specs/constitution.md is missing');
} else {
  const content = fs.readFileSync(specsConstitutionPath, 'utf8');
  if (!content.includes('.specify/memory/constitution.md')) {
    error('specs/constitution.md does not reference the canonical constitution');
  } else {
    success('specs/constitution.md properly references canonical constitution');
  }
}

// 3. Check architecture.md
const archPath = path.join(rootDir, 'specs', 'architecture.md');
if (!fs.existsSync(archPath)) {
  error('specs/architecture.md is missing');
} else {
  success('specs/architecture.md is present');
}

// 4. Check all 5 phases (phase-0 to phase-4)
const requiredPhases = ['phase-0', 'phase-1', 'phase-2', 'phase-3', 'phase-4'];
const requiredFiles = ['spec.md', 'plan.md', 'tasks.md', 'acceptance.md'];

for (const phase of requiredPhases) {
  const phaseDir = path.join(rootDir, 'specs', phase);
  if (!fs.existsSync(phaseDir)) {
    error(`Missing specification directory: specs/${phase}`);
    continue;
  }

  for (const file of requiredFiles) {
    const filePath = path.join(phaseDir, file);
    if (!fs.existsSync(filePath)) {
      error(`Missing required SDD artifact: specs/${phase}/${file}`);
    } else {
      const stats = fs.statSync(filePath);
      if (stats.size < 50) {
        error(`SDD artifact specs/${phase}/${file} is suspiciously empty (< 50 bytes)`);
      }
    }
  }
}

if (hasErrors) {
  console.error('\n🚨 SDD Validation failed. Please fix the missing or invalid artifacts.\n');
  process.exit(1);
} else {
  console.log('\n✨ All Spec-Driven Development (SDD) artifacts are valid and present!\n');
  process.exit(0);
}
