"use client";

import InputMaklonApp from "@/components/Dashboard/InputMaklon";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const InputPages = () => {
  return (
    <main className="w-full flex flex-col gap-5">
      <section className="inline-flex gap-3 items-center">
        <Link href="/dashboard">
          <Button variant="outline" size="icon">
            <ChevronLeft />
          </Button>
        </Link>
        <h1 className="font-bold">Input Permintaan</h1>
      </section>
      <InputMaklonApp />
    </main>
  );
};

export default InputPages;
