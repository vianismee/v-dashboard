"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { NotebookPen } from "lucide-react";
import { useFetchNotes } from "@/api/useFetchNotes";
import NoteApp from "@/components/note";

export default function NotePage() {
  const { notes } = useFetchNotes();
  return (
    <section className="px-5 py-5 flex flex-col gap-5">
      <Card className="w-full flex justify-center">
        <CardHeader className="gap-4">
          <CardTitle className="flex items-center text-2xl gap-5">
            <NotebookPen height={45} width={45} />
            <Separator
              orientation="vertical"
              className="data-[orientation=vertical]:h-8 data-[orientation=vertical]:w-[3px]"
            />
            <h1>Notes</h1>
          </CardTitle>
        </CardHeader>
      </Card>
      <div className="w-full">
        {notes && notes.length > 0 ? (
          <NoteApp userNote={notes} />
        ) : (
          <p>Select a profile to display details.</p>
        )}
      </div>
    </section>
  );
}
