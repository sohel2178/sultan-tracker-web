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
  id: string;
  onDelete: (params: DeleteDeviceParams) => Promise<ActionResponse>;
}

function DeleteDialog({ title, content, id, onDelete }: Props) {
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    const { success } = await onDelete({ id });
    if (success) {
      setOpen(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Image src="/icons/trash.svg" width={20} height={20} alt="Delete" />
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

export default DeleteDialog;
