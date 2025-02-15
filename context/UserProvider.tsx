'use client';

import React, { createContext, ReactNode, useContext, useState } from 'react';

interface UserContextType {
  devices: RedisDevice[];
  setDevices: (devices: RedisDevice[]) => void;
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

  return (
    <UserContext.Provider value={{ devices, setDevices }}>
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
