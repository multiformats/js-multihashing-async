export interface Digest {
  (data: Uint8Array): Promise<Uint8Array> | Uint8Array
}
