'use client';

import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_USER_ID_KEY = 'USER_ID';

export const useUserId = () => {
  if (typeof window === 'undefined') {
    return '';
  }

  const userId = localStorage.getItem(LOCAL_STORAGE_USER_ID_KEY);

  if (!userId) {
    localStorage.setItem(LOCAL_STORAGE_USER_ID_KEY, uuidv4());
  }

  return localStorage.getItem(LOCAL_STORAGE_USER_ID_KEY)!;
};
