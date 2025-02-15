import { store } from 'store';
import type { User } from 'domain/models';

export const getUser = (): User => {
  const { user } = store.getState().persist;

  if (user) return user;

  return null as unknown as User;
};
