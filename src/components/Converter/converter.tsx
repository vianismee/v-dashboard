"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import convert from "convert-units";

export function ConverterApp() {
  const [solidValue, setSolidValue] = useState<number>(10);
  const [solidConvert, setSolidConvert] = useState(
    parseFloat(convert(solidValue).from("g").to("oz").toFixed(2)) || 0
  );
  const [liquidValue, setLiquidValue] = useState<number>(100);
  const [liquidConvert, setLiquidConvert] = useState(
    parseFloat(convert(liquidValue).from("ml").to("fl-oz").toFixed(2)) || 0
  );

  const handleSolidConvert = (solid: number) => {
    const solidResult = parseFloat(
      convert(solid).from("g").to("oz").toFixed(2)
    );
    setSolidConvert(isNaN(solidResult) ? 0 : solidResult);
  };

  const handleLiquidConvert = (liquid: number) => {
    const liquidResult = parseFloat(
      convert(liquid).from("ml").to("fl-oz").toFixed(2)
    );
    setLiquidConvert(isNaN(liquidResult) ? 0 : liquidResult);
  };

  return (
    <main className="w-full h-full">
      <Tabs defaultValue="solid">
        <TabsList className="border-1">
          <TabsTrigger value="solid" className="cursor-pointer">
            gram to oz
          </TabsTrigger>
          <TabsTrigger value="liquid" className="cursor-pointer">
            ml to fl oz
          </TabsTrigger>
        </TabsList>
        <TabsContent value="solid">
          <Card className="md:min-w-xl">
            <CardHeader>
              <CardTitle>Konversi Massa Padat</CardTitle>
              <CardDescription>
                Konversi massa padat dari gram ke oz
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <Label>Gram</Label>
                <Input
                  type="number"
                  value={solidValue}
                  onChange={(e) => {
                    const newSolid = parseFloat(e.target.value);
                    setSolidValue(newSolid);
                    handleSolidConvert(newSolid);
                  }}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label>Oz</Label>
                <Input type="number" value={solidConvert} readOnly />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="liquid">
          <Card className="md:min-w-xl">
            <CardHeader>
              <CardTitle>Konversi Massa Cair</CardTitle>
              <CardDescription>
                Konversi massa cair dari ml ke fl oz
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <Label>mL</Label>
                <Input
                  type="number"
                  value={liquidValue}
                  onChange={(e) => {
                    const newLiquid = parseFloat(e.target.value);
                    setLiquidValue(newLiquid);
                    handleLiquidConvert(newLiquid);
                  }}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label>Fl-Oz</Label>
                <Input type="number" value={liquidConvert} readOnly />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
