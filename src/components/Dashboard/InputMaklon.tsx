import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
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
import { IBrand, IJob, IProduct } from "@/types/job";
import { Button } from "../ui/button";
import { PlusSquare, Trash } from "lucide-react";
import { useFetchUser } from "@/api/useFetchUser";
import { createClient } from "../../../supabase/client";
import { toast } from "sonner";

const empetyJob: IJob = {
  type: "Design Baru",
  tracking: "Brief",
};

const empetyBrand: IBrand = {
  name: "",
  jenis: "Perorangan",
  alamat: "",
};

const empetyProduct: IProduct = {
  name: "",
  type: "",
  packaging: "",
  innerbox: "",
  spec: "",
  catatan: "",
};

export default function InputMaklonApp() {
  const typeBrand = ["Badan Usaha", "Perorangan"];
  const typeProduct = ["Minimalis", "Reguler", "Putus"];
  const typeInnerbox = ["Full Design", "Sticker"];
  const typeJob = ["Design Baru", "Rebranding"];

  const [isTypeBrand, setIsTypeBrand] = useState("Perorangan");
  const [alamat, setAlamat] = useState<boolean>(false);
  const [isJob, setIsJob] = useState<IJob>({ ...empetyJob });
  const [barndList, setBrandList] = useState<IBrand>({ ...empetyBrand });
  const [productList, setProductList] = useState<IProduct[]>([
    { ...empetyProduct },
  ]);

  const { userProfile } = useFetchUser();

  useEffect(() => {
    setAlamat(isTypeBrand === "Badan Usaha");
  }, [isTypeBrand]);

  const handleJob = (field: keyof IJob, value: string) => {
    setIsJob((prev) => ({ ...prev, [field]: value }));
  };

  const handleBrandList = (field: keyof IBrand, value: string) => {
    setBrandList((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddProduct = () => {
    setProductList([...productList, { ...empetyProduct }]);
  };

  const handleUpdateProduct = (
    index: number,
    field: keyof IProduct,
    value: string
  ) => {
    const newProduct = [...productList];
    newProduct[index] = { ...newProduct[index], [field]: value };
    setProductList(newProduct);
  };

  const handleRemoveProduct = (index: number) => {
    if (productList.length > 1) {
      setProductList(productList.filter((_, i) => i !== index));
    }
  };

  const handleSumbitProduct = async () => {
    const supabase = createClient();
    const userId = userProfile?.[0].user_id;

    const { data: jobData, error: jobError } = await supabase
      .from("job")
      .insert([{ ...isJob, user_id: userId }])
      .select("job_id");
    if (jobError) {
      console.error("Error inserting job:", jobError);
      alert(`Gagal menyimpan data permintaan: ${jobError.message}`);
      return;
    }

    const jobId = jobData?.[0]?.job_id;
    if (!jobId) {
      console.error(
        "No job ID returned after insertion. Inserted data:",
        jobData
      );
      alert(
        "Gagal mendapatkan ID permintaan. Tidak dapat menyimpan brand/produk."
      );
      return;
    }
    console.log("Job inserted successfully. Job ID:", jobId);
    const { data: insertedBrand, error: brandError } = await supabase
      .from("brand")
      .insert([{ ...barndList, job_id: jobId }])
      .select("*");

    if (brandError) {
      toast(`Gagal menambah produk`, {
        description: `Error saat menambah brand  ${brandError?.message}`,
        position: "top-center",
        duration: 6000,
      });

      return;
    }

    const brandId = insertedBrand?.[0]?.brand_id;

    if (!brandId) {
      toast("Gagal mendapatkan ID Brand", {
        description: `Gagal mendapatkan ID brand. Tidak dapat menyimpan produk.  `,
        position: "top-center",
        duration: 6000,
      });
      return;
    }
    console.log("Brand inserted successfully with ID:", brandId);

    // 2. Tambahkan brand_id ke setiap produk dalam productList
    const productsToInsert = productList.map((product) => ({
      ...product,
      brand_id: brandId,
    }));

    const { error: productError } = await supabase
      .from("product")
      .insert(productsToInsert);
    if (productError) {
      toast(`Gagal menambah produk`, {
        description: `Error saat menambah produk  ${productError?.message}`,
        position: "top-center",
        duration: 6000,
      });
    } else {
      toast(`Brand ${barndList.name} suksess di input dengan ID${jobId}`, {
        description: `Brand ${barndList.name} tipe ${barndList.jenis} telah di input, berisi ${productList.length} produk`,
        position: "top-right",
        duration: 6000,
      });
      setProductList([{ ...empetyProduct }]);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      handleAddProduct();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
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
              <h1 className="text-2xl font-bold">PERMINTAAN BARU</h1>
              <div className="flex flex-col gap-2">
                <Label>Jenis Permintaan</Label>
                <Select
                  onValueChange={(value) => {
                    setIsTypeBrand(value);
                    handleJob("type", value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Type Brand</SelectLabel>
                      {typeJob.map((type, index) => (
                        <SelectItem key={index} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-5 w-full">
                <div className="flex flex-col gap-2">
                  <Label>Nama Brand</Label>
                  <Input
                    placeholder="example"
                    onChange={(e) => handleBrandList("name", e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Type Brand</Label>
                  <Select
                    onValueChange={(value) => {
                      setIsTypeBrand(value);
                      handleBrandList("jenis", value);
                    }}
                  >
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
                  <Textarea
                    placeholder="Jl. Example Lorem (Optional)"
                    onChange={(e) => handleBrandList("alamat", e.target.value)}
                  />
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
                    <Input
                      onChange={(e) =>
                        handleUpdateProduct(index, "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Type Product</Label>
                    <Select
                      onValueChange={(value) =>
                        handleUpdateProduct(index, "type", value)
                      }
                    >
                      <SelectTrigger className="md:w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Type Product</SelectLabel>
                          {typeProduct.map((type, i) => (
                            <SelectItem key={i} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Kemasan</Label>
                    <Input
                      onChange={(e) =>
                        handleUpdateProduct(index, "packaging", e.target.value)
                      }
                    />
                  </div>
                  <Label>Innerbox</Label>
                  <div className="inline-flex gap-4 items-center">
                    <Select
                      onValueChange={(value) =>
                        handleUpdateProduct(index, "innerbox", value)
                      }
                    >
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
                    <Input
                      onChange={(e) =>
                        handleUpdateProduct(index, "spec", e.target.value)
                      }
                    />
                  </div>
                  <div className=" space-x-3">
                    {productList.length > 1 && (
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleRemoveProduct(index)}
                        className="cursor-pointer"
                      >
                        <Trash />
                      </Button>
                    )}
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
        <CardFooter>
          <Button onClick={handleSumbitProduct}>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
