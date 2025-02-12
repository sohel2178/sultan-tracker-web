"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ROUTES from "@/constants/route";
import { toast } from "@/hooks/use-toast";
import { CreateModel, EditModel } from "@/lib/actions/model.action";
import { ModelSchema } from "@/lib/validation";

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
  model?: Model;
  isEdit?: boolean;
}

function ModelForm({ model, isEdit = false }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ModelSchema>>({
    resolver: zodResolver(ModelSchema),
    defaultValues: {
      name: model?.name || "",
      supplierName: model?.supplierName || "",
    },
  });

  const handleCreateModel = async (data: z.infer<typeof ModelSchema>) => {
    // console.log(data);
    startTransition(async () => {
      if (isEdit && model) {
        const result = await EditModel({
          modelId: model._id,
          ...data,
        });

        if (result.success) {
          toast({
            title: "Success",
            description: "Model Updated successfully",
          });

          if (result.data) router.push(ROUTES.MODELS);
        } else {
          toast({
            title: `Error ${result.status}`,
            description: result.error?.message || "Something went wrong",
            variant: "destructive",
          });
        }

        return;
      }
      const result = await CreateModel(data);

      if (result.success) {
        toast({
          title: "Success",
          description: "Model created successfully",
        });

        if (result.data) router.push(ROUTES.MODELS);
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
        onSubmit={form.handleSubmit(handleCreateModel)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Model Name <span className="text-primary-500">*</span>
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
          name="supplierName"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Supplier Name <span className="text-primary-500">*</span>
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
              <>{isEdit ? "Edit" : "Create Model"}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ModelForm;
