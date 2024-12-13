//everything cache related to nextjs
import { unstable_cache as nextCache } from "next/cache";

//for request memontization
import { cache as reactCache } from "react";

type Callback = (...args: unknown[]) => Promise<unknown>;

export function cache<T extends Callback>(
  cb: T,
  keyParts: string[],
  options: { revalidate?: number | false; tags?: string[] } = {},
) {
  return nextCache(reactCache(cb), keyParts, options);
}
