'use client';

import { GetUserDevices } from '@/lib/actions/device.action';
import { useSession } from 'next-auth/react';
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface UserContextType {
  devices: RedisDevice[];
  getDevices: () => Promise<void>;
  success: boolean;

  error?:
    | { message: string; details?: Record<string, string[]> | undefined }
    | undefined;
}

interface Props {
  devices: RedisDevice[];
  success: boolean;

  error?:
    | { message: string; details?: Record<string, string[]> | undefined }
    | undefined;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

function UserProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [state, setState] = useState<Props>({
    devices: [],
    success: false,
    error: undefined,
  });

  const getDevices = async () => {
    if (!session?.user?.id) return; // Ensure user is logged in
    const { success, data, error } = await GetUserDevices({
      _id: session.user.id,
    });
    if (success && data) {
      setState((old) => ({ ...old, devices: data, success, error }));
    }
  };

  return (
    <UserContext.Provider
      value={{
        devices: state.devices,
        success: state.success,
        error: state.error,
        getDevices,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use UserContext
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserProvider;
