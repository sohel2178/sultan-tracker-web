import React from "react";

import UserCard from "@/components/cards/UserCard";
import DataRenderer from "@/components/DataRenderer";
import LocalSearch from "@/components/search/LocalSearch";
import ROUTES from "@/constants/route";
import { EMPTY_REFERENCES } from "@/constants/states";
import { GetUsers } from "@/lib/actions/user.action";

async function Users({ searchParams }: RouteParams) {
  const { page, pageSize, query } = await searchParams;

  const { success, data, error } = await GetUsers({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 50,
    query,
  });

  const { users, totalUsers } = data || {};
  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Users {totalUsers}</h1>

        {/* <Button
              className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
              asChild
            >
              <Link href={ROUTES.ADD_REFERENCE}>Create Reference</Link>
            </Button> */}
      </section>

      <section className="mt-4">
        <LocalSearch
          route={ROUTES.USERS}
          imgSrc="/icons/search.svg"
          placeholder="Search Users..."
          otherClasses="flex-1"
        />
      </section>

      <DataRenderer
        success={success}
        error={error}
        data={users}
        empty={EMPTY_REFERENCES}
        render={(users) => (
          <div className="mt-10 flex w-full flex-wrap gap-4">
            {users.map((user) => (
              <UserCard user={user} key={user.email} />
            ))}
          </div>
        )}
      />
    </>
  );
}

export default Users;
