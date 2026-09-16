import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, type User, signOut } from 'firebase/auth';
import { auth, isAdminEmail, logActivity } from './firebase';

export interface AdminUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  authMethod?: 'google' | 'passkey' | 'direct';
}

interface AdminContextType {
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  currentUser: AdminUser | User | null;
  isAdmin: boolean;
  authLoading: boolean;
  handleLogoClick: () => void;
  clickCount: number;
  loginAsAdmin: (email: string, method?: 'google' | 'passkey' | 'direct') => Promise<boolean>;
  logout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AdminUser | User | null>(() => {
    try {
      const saved = localStorage.getItem('moderntech_admin_session');
      if (saved) {
        const parsed = JSON.parse(saved) as AdminUser;
        if (parsed?.email && isAdminEmail(parsed.email)) {
          return parsed;
        }
      }
    } catch {
      // Ignore parse errors
    }
    return null;
  });
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('moderntech_admin_session');
      if (saved) {
        const parsed = JSON.parse(saved) as AdminUser;
        if (parsed?.email && isAdminEmail(parsed.email)) {
          return true;
        }
      }
    } catch {
      // Ignore
    }
    return false;
  });
  const [authLoading, setAuthLoading] = useState(true);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser && firebaseUser.email) {
        const authorized = isAdminEmail(firebaseUser.email);
        setCurrentUser(firebaseUser);
        setIsAdmin(authorized);
        if (authorized) {
          const sessionData: AdminUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || firebaseUser.email.split('@')[0],
            photoURL: firebaseUser.photoURL,
            authMethod: 'google',
          };
          localStorage.setItem('moderntech_admin_session', JSON.stringify(sessionData));
          logActivity('admin_session_active', { email: firebaseUser.email, method: 'google' }).catch(() => {});
        } else {
          localStorage.removeItem('moderntech_admin_session');
        }
      } else {
        // If not signed into Firebase Auth, check if an existing verified admin session exists
        const saved = localStorage.getItem('moderntech_admin_session');
        if (saved) {
          try {
            const parsed = JSON.parse(saved) as AdminUser;
            if (parsed?.email && isAdminEmail(parsed.email)) {
              setCurrentUser(parsed);
              setIsAdmin(true);
            } else {
              setCurrentUser(null);
              setIsAdmin(false);
            }
          } catch {
            setCurrentUser(null);
            setIsAdmin(false);
          }
        } else {
          setCurrentUser(null);
          setIsAdmin(false);
        }
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginAsAdmin = async (email: string, method: 'google' | 'passkey' | 'direct' = 'direct'): Promise<boolean> => {
    const cleanEmail = email.trim().toLowerCase();
    if (!isAdminEmail(cleanEmail)) {
      return false;
    }

    const adminUser: AdminUser = {
      uid: `admin_${cleanEmail.replace(/[^a-zA-Z0-9]/g, '_')}`,
      email: cleanEmail,
      displayName: cleanEmail.split('@')[0],
      authMethod: method,
    };

    localStorage.setItem('moderntech_admin_session', JSON.stringify(adminUser));
    setCurrentUser(adminUser);
    setIsAdmin(true);

    await logActivity('admin_login_success', {
      email: cleanEmail,
      method,
      timestamp: Date.now()
    }).catch(() => {});

    return true;
  };

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
      localStorage.removeItem('moderntech_admin_session');
      await signOut(auth).catch(() => {});
      setCurrentUser(null);
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
        loginAsAdmin,
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
