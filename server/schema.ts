import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum,
  boolean,
} from 'drizzle-orm/pg-core';
import type { AdapterAccountType } from 'next-auth/adapters';
import { createId } from '@paralleldrive/cuid2';

export const RoleEnum = pgEnum('roles', ['user', 'admin']);

export const users = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name'),
  email: text('email').unique(),
  password: text('password'),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  twoFactorEnabled: boolean('twoFactorEnabled').default(false),
  role: RoleEnum('roles').default('user'),
});

export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const emailTokens = pgTable(
  'email_token',
  {
    id: text('id')
      .notNull()
      .$defaultFn(() => createId()),
    email: text('email').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (emailToken) => ({
    compositePk: primaryKey({
      columns: [emailToken.id, emailToken.token],
    }),
  })
);

export const passwordResetTokens = pgTable(
  'password_reset_tokens',
  {
    id: text('id')
      .notNull()
      .$defaultFn(() => createId()),
    email: text('email').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (emailToken) => ({
    compositePk: primaryKey({
      columns: [emailToken.id, emailToken.token],
    }),
  })
);

export const twoFactorTokens = pgTable(
  'two_factor_tokens',
  {
    id: text('id')
      .notNull()
      .$defaultFn(() => createId()),
    email: text('email').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (emailToken) => ({
    compositePk: primaryKey({
      columns: [emailToken.id, emailToken.token],
    }),
  })
);
