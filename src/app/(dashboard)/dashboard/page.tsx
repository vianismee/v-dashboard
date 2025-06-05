export default function Page() {
  return (
    <main className="px-5 py-5">
      <section className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-card aspect-video rounded-2xl">Hello World</div>
          <div className="bg-card aspect-video rounded-2xl">Hello World</div>
          <div className="bg-card aspect-video rounded-2xl">Hello World</div>
        </div>
      </section>
    </main>
  );
}
