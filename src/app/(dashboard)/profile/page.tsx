import { createClient } from "../../../../supabase/server";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profile")
    .select("*")
    .match({ uuid: data.user?.id })
    .single();

  return (
    <main className="px-5 py-5">
      <div></div>
    </main>
  );
}
