import { useState } from "react";
import { createClient } from "../../../supabase/client";
import { Button } from "../ui/button";
import { useFetchUser } from "@/api/useFetchUser";

type IProduct = {
  product_id: number;
  brand_id: number;
  name: string;
  spec: string;
  type: string;
  packaging: string;
  innerbox?: string;
  catatan?: string;
};

type IBrand = {
  brand_id: number;
  job_id: string;
  name: string;
  jenis: string;
  alamat?: string;
  product: IProduct[];
};

type IJob = {
  job_id: number;
  user_id: number;
  user_name: string;
  type: string;
  tracking: string;
  brand: IBrand;
  created_at: string;
  updated_at: string;
};

export default function GetData() {
  const { userProfile } = useFetchUser();
  const [fetchedData, setFetchedData] = useState<IJob[] | null>(null);
  const getFetchData = async () => {
    const supabase = createClient();
    const userId = userProfile?.[0].user_id;
    const { data, error } = await supabase
      .from("job")
      .select(
        `job_id, user_id, user_name, type, tracking, brand(brand_id, name, jenis, product(product_id, name, type, packaging, innerbox, spec, catatan)), created_at, updated_at`
      )
      .eq("user_id", userId);
    if (error) {
      console.log(error);
    }
    console.log(data);
    setFetchedData(data as unknown as IJob[]);
  };
  console.log(fetchedData);
  return (
    <div>
      <Button onClick={getFetchData}>Refresh Data</Button>
      {fetchedData?.map((job) => (
        <div key={job.job_id}>
          <h1>{job.user_name}</h1>
          <h1>{job.brand.name}</h1>
          <ul>
            {job.brand.product.map((product) => (
              <ul key={product.product_id}>
                {product.name}
                <li>{product.spec}</li>
              </ul>
            ))}
          </ul>
        </div>
      ))}
      <pre>
        {/* Mengecek jika data ada, kemudian menampilkan JSON string */}
        {fetchedData
          ? JSON.stringify(fetchedData, null, 2)
          : "No data available."}
      </pre>
    </div>
  );
}
