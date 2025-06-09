import { useEffect, useState } from "react";
import { useFetchUser } from "./useFetchUser";
import { createClient } from "../../supabase/client";
import { INote } from "@/types/note";

export const useFetchNotes = () => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Mengatur isLoading
  const { userProfile } = useFetchUser();

  useEffect(() => {
    const fetchNotes = async () => {
      // Pastikan hanya melakukan fetch jika userProfile ada
      if (userProfile && userProfile.length > 0) {
        const user_id = userProfile[0].user_id;
        setIsLoading(true); // Mulai memuat data
        const supabase = await createClient();
        const { data, error: notesError } = await supabase
          .from("note")
          .select("user_id, note_id, title, desc, created_at")
          .eq("user_id", user_id)
          .order("created_at");

        if (notesError) {
          console.log(notesError);
        }

        if (data) {
          setNotes(data as INote[]); // Menyimpan data
        } else {
          setNotes([]); // Jika tidak ada data
        }
        setIsLoading(false); // Setelah selesai fetching data
      } else {
        setIsLoading(false); // Jika userProfile kosong
      }
    };

    fetchNotes();
  }, [userProfile]); // Menjalankan kembali ketika userProfile berubah

  return {
    isLoading, // Mengembalikan status loading
    notes,
  };
};
