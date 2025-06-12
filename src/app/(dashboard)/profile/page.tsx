// page.tsx
"use client";
import { useFetchUser } from "@/api/useFetchUser";
import UserProfile from "@/components/Profile/profile";

export default function ProfilePage() {
  const { userProfile } = useFetchUser(); // userProfile is IUserProfile[]

  return (
    <main className="px-5 py-5">
      <div className="w-full h-full">
        {userProfile && userProfile.length > 0 ? (
          <UserProfile profile={userProfile[0]} />
        ) : (
          <p>Select a profile to display details.</p>
        )}
      </div>
    </main>
  );
}
