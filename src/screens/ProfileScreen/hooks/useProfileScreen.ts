import { useEffect, useState } from 'react';
import { profileService, UserProfile } from '../services/profileService';

export const useProfileScreen = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await profileService.load();
      setProfile(data);
      setLoading(false);
    })();
  }, []);

  const handleLogout = async () => {
    await profileService.signOut();
  };

  return { profile, loading, handleLogout };
};
