import * as crypto from 'crypto';
import * as fs from 'fs';

/**
 * Phase 1 Scaffold: Content Hasher Interface & Stub
 * Owner: Ashif (Implementation deferred to Phase 1)
 */

export interface IFileHasher {
  /**
   * Computes SHA-256 hash for a given file buffer or string content.
   */
  hashContent(content: string | Buffer): string;

  /**
   * Computes SHA-256 hash for a file from disk.
   */
  hashFile(filePath: string): Promise<string>;
}

/**
 * Baseline implementation stub for content hashing.
 * Full streaming pipeline and large-file optimizations will be completed in Phase 1 (TSK-P1-003).
 */
export class FileHasher implements IFileHasher {
  public hashContent(content: string | Buffer): string {
    return crypto.createHash('sha256').update(content).digest('hex');
  }

  public async hashFile(filePath: string): Promise<string> {
    const fileBuffer = await fs.promises.readFile(filePath);
    return this.hashContent(fileBuffer);
  }
}
