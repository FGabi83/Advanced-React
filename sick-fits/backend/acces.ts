// At it's simplest, the access control is a function that returns a boolean.

import { permissionsList } from './schemas/fields';
import { ListAccessArgs } from './types';

export function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission];
    },
  ])
);

// Permissions check if somone meets a criteria - yes or no.

export const permissions = {
  ...generatedPermissions,
};

// Rule based function
// Rules can return a boolean - yes or no - or a filter which limits which products they can CRUD.

export const rules = {
  // 1. Do they have permission of canManageProducts
  canManageProducts({ session }: ListAccessArgs) {
    if (permissions.canManageProducts({ session })) {
      return true;
    }

    // 2. If not, do they own this item?
    return { user: { id: session.itemId } };
  },
  canReadProducts({ session }: ListAccessArgs) {
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    return { status: 'AVAILABLE' };
  },
};
