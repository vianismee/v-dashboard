"use client";

import { IUserProfile } from "@/types/profile";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { UserPen } from "lucide-react";
import { Separator } from "./ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";

interface UserProfileProps {
  profile: IUserProfile;
}

const UserProfile: React.FC<UserProfileProps> = ({ profile }) => {
  return (
    <>
      <Card className="w-full">
        <CardHeader className="gap-4">
          <CardTitle className="flex items-center text-2xl gap-5">
            <UserPen height={45} width={45} />
            <Separator
              orientation="vertical"
              className="data-[orientation=vertical]:h-8 data-[orientation=vertical]:w-[3px]"
            />{" "}
            <div>Account Information</div>
          </CardTitle>
          <CardDescription className="text-xl">
            Ini tmpat untuk profile kamu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex">
            <div className="flex-col gap-3 flex">
              <Label htmlFor="nama" className="text-xl">
                Nama
              </Label>
              <Input
                placeholder={profile.nama}
                className="text-xl h-[50px] placeholder:text-xl"
                height={100}
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default UserProfile;
