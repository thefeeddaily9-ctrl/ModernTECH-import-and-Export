import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, type User, signOut } from 'firebase/auth';
import { auth, isAdminEmail, logActivity } from './firebase';

interface AdminContextType {
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  currentUser: User | null;
  isAdmin: boolean;
  authLoading: boolean;
  handleLogoClick: () => void;
  clickCount: number;
  logout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user && user.email) {
        const authorized = isAdminEmail(user.email);
        setIsAdmin(authorized);
        if (authorized) {
          logActivity('admin_session_active', { email: user.email }).catch(() => {});
        }
      } else {
        setIsAdmin(false);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogoClick = () => {
    const now = Date.now();
    // If click happened within 3.5 seconds of previous click, increment counter
    if (now - lastClickTime < 3500) {
      const nextCount = clickCount + 1;
      setClickCount(nextCount);
      if (nextCount >= 5) {
        setIsAdminModalOpen(true);
        setClickCount(0);
      }
    } else {
      setClickCount(1);
    }
    setLastClickTime(now);
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setIsAdmin(false);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminModalOpen,
        setIsAdminModalOpen,
        currentUser,
        isAdmin,
        authLoading,
        handleLogoClick,
        clickCount,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
