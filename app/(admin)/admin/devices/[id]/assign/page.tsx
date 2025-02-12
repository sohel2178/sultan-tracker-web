import UserCard from "@/components/cards/UserCard";
import DataRenderer from "@/components/DataRenderer";
import LocalSearch from "@/components/search/LocalSearch";
import ROUTES from "@/constants/route";
import { DEFAULT_EMPTY } from "@/constants/states";
import { GetSearchedAssignUsers } from "@/lib/actions/user.action";

// import DeviceCard from "@/components/cards/DeviceCard";
// import devices from "@/constants/devices";
// import { EMPTY_DEVICES } from "@/constants/states";

async function AssignDevice({ params, searchParams }: RouteParams) {
  const { id } = await params;
  const { query } = await searchParams;

  const { success, data, error } = await GetSearchedAssignUsers({
    query,
  });

  const { users } = data || {};

  return (
    <div className="h-full px-6 pb-6 max-md:pb-14 sm:px-14">
      <div className="relative flex w-full flex-col">
        <div className="background-light850_dark100 sticky top-20 flex w-full flex-col">
          <div className=" flex w-full flex-col-reverse gap-4 pt-6 sm:flex-row sm:justify-between">
            <h1 className="h1-bold text-dark100_light900">
              Search Assign Users
            </h1>
          </div>

          <section className="mt-4">
            <LocalSearch
              route={ROUTES.ASSIGN_DEVICE(id)}
              imgSrc="/icons/search.svg"
              placeholder="Search User by Email..."
              otherClasses="flex-1"
            />
          </section>
        </div>

        <div className="flex h-10 flex-1 flex-col overflow-y-auto">
          <DataRenderer
            success={success}
            error={error}
            data={users}
            empty={DEFAULT_EMPTY}
            render={(users) => (
              <div className="mt-10 flex w-full flex-wrap gap-4 overflow-y-auto">
                {users.map((user) => (
                  <UserCard user={user} key={user._id} isAssign deviceId={id} />
                ))}
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default AssignDevice;
