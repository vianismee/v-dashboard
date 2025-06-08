"use client";

import React, { FormEvent, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { SquarePen } from "lucide-react";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { createClient } from "../../supabase/client";
import { IUserProfile } from "@/types/profile";
import { useRouter } from "next/navigation";

interface AddNoteProps {
  user: IUserProfile[]; // array of user profiles
}

const AddNote: React.FC<AddNoteProps> = ({ user }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const userId = user.length > 0 ? user[0].user_id : null; // Menadpatkan data userId dari fetchUser
  const router = useRouter();

  const handleAddNote = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // Add the user_id to the form data before inserting it into Supabase
    const noteData = Object.fromEntries(formData);
    if (userId) {
      noteData.user_id = String(userId); // Add user_id to the note data
    }

    const supabase = await createClient();

    try {
      // Insert data and get the response
      const { error } = await supabase.from("note").insert(noteData).select();

      if (error) {
        console.log(error);
        return;
      }
      setDialogOpen(false);
      router.push("/note");
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button className="inline-flex items-center cursor-pointer">
            <SquarePen />
            Add Note
          </Button>
        </DialogTrigger>
        <DialogContent>
          <form className="w-full" onSubmit={handleAddNote}>
            <DialogTitle asChild>
              <h1 className="inline-flex items-center gap-2">
                <SquarePen />
                <Separator
                  orientation="vertical"
                  className="data-[orientation=vertical]:h-6 data-[orientation=vertical]:w-[3px]"
                />
                TULIS NOTE
              </h1>
            </DialogTitle>
            <Separator />
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="title">Tittle</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Judul Note"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="desc">Your Note</Label>
                <Textarea
                  id="desc"
                  name="desc"
                  placeholder="Note Kamu ..."
                  required
                  className="h-72"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Add Note</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNote;
