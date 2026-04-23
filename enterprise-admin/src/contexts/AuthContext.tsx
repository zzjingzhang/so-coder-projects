import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types';
import { mockUsers, mockRoles } from '../mock';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  permissions: string[];
  menuPermissions: string[];
  buttonPermissions: string[];
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  hasMenuPermission: (menu: string) => boolean;
  hasButtonPermission: (button: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [menuPermissions, setMenuPermissions] = useState<string[]>([]);
  const [buttonPermissions, setButtonPermissions] = useState<string[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser) as User;
      setUser(parsedUser);
      const role = mockRoles.find(r => r.id === parsedUser.roleId);
      if (role) {
        setPermissions(role.permissions);
        setMenuPermissions(role.menuPermissions);
        setButtonPermissions(role.buttonPermissions);
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (username === 'admin' && password === 'admin123') {
      const foundUser = mockUsers[0];
      const role = mockRoles.find(r => r.code === 'admin');
      if (role) {
        const adminUser: User = {
          ...foundUser,
          id: '1',
          username: 'admin',
          role: role.name,
          roleId: role.id,
        };
        setUser(adminUser);
        setPermissions(role.permissions);
        setMenuPermissions(role.menuPermissions);
        setButtonPermissions(role.buttonPermissions);
        localStorage.setItem('user', JSON.stringify(adminUser));
        return true;
      }
    }

    const foundUser = mockUsers.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (foundUser && password === '123456') {
      const role = mockRoles.find(r => r.id === foundUser.roleId);
      setUser(foundUser);
      if (role) {
        setPermissions(role.permissions);
        setMenuPermissions(role.menuPermissions);
        setButtonPermissions(role.buttonPermissions);
      }
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    setPermissions([]);
    setMenuPermissions([]);
    setButtonPermissions([]);
    localStorage.removeItem('user');
  };

  const hasPermission = (permission: string): boolean => {
    if (permissions.includes('*')) return true;
    return permissions.includes(permission);
  };

  const hasMenuPermission = (menu: string): boolean => {
    if (menuPermissions.includes('*')) return true;
    return menuPermissions.includes(menu);
  };

  const hasButtonPermission = (button: string): boolean => {
    if (buttonPermissions.includes('*')) return true;
    return buttonPermissions.includes(button);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        permissions,
        menuPermissions,
        buttonPermissions,
        login,
        logout,
        hasPermission,
        hasMenuPermission,
        hasButtonPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
