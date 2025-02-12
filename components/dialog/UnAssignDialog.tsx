"use client";

import Image from "next/image";
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

import { Button } from "../ui/button";

interface Props {
  title: string;
  content: string;
  deviceId: string;
  onUnAssign: (params: GetBaseParams) => Promise<ActionResponse>;
}

function UnAssignDialog({ title, content, deviceId, onUnAssign }: Props) {
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    const { success } = await onUnAssign({ _id: deviceId });
    if (success) {
      setOpen(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full cursor-pointer hover:scale-110" asChild>
        <span className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-transparent px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800 dark:focus:ring-gray-400">
          UnAssign Device
        </span>
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

export default UnAssignDialog;
