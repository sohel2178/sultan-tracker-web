'use client';

import React, { createContext, ReactNode, useContext, useState } from 'react';

interface UserContextType {
  devices: RedisDevice[];
  setDevices: (devices: RedisDevice[]) => void;
  getSelectDevice: (id: string) => RedisDevice | null;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

function UserProvider({
  children,
  initialDevices,
}: {
  children: ReactNode;
  initialDevices: RedisDevice[];
}) {
  const [devices, setDevices] = useState<RedisDevice[]>(initialDevices);

  const getSelectDevice = (id: string) => {
    if (devices.length === 0) return null;

    return devices.filter((x) => x._id === id)[0];
  };

  return (
    <UserContext.Provider value={{ devices, setDevices, getSelectDevice }}>
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
