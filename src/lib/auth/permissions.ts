import { createAccessControl } from 'better-auth/plugins/access';
import { defaultStatements, adminAc } from 'better-auth/plugins/admin/access';

export const statement = {
  ...defaultStatements,
  event: ['create', 'read', 'update', 'delete'],
} as const;

export const ac = createAccessControl(statement);

export const admin = ac.newRole({
  event: ['create', 'read', 'update', 'delete'],
  ...adminAc.statements,
});

export const pengurus = ac.newRole({
  event: ['create', 'read', 'update', 'delete'],
  user: ['create', 'delete', 'list'],
});

export const anggota = ac.newRole({
  event: ['read'],
});
