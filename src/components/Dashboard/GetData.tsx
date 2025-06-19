import { useState } from "react";
import { createClient } from "../../../supabase/client";
import { Button } from "../ui/button";

export default function GetData() {
  const [fetchedData, setFetchedData] = useState(null);
  const getFetchData = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("job")
      .select(
        `job_id, user_name, type, tracking, brand(brand_id, name, jenis, product(name, type))`
      );
    if (error) {
      console.log(error);
    }
    console.log(data);
    setFetchedData(data);
  };
  return (
    <div>
      <Button onClick={getFetchData}>Refresh Data</Button>
      <pre>
        {/* Mengecek jika data ada, kemudian menampilkan JSON string */}
        {fetchedData
          ? JSON.stringify(fetchedData, null, 2)
          : "No data available."}
      </pre>
    </div>
  );
}
