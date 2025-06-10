import { IInfo } from "@/types/information";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import formatDate from "@/lib/date";

interface InformationAppProps {
  Information: IInfo[];
}

const InformationApp: React.FC<InformationAppProps> = ({ Information }) => {
  return (
    <main className="w-full grid-rows-[1fr] auto-rows-[1fr] grid md:grid-cols-[repeat(3,1fr)] gap-2">
      {Information.map((info) => (
        <Sheet key={info.id}>
          <SheetTrigger asChild className="cursor-pointer">
            <Card>
              <CardHeader className="gap-2">
                <CardTitle className="text-2xl">{info.title}</CardTitle>
                <Separator
                  orientation="horizontal"
                  className="data-[orientation=horizontal]:h-[2px] data-[orientation=horizontal]:w-full"
                />
                <div className="inline-flex gap-3 items-center w-full">
                  <h1 className="text-foreground/50">{info.username}</h1>
                  <Separator
                    orientation="vertical"
                    className="data-[orientation=vertical]:h-[20px] data-[orientation=vertical]:w-[2px]"
                  />
                  <h1 className="text-foreground/50">
                    {formatDate(info.created_at)}
                  </h1>
                </div>
              </CardHeader>
              <Separator />
              <CardContent>
                <div className="md:min-h-[200px] max-h-[200px] whitespace-pre-line line-clamp-10">
                  {info.desc}
                </div>
              </CardContent>
            </Card>
          </SheetTrigger>
          <SheetContent className="">
            <SheetHeader>
              <SheetTitle className="text-2xl mb-2">{info.title}</SheetTitle>
              <Separator />
              <SheetDescription className="mt-2">
                <div className="inline-flex w-full gap-4">
                  <h1 className="text-foreground/50 text-[13pt]">
                    {info.username}
                  </h1>
                  <Separator
                    orientation="vertical"
                    className="data-[orientation=vertical]:h-[20px] data-[orientation=vertical]:w-[2px]"
                  />
                  <p className="text-foreground/50 text-[13pt]">
                    {formatDate(info.created_at)}
                  </p>
                </div>
              </SheetDescription>
            </SheetHeader>
            <Separator />
            <div className="p-5 w-full h-[80%]">
              <Card className="h-full">
                <CardContent>{info.desc}</CardContent>
              </Card>
            </div>
            <SheetFooter>
              <Button>Edit</Button>
              <Button variant="outline">Delete</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </main>
  );
};

export default InformationApp;
