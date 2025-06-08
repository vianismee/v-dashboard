"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { NotebookPen } from "lucide-react";
import NoteApp from "@/components/note";
import AddNote from "@/components/add-note";
import { useFetchUser } from "@/api/useFetchUser";
import { useFetchNotes } from "@/api/useFetchNotes";

export default function NotePage() {
  const { notes } = useFetchNotes();
  const { userProfile } = useFetchUser();
  return (
    <section className="px-5 py-5 flex flex-col gap-5 h-min">
      <Card className="w-full flex justify-center">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl gap-5 justify-between">
            <div className="inline-flex gap-3 items-center">
              <NotebookPen height={45} width={45} />
              <Separator
                orientation="vertical"
                className="data-[orientation=vertical]:h-8 data-[orientation=vertical]:w-[3px]"
              />
              <h1>Notes</h1>
            </div>
            <AddNote user={userProfile} />
          </CardTitle>
        </CardHeader>
      </Card>
      <div className="w-full h-full">
        {notes && notes.length > 0 ? (
          <NoteApp userNote={notes} />
        ) : (
          <p>Select a profile to display details.</p>
        )}
      </div>
    </section>
  );
}
