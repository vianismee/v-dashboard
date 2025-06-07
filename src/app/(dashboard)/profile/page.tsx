"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../../../supabase/client";

export default function ProfilePage() {
  const [userId, setUserId] = useState<string>();
  useEffect(() => {
    const getUserId = async () => {
      const supabase = await createClient();
      const { data } = await supabase.auth.getUser();
      setUserId(data.user?.id);
    };
    getUserId();
  });
  return (
    <main className="px-5 py-5">
      <div>
        <pre>{JSON.stringify(userId)}</pre>
      </div>
    </main>
  );
}
