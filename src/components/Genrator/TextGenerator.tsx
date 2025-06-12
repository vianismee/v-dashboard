"use client";

import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

import BadanUsaha from "./BadanUsaha";
import Perorangan from "./Perorangan";

const TextGenerator = () => {
  return (
    <main className="w-full flex justify-center items-center">
      <Tabs
        className="w-full flex flex-col justify-center items-center"
        defaultValue="perorangan"
      >
        <TabsList className="py-6 border-1">
          <TabsTrigger
            value="perorangan"
            className="md:text-[15pt] p-5 cursor-pointer"
          >
            Perorangan
          </TabsTrigger>
          <TabsTrigger
            value="badanusaha"
            className="md:text-[15pt] p-5 cursor-pointer"
          >
            Badan Usaha
          </TabsTrigger>
        </TabsList>
        <TabsContent value="perorangan">
          <Perorangan />
        </TabsContent>
        <TabsContent value="badanusaha">
          <BadanUsaha />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default TextGenerator;
