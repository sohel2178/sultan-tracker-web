"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ROUTES from "@/constants/route";

import { Button } from "../ui/button";

interface Props {
  title: string;
  content: string;
  userId: string;
  deviceId: string;
  //   _id: string;
  onAssign: (params: AssignDeviceParams) => Promise<ActionResponse>;
}

function AssignDialog({ title, content, userId, deviceId, onAssign }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    const { success } = await onAssign({ userId, deviceId });
    if (success) {
      setOpen(false);
      router.push(ROUTES.DEVICES, { scroll: false });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Image src="/icons/assign.svg" width={20} height={20} alt="Assign" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{content}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>

          <Button type="submit" onClick={handleSubmit}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AssignDialog;
