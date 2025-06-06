import { Separator } from "./separator";
import { SidebarTrigger } from "./sidebar";

export default function hello() {
  return (
    <div className="flex items-center gap-2 px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />
      Hallo, chevianbs@gmail.com
    </div>
  );
}
