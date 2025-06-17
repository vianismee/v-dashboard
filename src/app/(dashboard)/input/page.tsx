"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "../../../../supabase/client";

const InputPages = () => {
  const [typeProduct, setTypeProduct] = useState<string[]>([]);

  useEffect(() => {
    const getTypeData = async () => {
      const supabase = await createClient();
      const { data: TypeData, error } = await supabase.rpc("get_enum_values", {
        enum_type: "type_product",
      });
      if (error) throw error;
      const setTypes = TypeData?.map(
        (item: { enumlabel: string }) => item.enumlabel
      );
      setTypeProduct(setTypes || []);
    };
    getTypeData();
  }, []);

  console.log(typeProduct);
  return <div>InputPages</div>;
};

export default InputPages;
