import React from "react";
import { INote } from "../types/note";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import AddNote from "./add-note";

interface NoteAppProps {
  userNote: INote[];
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const NoteApp: React.FC<NoteAppProps> = ({ userNote }) => {
  return (
    <main className="w-full auto-rows-min grid md:grid-cols-[repeat(3,1fr)] gap-2">
      {userNote.map((note) => (
        <Sheet key={note.note_id}>
          <SheetTrigger asChild>
            <Card className="aspect-square rounded-2xl border-2 border-card-muted cursor-pointer">
              <CardHeader>
                <CardTitle className="text-xl">{note.title}</CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="min-h-[60%]">
                <p className="whitespace-pre-line line-clamp-10">{note.desc}</p>
              </CardContent>
              <Separator />
              <CardFooter className="flex">
                <h1>{formatDate(note.created_at)}</h1>
              </CardFooter>
            </Card>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="flex items-center justify-center">
              <SheetTitle className="text-2xl">{note.title}</SheetTitle>
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
          </SheetContent>
        </Sheet>
      ))}
    </main>
  );
};

export default NoteApp;
