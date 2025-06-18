import { useEffect, useState } from 'react';
import { User, getCurrentUser } from '../lib/mockData';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un délai de chargement
    setTimeout(() => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    }, 1000);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Simuler une connexion réussie
    setUser(getCurrentUser());
    return true;
  };

  const signOut = async () => {
    setUser(null);
  };

  return {
    user,
    loading,
    signIn,
    signOut,
  };
} 