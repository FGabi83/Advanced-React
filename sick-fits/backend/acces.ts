// At it's simplest, the access control is a function that returns a boolean.

import { permissionsList } from './schemas/fields';
import { ListAccessArgs } from './types';

export function isSignedIn({ session }): ListAccessArgs {
  return !!session;
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }): ListAccessArgs {
      return !!session?.data.role?.[permission];
    },
  ])
);

// Permissions check if somone meets a criteria - yes or no.

export const permissions = {
  ...generatedPermissions,
};

// Rule based function
