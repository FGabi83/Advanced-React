// At it's simplest, the access control is a function that returns a boolean.

import { ListAccessArgs } from './types';

export function isSignedIn({ session }): ListAccessArgs {
  return !!session;
}
