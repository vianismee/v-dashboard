"use client";

import { IUserProfile } from "@/types/profile";
import React, { FormEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { UserPen } from "lucide-react";
import { Separator } from "../ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { createClient } from "../../../supabase/client";
import { Button } from "../ui/button";
import ChangePassword from "./ChangePassword";

interface UserProfileProps {
  profile: IUserProfile;
}

interface UpdateFields {
  nama?: string;
  username?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ profile }) => {
  const handlerUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValue = Object.fromEntries(formData);

    const updateFields: UpdateFields = {};
    if (formValue.nama !== profile.nama) {
      updateFields.nama = formValue.nama as string;
    }
    if (formValue.username !== profile.username) {
      updateFields.username = (formValue.username as string)?.toLowerCase();
    }

    if (Object.keys(updateFields).length === 0) {
      alert("No changes detected!");
      return;
    }

    console.log(updateFields);

    const supabase = await createClient();

    try {
      const { error } = await supabase
        .from("users")
        .update(updateFields)
        .eq("id", profile.id);
      if (error) {
        console.log(error);
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
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
      <form className="flex flex-col gap-5" onSubmit={handlerUpdateProfile}>
        <CardContent className="flex flex-col gap-5">
          <div className="flex-col gap-3 flex">
            <Label htmlFor="email" className="">
              Email
            </Label>
            <Input
              defaultValue={profile.email}
              className="text-xl h-[50px] placeholder:text-xl"
              disabled
              height={100}
            />
          </div>
          <div className="flex-col gap-3 flex">
            <Label htmlFor="nama" className="">
              Nama
            </Label>
            <Input
              placeholder={profile.nama}
              defaultValue={profile.nama}
              className="h-[50px] placeholder:text-xl"
              name="nama"
              height={100}
            />
          </div>
          <div className="flex-col gap-3 flex">
            <Label htmlFor="username" className="">
              Username
            </Label>
            <Input
              placeholder={profile.username}
              defaultValue={profile.username}
              className=" h-[50px]"
              name="username"
              height={100}
            />
          </div>
        </CardContent>
        <CardFooter className="inline-flex items-center gap-4">
          <Button type="submit" variant="outline" className="cursor-pointer">
            Update
          </Button>
        </CardFooter>
      </form>
      <Separator />
      <div className="flex gap-5">
        <CardContent className="flex gap-5">
          <ChangePassword />
        </CardContent>
      </div>
    </Card>
  );
};

export default UserProfile;
