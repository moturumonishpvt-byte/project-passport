import { execSync } from 'node:child_process';
import process from 'node:process';

console.log('═══════════════════════════════════════════════════════════');
console.log('       Project Passport — Environment Verification        ');
console.log('═══════════════════════════════════════════════════════════\n');

let hasFailure = false;

function pass(item, details) {
  console.log(`✅ PASS: ${item} — ${details}`);
}

function warn(item, details) {
  console.log(`⚠️  WARN: ${item} — ${details}`);
}

function fail(item, details) {
  console.log(`❌ FAIL: ${item} — ${details}`);
  hasFailure = true;
}

// 1. Check Node.js
const nodeVersion = process.versions.node;
const majorNode = parseInt(nodeVersion.split('.')[0], 10);
if (majorNode >= 20) {
  pass('Node.js LTS Version', `v${nodeVersion} (Supported >= 20.0.0)`);
} else {
  fail('Node.js Version', `v${nodeVersion} (Required: >= 20.0.0)`);
}

// 2. Check npm
try {
  const npmVersion = execSync('npm -v', { encoding: 'utf8' }).trim();
  const majorNpm = parseInt(npmVersion.split('.')[0], 10);
  if (majorNpm >= 10) {
    pass('npm Package Manager', `v${npmVersion} (Supported >= 10.0.0)`);
  } else {
    warn('npm Version', `v${npmVersion} (Recommended: >= 10.0.0)`);
  }
} catch (err) {
  fail('npm Package Manager', `Failed to execute npm: ${err.message}`);
}

// 3. Check Git
try {
  const gitVersion = execSync('git --version', { encoding: 'utf8' }).trim();
  pass('Git Version Control', gitVersion);
} catch (err) {
  fail('Git Version Control', `Git is not installed or not in PATH: ${err.message}`);
}

// 4. Check Git configuration
try {
  const gitUser = execSync('git config --get user.name', { encoding: 'utf8' }).trim();
  const gitEmail = execSync('git config --get user.email', { encoding: 'utf8' }).trim();
  if (gitUser && gitEmail) {
    pass('Git Identity', `${gitUser} <${gitEmail}>`);
  } else {
    warn('Git Identity', 'Git user.name or user.email is not set.');
  }
} catch {
  warn('Git Identity', 'Unable to read git config user identity.');
}

// 5. Operating System & Architecture
pass('Operating System', `${process.platform} (${process.arch})`);

console.log('\n───────────────────────────────────────────────────────────');
if (hasFailure) {
  console.error('🚨 Environment check failed! Please fix the errors above.\n');
  process.exit(1);
} else {
  console.log('✨ Environment is fully configured for Project Passport development.\n');
  process.exit(0);
}
