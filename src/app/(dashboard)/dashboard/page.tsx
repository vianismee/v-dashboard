import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <main className="px-5 py-5">
      <section className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <Card className="aspect-video rounded-2xl">
            <CardHeader>
              <CardTitle>Total Project</CardTitle>
            </CardHeader>
          </Card>
          <Card className="aspect-video rounded-2xl">
            <CardHeader>
              <CardTitle>On Going Project</CardTitle>
            </CardHeader>
          </Card>
          <Card className="aspect-video rounded-2xl">
            <CardHeader>
              <CardTitle>Pending</CardTitle>
            </CardHeader>
          </Card>
        </div>
      </section>
    </main>
  );
}
