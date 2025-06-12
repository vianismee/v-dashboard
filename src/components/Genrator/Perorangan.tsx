import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CheckCircle2, Copy, SquarePlus, Trash } from "lucide-react";
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
  selectedMinimalis: string[]
): string => {
  const header = `*Dear Customer,* \n \nBerikut kami kirimkan artwork desain ${
    selectedMinimalis.length > 0
      ? `*MINIMALIS* ${selectedMinimalis.join(", ")}`
      : ""
  } label merk *${isBrand}* dengan pengajuan Perorangan, dengan nama produk:\n\n`;
  const productList = listProduct
    .map(
      (product, index) => `*${index + 1}. ${isBrand} ${product.name}* 
    - Kemasan ${product.kemasan}
    - Bahan ${product.bahan}`
    )
    .join("\n\n");
  const end =
    "\n------------------------------------------------------------- \n> _Note: Foto & Video merupakan hasil 3D Mockup bukan hasil asli_";
  console.log(header + productList);
  return header + productList + end;
};

export default function Perorangan() {
  const [selectedMinimalis, setSelectedMinimalis] = useState<string[]>([]);
  const [isBrand, setIsBrand] = useState<string>("");
  const [isMinimalis, setIsMinimalis] = useState<boolean>(false);
  const [listProduk, setListProduk] = useState<Product[]>([
    { ...empetyProduct },
  ]);
  const [isCopied, setIsCopied] = useState<boolean>(false);

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

  const handleCopy = async () => {
    const text = generatedText(listProduk, isBrand, selectedMinimalis);
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  return (
    <Card className="md:min-w-[700px]">
      <CardHeader>
        <CardTitle className="text-[15pt]">PERORANGAN</CardTitle>
        <CardDescription>
          Text generator untuk Maklon dengan tipe Perorangan
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
        <div className="flex flex-col gap-4">
          <div className="inline-flex items-centers gap-2">
            <Switch
              checked={isMinimalis}
              onCheckedChange={(checked) => setIsMinimalis(checked)}
              className="cursor-pointer"
            />
            <Label
              className={`${
                isMinimalis
                  ? "dark:text-white fon-bold text-black"
                  : "text-black/50 dark:text-white/50"
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
              <CardTitle className="text-[14pt]">Product {index + 1}</CardTitle>
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
                  className="cursor-pointer"
                  onClick={() => handleRemoveProduct(index)}
                >
                  <Trash />
                </Button>
              )}
              <Button
                onClick={handleAddProduct}
                className="inline-flex gap-2 cursor-pointer"
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

                <Button
                  onClick={handleCopy}
                  variant="outline"
                  className="cursor-pointer"
                >
                  {isCopied ? (
                    <CheckCircle2 className="text-green-500" />
                  ) : (
                    <Copy />
                  )}
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent>
            <div className="whitespace-pre-wrap max-w-[500px]">
              {generatedText(listProduk, isBrand, selectedMinimalis)}
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
