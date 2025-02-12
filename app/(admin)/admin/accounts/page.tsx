import React from "react";

import AccountCard from "@/components/cards/AccountCard";
import DataRenderer from "@/components/DataRenderer";
import LocalSearch from "@/components/search/LocalSearch";
import ROUTES from "@/constants/route";
import { DEFAULT_EMPTY } from "@/constants/states";
import { GetAllAccounts } from "@/lib/actions/account.action";

async function Acounts({ searchParams }: RouteParams) {
  const { page, pageSize, query } = await searchParams;

  const { success, data, error } = await GetAllAccounts({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 50,
    query,
  });

  const { accounts, totalAccounts } = data || {};
  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">
          Accounts {totalAccounts}
        </h1>
      </section>

      <section className="mt-4">
        <LocalSearch
          route={ROUTES.ACCOUNTS}
          imgSrc="/icons/search.svg"
          placeholder="Search Accounts..."
          otherClasses="flex-1"
        />
      </section>

      <DataRenderer
        success={success}
        error={error}
        data={accounts}
        empty={DEFAULT_EMPTY}
        render={(accounts) => (
          <div className="mt-10 flex w-full flex-wrap gap-4">
            {accounts.map((account) => (
              <AccountCard account={account} key={account._id} />
            ))}
          </div>
        )}
      />
    </>
  );
}

export default Acounts;
