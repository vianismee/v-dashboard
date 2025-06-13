"use client";

import React, { FormEvent, useState } from "react";
import { IUserProfile } from "../../types/profile";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { createClient } from "../../../supabase/client";

interface AddInfoAppProps {
  user: IUserProfile[];
}

const AddInfoApp: React.FC<AddInfoAppProps> = ({ user }) => {
  const [isDialog, setIsDialog] = useState<boolean>(false);
  const userId = user.length > 0 ? user[0].user_id : null;
  const username = user.length > 0 ? user[0].username : null;

  const handleAddInfo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const infoData = Object.fromEntries(formData);

    if (infoData) {
      infoData.user_id = String(userId);
      infoData.username = String(username);
    }

    const supabase = await createClient();
    try {
      const { error } = await supabase.from("information").insert(infoData);
      if (error) {
        console.log(error);
        return;
      }
      setIsDialog(false);
      window.location.reload();
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <Dialog open={isDialog} onOpenChange={setIsDialog}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Add Info</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Tulis Informasi</DialogTitle>
        <Separator />
        <form className="gap-5 flex flex-col" onSubmit={handleAddInfo}>
          <div className="flex flex-col gap-3">
            <Label htmlFor="title">Title</Label>
            <Input id="desc" name="title" placeholder="example ..." />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="desc">Informasi</Label>
            <Textarea
              id="desc"
              name="desc"
              placeholder="Informasi ...."
              required
              className="h-72"
            />
          </div>
          <DialogFooter>
            <Button type="submit">Add Info</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddInfoApp;
