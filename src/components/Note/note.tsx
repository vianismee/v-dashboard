import React, { useState } from "react";
import { INote } from "../../types/note"; // Impor konfigurasi Supabase
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { createClient } from "../../../supabase/client";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import formatDate from "@/lib/date";

interface NoteAppProps {
  userNote: INote[];
  setUserNote: React.Dispatch<React.SetStateAction<INote[]>>; // Untuk memperbarui daftar catatan setelah penghapusan
}

const sortNotes = (notes: INote[]) => {
  return notes.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
};

const handleDelete = async (
  note_id: number,
  setUserNote: React.Dispatch<React.SetStateAction<INote[]>>
) => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("note") // Ganti dengan nama tabel yang sesuai
    .delete()
    .eq("note_id", note_id); // Filter berdasarkan id catatan

  if (error) {
    console.error("Error deleting note:", error.message);
  } else {
    setUserNote((prevNotes) =>
      prevNotes.filter((note) => note.note_id !== note_id)
    );
    window.location.reload();
  }
};

const handleUpdate = async (
  note_id: number,
  title: string,
  desc: string,
  setUserNote: React.Dispatch<React.SetStateAction<INote[]>>
) => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("note")
    .update({ title, desc }) // Update title dan desc
    .eq("note_id", note_id); // Filter berdasarkan id catatan

  if (error) {
    console.error("Error updating note:", error.message);
  } else {
    setUserNote((prevNotes) =>
      prevNotes.map((note) =>
        note.note_id === note_id ? { ...note, title, desc } : note
      )
    );
    window.location.reload(); // Reload setelah update sukses
  }
};

const NoteApp: React.FC<NoteAppProps> = ({ userNote, setUserNote }) => {
  const [editableNote, setEditableNote] = useState<INote | null>(null); // Menyimpan note yang sedang diedit
  const [updatedTitle, setUpdatedTitle] = useState<string>(""); // State untuk title yang diedit
  const [updatedDesc, setUpdatedDesc] = useState<string>(""); // State untuk desc yang diedit

  const sortedNotes = sortNotes(userNote);

  const handleEditClick = (note: INote) => {
    setEditableNote(note);
    setUpdatedTitle(note.title);
    setUpdatedDesc(note.desc);
  };

  const handleFormSubmit = (e: React.FormEvent, note_id: number) => {
    e.preventDefault(); // Mencegah reload halaman

    // Panggil handleUpdate untuk menyimpan perubahan
    handleUpdate(note_id, updatedTitle, updatedDesc, setUserNote);
  };

  console.log(editableNote);
  return (
    <main className="w-full grid-rows-[1fr] auto-rows-[1fr] grid md:grid-cols-[repeat(3,1fr)] gap-2">
      {sortedNotes.map((note) => (
        <Sheet key={note.note_id}>
          <SheetTrigger asChild>
            <Card className=" rounded-2xl border-2 border-card-muted cursor-pointer hover:border-card-foreground hover:shadow-lg transition-all duration-300 ease-in-out">
              <CardHeader>
                <CardTitle className="text-xl">{note.title}</CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="md:h-[200px]">
                <p className="whitespace-pre-line line-clamp-10">{note.desc}</p>
              </CardContent>
              <Separator />
              <CardFooter className="flex items-center">
                <div className="w-full flex justify-between items-center">
                  <h1>{formatDate(note.created_at)}</h1>
                </div>
              </CardFooter>
            </Card>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="flex items-center justify-center">
              <SheetTitle className="text-2xl">{note.title}</SheetTitle>
              <SheetDescription>{formatDate(note.created_at)}</SheetDescription>
            </SheetHeader>
            <Separator />
            <div className="p-5 h-[80%]">
              <Card className="h-[100%] overflow-scroll">
                <CardContent>
                  <p className="whitespace-pre-line">{note.desc}</p>
                </CardContent>
              </Card>
            </div>
            <Separator />
            <SheetFooter>
              {/* Edit Button */}
              <Dialog>
                <DialogTrigger asChild className="cursor-pointer">
                  <Button onClick={() => handleEditClick(note)}>Edit</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Note</DialogTitle>
                  </DialogHeader>
                  <form
                    className="w-full gap-5 flex flex-col"
                    onSubmit={(e) => handleFormSubmit(e, note.note_id)} // Menangani form submit
                  >
                    <div className="grid gap-4">
                      <div className="grid gap-3">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          name="title"
                          value={updatedTitle} // Controlled input with updatedTitle
                          onChange={(e) => setUpdatedTitle(e.target.value)}
                          required
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="desc">Your Note</Label>
                        <Textarea
                          id="desc"
                          name="desc"
                          value={updatedDesc} // Controlled input with updatedDesc
                          onChange={(e) => setUpdatedDesc(e.target.value)}
                          required
                          className="h-72"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline" className="cursor-pointer">
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button type="submit" className="cursor-pointer">
                        Save Changes
                      </Button>{" "}
                      {/* Tombol submit */}
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              {/* Delete Button */}
              <Dialog>
                <DialogTrigger asChild className="cursor-pointer">
                  <Button variant="outline">Delete</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Note?</DialogTitle>
                  </DialogHeader>
                  <Button
                    className="cursor-pointer"
                    onClick={() => handleDelete(note.note_id, setUserNote)} // Menambahkan aksi delete
                  >
                    Yes, Delete
                  </Button>
                </DialogContent>
              </Dialog>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </main>
  );
};

export default NoteApp;
