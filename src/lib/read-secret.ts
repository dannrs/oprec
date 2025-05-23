import { readFileSync, existsSync } from 'fs';

export function readSecret(filePath: string) {
  return existsSync(filePath)
    ? readFileSync(filePath, 'utf8').trim()
    : undefined;
}
