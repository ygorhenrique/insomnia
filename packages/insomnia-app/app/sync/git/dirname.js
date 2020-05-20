// @flow
import path from 'path';

export function dirname(filePath: string) {
  // Remove multiple slashes at the start, because Windows treats it as a network
  // as per UNC (https://en.wikipedia.org/wiki/Path_(computing)#Universal_Naming_Convention)

  return path.dirname(filePath);
}
