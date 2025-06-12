'use client'

import { useEffect, useState } from 'react'
import { createClient } from '../../supabase/client';
import { IUserProfile } from '@/types/profile';


export const useFetchUser = () => {
    const [userId, setUserId] = useState<string>();
  const [userProfile, setUserProfile] = useState<IUserProfile[]>([]);

  useEffect(() => {
    const getUserId = async () => {
      const supabase = await createClient();
      const { data } = await supabase.auth.getUser();
      setUserId(data.user?.id);
    };
    getUserId();
  }, []);

  useEffect(() => {
    const getUserProfile = async () => {
      if (!userId) return;

      const supabase = await createClient();
      const { data, error } = await supabase
        .from("users")
        .select("user_id, nama, email, role, username, id")
        .eq("id", userId);

      if (error) {
        console.error("Error fetching user profile:", error);
        setUserProfile([]);
        return;
      }
      if (data) {
        setUserProfile(data as IUserProfile[]);
      } else {
        setUserProfile([]);
      }
    };

    getUserProfile();
  }, [userId]);
  return {
    userId,
    userProfile
  }
}