"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { CardTitle } from "@/components/ui/card";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Copy, SquarePlus, Trash } from "lucide-react";
import { Switch } from "../ui/switch";
import { Checkbox } from "../ui/checkbox";

type Product = {
  name: string;
  kemasan: string;
  bahan: string;
};

const empetyProduct: Product = {
  name: "",
  kemasan: "",
  bahan: "",
};

const generatedText = (
  listProduct: Product[],
  isBrand: string,
  isAlamat: string,
  selectedMinimalis: string[]
): string => {
  let header = `*Dear Customer,* \n \nBerikut kami kirimkan artwork desain ${
    selectedMinimalis.length > 0
      ? `*MINIMALIS* ${selectedMinimalis.join(", ")}`
      : ""
  } label merk *${isBrand}* dengan pengajuan Badan Usaha, ${isAlamat} dengan nama produk:\n\n`;
  const productList = listProduct
    .map(
      (product, index) => `*${index + 1}. ${isBrand} ${product.name}* 
    - Kemasan ${product.kemasan}
    - Bahan ${product.bahan}`
    )
    .join("\n\n");
  let end =
    "\n------------------------------------------------------------- \n> _Note: Foto & Video merupakan hasil 3D Mockup bukan hasil asli_";
  console.log(header + productList);
  return header + productList + end;
};

const TextGenerator = () => {
  const [selectedMinimalis, setSelectedMinimalis] = useState<string[]>([]);
  const [isBrand, setIsBrand] = useState<string>("");
  const [isAlamat, setIsAlamat] = useState<string>("");
  const [isMinimalis, setIsMinimalis] = useState<boolean>(false);
  const [listProduk, setListProduk] = useState<Product[]>([
    { ...empetyProduct },
  ]);

  const minimalisOption = ["Konsep 1", "Konsep 2", "Konsep 3", "Konsep 4"];
  const handleAddProduct = () => {
    setListProduk([...listProduk, { ...empetyProduct }]);
  };

  const handleUpdateProduct = (
    index: number,
    field: keyof Product,
    value: string
  ) => {
    const newProduct = [...listProduk];
    newProduct[index] = { ...newProduct[index], [field]: value };
    setListProduk(newProduct);
  };

  const handleRemoveProduct = (index: number) => {
    if (listProduk.length > 1) {
      setListProduk(listProduk.filter((_, i) => i !== index));
    }
  };

  const handleMinimalis = (value: string) => {
    setSelectedMinimalis((prev) => {
      const updated = prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value];
      console.log(updated); // Periksa nilai updated
      return updated;
    });
  };

  return (
    <main className="w-full flex justify-center items-center">
      <Tabs
        className="w-full flex flex-col justify-center items-center"
        defaultValue="badanusaha"
      >
        <TabsList className="py-6 border-1">
          <TabsTrigger value="badanusaha" className="md:text-[15pt] p-5">
            Badan Usaha
          </TabsTrigger>
          <TabsTrigger value="perorangan" className="md:text-[15pt] p-5">
            Perorangan
          </TabsTrigger>
        </TabsList>
        <TabsContent value="badanusaha">
          <Card className="md:min-w-[700px]">
            <CardHeader>
              <CardTitle className="text-[15pt]">BADAN USAHA</CardTitle>
              <CardDescription>
                Text generator untuk Maklon dengan tipe Badan Usaha
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label className="text-[12pt]">Nama Brand / Merek</Label>
                <Input
                  placeholder="example..."
                  className="md:h-10"
                  onChange={(e) => setIsBrand(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-[12pt]">Alamat</Label>
                <Input
                  placeholder="example..."
                  className="md:h-10"
                  onChange={(e) => setIsAlamat(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-4">
                <div className="inline-flex items-centers gap-2">
                  <Switch
                    checked={isMinimalis}
                    onCheckedChange={(checked) => setIsMinimalis(checked)}
                    className="cursor-pointer"
                  />
                  <Label
                    className={`${
                      isMinimalis ? "text-white fon-bold" : "text-white/50"
                    }`}
                  >
                    Minimalis
                  </Label>
                </div>
                {isMinimalis && (
                  <div className="flex w-full justify-around">
                    {minimalisOption.map((minimalis, index) => (
                      <div className="inline-flex gap-3" key={index}>
                        <Checkbox
                          checked={selectedMinimalis.includes(minimalis)}
                          onCheckedChange={() => handleMinimalis(minimalis)}
                          className="cursor-pointer"
                        />
                        <Label>{minimalis}</Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {listProduk.map((product, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-[14pt]">
                      Product {index + 1}
                    </CardTitle>
                  </CardHeader>
                  <Separator />
                  <CardContent className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                      <Label>Nama Produk</Label>
                      <Input
                        value={product.name}
                        onChange={(e) =>
                          handleUpdateProduct(index, "name", e.target.value)
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Kemasan</Label>
                      <Input
                        value={product.kemasan}
                        onChange={(e) =>
                          handleUpdateProduct(index, "kemasan", e.target.value)
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Bahan</Label>
                      <Input
                        value={product.bahan}
                        onChange={(e) =>
                          handleUpdateProduct(index, "bahan", e.target.value)
                        }
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-3">
                    {listProduk.length > 1 && (
                      <Button
                        variant="outline"
                        onClick={() => handleRemoveProduct(index)}
                      >
                        <Trash />
                      </Button>
                    )}
                    <Button
                      onClick={handleAddProduct}
                      className="inline-flex gap-2"
                    >
                      <SquarePlus /> Add Product
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              <Card>
                <CardHeader>
                  <CardTitle>
                    <div className="flex items-center justify-between">
                      <h1>Generate Text</h1>
                      <Copy />
                    </div>
                  </CardTitle>
                </CardHeader>
                <Separator />
                <CardContent>
                  <div className="whitespace-pre-wrap max-w-[500px]">
                    {generatedText(
                      listProduk,
                      isBrand,
                      isAlamat,
                      selectedMinimalis
                    )}
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default TextGenerator;
