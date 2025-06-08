import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="px-5 py-5">
      <section className="w-full h-screen flex justify-center items-center">
        <Link href={"/dashboard"}>
          <Button>Dashboard</Button>
        </Link>
        <div></div>
      </section>
    </main>
  );
}
