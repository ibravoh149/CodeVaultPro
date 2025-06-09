import { Permission, RoleCategory } from './permission.types';

export const permissionSeedData: Array<Permission> = [
  {
    category: RoleCategory.BASIC,
    name: 'read-snippet',
    description: 'View public and authorized private/team snippets',
  },
  {
    category: RoleCategory.BASIC,
    name: 'create-snippet',
    description: 'Add new snippets to the cloud',
  },
  {
    category: RoleCategory.BASIC,
    name: 'edit-snippet',
    description: 'Modify existing snippets.',
  },
  {
    category: RoleCategory.BASIC,
    name: 'delete-snippet',
    description: 'Remove owned or authorized snippets.',
  },
  {
    category: RoleCategory.BASIC,
    name: 'restore-snippet-version',
    description: 'Revert to a previous version of a snippet',
  },
];
