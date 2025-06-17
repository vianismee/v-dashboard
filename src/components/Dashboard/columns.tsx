import { IJob } from "@/types/job";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<IJob>[] = [
  {
    accessorKey: "user",
    header: "Designer",
  },
  {
    accessorKey: "user",
    header: "Designer",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
