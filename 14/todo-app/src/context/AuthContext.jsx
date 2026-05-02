import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const register = (username, email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find(u => u.email === email)) {
      return { success: false, message: '该邮箱已被注册' };
    }
    
    if (users.find(u => u.username === username)) {
      return { success: false, message: '该用户名已被使用' };
    }

    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    const userToStore = { id: newUser.id, username, email };
    setCurrentUser(userToStore);
    localStorage.setItem('currentUser', JSON.stringify(userToStore));
    
    return { success: true, message: '注册成功' };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return { success: false, message: '邮箱或密码错误' };
    }

    const userToStore = { id: user.id, username: user.username, email: user.email };
    setCurrentUser(userToStore);
    localStorage.setItem('currentUser', JSON.stringify(userToStore));
    
    return { success: true, message: '登录成功' };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    currentUser,
    register,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
