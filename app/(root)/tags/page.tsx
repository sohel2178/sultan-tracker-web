import React from "react";

import TagCard from "@/components/cards/TagCard";
import DataRenderer from "@/components/DataRenderer";
import LocalSearch from "@/components/search/LocalSearch";
import ROUTES from "@/constants/route";
import { EMPTY_TAGS } from "@/constants/states";
import { GetTags } from "@/lib/actions/tag.action";

async function Tags({ searchParams }: RouteParams) {
  const { page, pageSize, query, filter } = await searchParams;

  // console.log(page, pageSize, query, filter);
  const { success, data, error } = await GetTags({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
    filter,
  });

  const { tags } = data || {};

  return (
    <>
      <h1 className="h1-bold text-dark100_light900 text-3xl">Tags</h1>

      <section className="mt-11">
        <LocalSearch
          route={ROUTES.TAGS}
          imgSrc="/icons/search.svg"
          placeholder="Search tags..."
          otherClasses="flex-1"
        />
      </section>

      <DataRenderer
        data={tags}
        success={success}
        error={error}
        empty={EMPTY_TAGS}
        render={(tags) => (
          <div className="mt-10 flex w-full flex-wrap gap-4">
            {tags.map((tag) => (
              <TagCard key={tag._id} {...tag} />
            ))}
          </div>
        )}
      />
    </>
  );
}

export default Tags;
