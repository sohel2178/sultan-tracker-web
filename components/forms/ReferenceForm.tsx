"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ROUTES from "@/constants/route";
import { toast } from "@/hooks/use-toast";
import { CreateReference, EditReference } from "@/lib/actions/reference.action";
import { ReferenceSchema } from "@/lib/validation";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface Props {
  reference?: Reference;
  isEdit?: boolean;
}

function ReferenceForm({ reference, isEdit = false }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ReferenceSchema>>({
    resolver: zodResolver(ReferenceSchema),
    defaultValues: {
      name: reference?.name || "",
      contact: reference?.contact || "",
      address: reference?.address || "",
    },
  });

  const handleCreateReference = async (
    data: z.infer<typeof ReferenceSchema>
  ) => {
    // console.log(data);
    startTransition(async () => {
      if (isEdit && reference) {
        const result = await EditReference({
          referenceId: reference._id,
          ...data,
        });
        if (result.success) {
          toast({
            title: "Success",
            description: "Reference Updated successfully",
          });
          router.push(ROUTES.REFERENCES);
        } else {
          toast({
            title: `Error ${result.status}`,
            description: result.error?.message || "Something went wrong",
            variant: "destructive",
          });
        }
        return;
      }
      const result = await CreateReference(data);
      if (result.success) {
        toast({
          title: "Success",
          description: "References created successfully",
        });
        if (result.data) router.push(ROUTES.REFERENCES);
      } else {
        toast({
          title: `Error ${result.status}`,
          description: result.error?.message || "Something went wrong",
          variant: "destructive",
        });
      }
    });

    // console.log(data);
  };
  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-10 max-sm:gap-4 sm:w-3/4"
        onSubmit={form.handleSubmit(handleCreateReference)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Reference Name <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Reference Contact <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Reference Address <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-8 flex justify-end">
          <Button
            type="submit"
            className="primary-gradient w-fit !text-light-900"
          >
            {isPending ? (
              <>
                <ReloadIcon className="mr-2 size-4 animate-spin" />
                <span>Submitting</span>
              </>
            ) : (
              <>{isEdit ? "Edit" : "Create Reference"}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ReferenceForm;
