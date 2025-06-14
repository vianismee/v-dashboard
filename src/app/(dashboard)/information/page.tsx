"use client";

import { useFetchInfo } from "@/api/useFetchInformation";
import InformationApp from "@/components/Informasi/InformasiApp";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Bell } from "lucide-react";
import { useFetchUser } from "@/api/useFetchUser";
import { useEffect, useState } from "react";
import AddInfoApp from "@/components/Informasi/add-info";
import { Button } from "@/components/ui/button";

export default function InformationPage() {
  const [isUser, setIsUser] = useState<number[]>([]);
  const { isInfoData } = useFetchInfo();
  const { userProfile } = useFetchUser();

  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    const UserId = userProfile.map((user) => user.user_id);
    setIsUser(UserId);
  }, [userProfile]);

  return (
    <section className="px-5 py-5 flex flex-col gap-5">
      <Card className="w-full flex justify-center">
        <CardHeader>
          <CardTitle className="flex-cols md:flex items-center text-2xl gap-5 justify-between">
            <div className="inline-flex gap-3 items-center">
              <Bell height={45} width={45} />
              <Separator
                orientation="vertical"
                className="data-[orientation=vertical]:h-8 data-[orientation=vertical]:w-[3px]"
              />
              <h1>Notes</h1>
            </div>
            <div className="inline-flex gap-3">
              <AddInfoApp user={userProfile} />
              <Button onClick={handleRefresh}>Refresh</Button>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
      <InformationApp
        Information={isInfoData}
        setUserInfo={() => {}}
        userId={isUser}
      />
    </section>
  );
}
