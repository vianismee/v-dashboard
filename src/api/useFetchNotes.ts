import { useEffect, useState } from "react";
import { useFetchUser } from "./useFetchUser";
import { createClient } from "../../supabase/client";
import { INote } from "@/types/note";


export const useFetchNotes = () => {
    const [notes, setNotes] = useState<INote[]>([]);
    const { userProfile } = useFetchUser();

  useEffect(() => {
    if (userProfile && userProfile.length > 0) {
      const user_id = userProfile[0].user_id;
      const fetchNotes = async () => {
        const supabase = await createClient();
        const { data, error: notesError } = await supabase
          .from("note")
          .select("user_id, note_id, title, desc, status, created_at")
          .eq("user_id", user_id);
        if (notesError) {
          console.log(notesError);
          return;
        }
        if (data) {
          console.log(data);
          setNotes(data as INote[]);
        } else {
          setNotes([]);
        }
      };
      fetchNotes();
    }
  }, [userProfile]);

  return {
    useFetchNotes, notes
  }
}