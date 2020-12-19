import type { HashName } from 'multihashes'

export interface Digest {
  (data: Uint8Array): Promise<Uint8Array> | Uint8Array
}

// This works around the TS bug which emits bad import paths
// on imports in js files.
export type { HashName }
