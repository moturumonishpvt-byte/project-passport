import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';

describe('End-to-End Suite Smoke Test (Phase 0 Baseline)', () => {
  it('should verify test fixtures are readable', () => {
    const fixturePackageJson = path.resolve(__dirname, '../fixtures/sample-repo/package.json');
    expect(fs.existsSync(fixturePackageJson)).toBe(true);

    const content = JSON.parse(fs.readFileSync(fixturePackageJson, 'utf8'));
    expect(content.name).toBe('sample-fixture-repo');
  });
});
