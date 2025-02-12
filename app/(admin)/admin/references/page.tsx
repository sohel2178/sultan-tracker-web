import Link from "next/link";
import React from "react";

import ReferenceCard from "@/components/cards/ReferenceCard";
import DataRenderer from "@/components/DataRenderer";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/route";
import { EMPTY_REFERENCES } from "@/constants/states";
import { GetReferences } from "@/lib/actions/reference.action";

async function ReferencePage({ searchParams }: RouteParams) {
  const { page, pageSize, query } = await searchParams;

  const { success, data, error } = await GetReferences({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 50,
    query,
  });

  const { references, totalReferences } = data || {};
  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">
          Refereces {totalReferences}
        </h1>

        <Button
          className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
          asChild
        >
          <Link href={ROUTES.ADD_REFERENCE}>Create Reference</Link>
        </Button>
      </section>

      <section className="mt-4">
        <LocalSearch
          route={ROUTES.REFERENCES}
          imgSrc="/icons/search.svg"
          placeholder="Search Refereces..."
          otherClasses="flex-1"
        />
      </section>

      <DataRenderer
        success={success}
        error={error}
        data={references}
        empty={EMPTY_REFERENCES}
        render={(references) => (
          <div className="mt-10 flex w-full flex-wrap gap-4">
            {references.map((reference) => (
              <ReferenceCard reference={reference} key={reference._id} />
            ))}
          </div>
        )}
      />
    </>
  );
}

export default ReferencePage;
