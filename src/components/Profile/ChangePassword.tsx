import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { updatePassword } from "./actions";
import { RotateCcwKey } from "lucide-react";

const ChangePassword = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="inline-flex gap-2 cursor-pointer">
          {" "}
          <RotateCcwKey /> Reset Password
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="inline-flex gap-3 items-center">
            {" "}
            <RotateCcwKey />
            Reset Password
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <Label htmlFor="password">Masukkan Password Baru</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="enter new password.."
            />
          </div>
          <Button formAction={updatePassword} className="cursor-pointer">
            Reset Password
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePassword;
