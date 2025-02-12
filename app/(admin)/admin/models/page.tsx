import Link from "next/link";
import React from "react";

import ModelCard from "@/components/cards/ModelCard";
import DataRenderer from "@/components/DataRenderer";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/route";
import { EMPTY_MODELS } from "@/constants/states";
import { GetModels } from "@/lib/actions/model.action";

async function Models({ searchParams }: RouteParams) {
  const { page, pageSize, query } = await searchParams;

  const { success, data, error } = await GetModels({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 50,
    query,
  });

  const { models } = data || {};

  //   console.log(models);
  return (
    <div className="px-6 pb-6 pt-10 max-md:pb-14 sm:px-14">
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Model</h1>

        <Button
          className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
          asChild
        >
          <Link href={ROUTES.ADD_MODEL}>Create Model</Link>
        </Button>
      </section>

      <section className="mt-4">
        <LocalSearch
          route={ROUTES.MODELS}
          imgSrc="/icons/search.svg"
          placeholder="Search Models..."
          otherClasses="flex-1"
        />
      </section>

      <DataRenderer
        success={success}
        error={error}
        data={models}
        empty={EMPTY_MODELS}
        render={(models) => (
          <div className="mt-10 flex w-full flex-wrap gap-4">
            {models.map((model) => (
              <ModelCard key={model._id} model={model} />
            ))}
          </div>
        )}
      />
    </div>
  );
}

export default Models;
