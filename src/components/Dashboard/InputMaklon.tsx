import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { IProduct } from "@/types/job";
import { Button } from "../ui/button";
import { PlusSquare, Trash } from "lucide-react";
import { useFetchUser } from "@/api/useFetchUser";

const empetyProduct: IProduct = {
  name: "",
  type: "",
  size: 0,
  packaging: "",
  innerbox: "",
  spec: "",
  catatan: "",
};

export default function InputMaklonApp() {
  const typeBrand = ["Badan Usaha", "Perorangan"];
  const typeProduct = ["Minimalis", "Reguler", "Putus"];
  const typeInnerbox = ["Full Design", "Sticker"];

  const [isUserId, setIsUserId] = useState<number[]>([]);
  const [isTypeBrand, setIsTypeBrand] = useState("Perorangan");
  const [alamat, setAlamat] = useState<boolean>(false);
  const [productList, setProductList] = useState<IProduct[]>([
    { ...empetyProduct },
  ]);

  console.log(productList);

  const { userProfile } = useFetchUser();

  useEffect(() => {
    setAlamat(isTypeBrand === "Badan Usaha");
  }, [isTypeBrand]);

  useEffect(() => {
    const UserID = userProfile.map((user) => user.user_id);
    setIsUserId(UserID);
  }, [userProfile]);

  const handleAddProduct = () => {
    setProductList([...productList, { ...empetyProduct }]);
  };

  const handleRemoveProduct = (index: number) => {
    if (productList.length > 1) {
      setProductList(productList.filter((_, i) => i !== index));
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    // Memeriksa jika 'Ctrl' (atau 'Meta' untuk Mac) dan 'Enter' ditekan
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault(); // Mencegah perilaku default (misalnya, membuat baris baru di textarea)
      handleAddProduct(); // Panggil fungsi untuk menambahkan produk
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    // Fungsi cleanup: hapus event listener saat komponen di-unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div className="w-full flex justify-center">
      <Card className="md:max-w-[1000px]">
        <CardContent>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl font-bold">Brand</h1>
              <div className="flex gap-5 w-full">
                <div className="flex flex-col gap-2">
                  <Label>Nama Brand</Label>
                  <Input placeholder="example" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Type Brand</Label>
                  <Select onValueChange={(value) => setIsTypeBrand(value)}>
                    <SelectTrigger className="md:w-[200px]">
                      <SelectValue placeholder={isTypeBrand} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Type Brand</SelectLabel>
                        {typeBrand.map((type, index) => (
                          <SelectItem key={index} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {alamat && (
                <div className="flex flex-col gap-2">
                  <Label>Alamat</Label>
                  <Textarea placeholder="Jl. Example Lorem (Optional)" />
                </div>
              )}
            </div>
            <Separator />
            <div>List Product</div>
            {productList.map((product, index) => (
              <Card key={index}>
                <CardContent className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <Label>Nama Produk</Label>
                    <Input />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Type Product</Label>
                    <Select>
                      <SelectTrigger className="md:w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Type Product</SelectLabel>
                          {typeProduct.map((type, index) => (
                            <SelectItem key={index} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Kemasan</Label>
                    <Input />
                  </div>
                  <Label>Innerbox</Label>
                  <div className="inline-flex gap-4 items-center">
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="None" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Type Brand</SelectLabel>
                          {typeInnerbox.map((type, index) => (
                            <SelectItem key={index} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Bahan</Label>
                    <Input />
                  </div>
                  <div className=" space-x-3">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleRemoveProduct(index)}
                      className="cursor-pointer"
                    >
                      <Trash />
                    </Button>
                    <Button
                      size="icon"
                      onClick={handleAddProduct}
                      className="cursor-pointer"
                    >
                      <PlusSquare />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
