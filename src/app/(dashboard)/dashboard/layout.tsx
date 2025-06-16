import Header from "@/components/Dashboard/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="px-5 py-5">
      <section className="flex flex-1 flex-col gap-4 p-4">
        <Header />
        <div>{children}</div>
      </section>
    </main>
  );
}
