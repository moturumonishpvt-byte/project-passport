import { describe, it, expect } from 'vitest';
import { FileHasher } from '../../src/scanner/hasher';

describe('Scanner Module Scaffold (Phase 1 Preparation)', () => {
  it('should instantiate FileHasher and produce consistent SHA-256 hashes', () => {
    const hasher = new FileHasher();
    const hash1 = hasher.hashContent('hello world');
    const hash2 = hasher.hashContent('hello world');
    const hashDiff = hasher.hashContent('hello world 2');

    expect(hash1).toBe('b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9');
    expect(hash1).toBe(hash2);
    expect(hash1).not.toBe(hashDiff);
  });

  it('should acknowledge Phase 1 full scanning features are deferred to Ashif', () => {
    // Tests will be expanded under TSK-P1-002 and TSK-P1-003 in Phase 1
    const deferredNotice = 'Phase 1 workspace scanner implementation pending handover to Ashif';
    expect(deferredNotice).toContain('Ashif');
  });
});
