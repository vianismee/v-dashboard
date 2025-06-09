import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Weight } from "lucide-react";

export default function Converter() {
  return (
    <section className="px-5 py-5 flex flex-col gap-5">
      <Card className="w-full flex justify-center">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl gap-5 justify-between">
            <div className="inline-flex gap-3 items-center">
              <Weight height={45} width={45} />
              <Separator
                orientation="vertical"
                className="data-[orientation=vertical]:h-8 data-[orientation=vertical]:w-[3px]"
              />
              <h1>Konversi Berat</h1>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
    </section>
  );
}
