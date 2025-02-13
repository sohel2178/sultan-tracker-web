import Link from 'next/link';

// import { auth } from "@/auth";
// import { Button } from "@/components/ui/button";
// import ROUTES from "@/constants/route";

// import { auth } from "@/auth";
import QuestionCard from '@/components/cards/QuestionCard';
import DataRenderer from '@/components/DataRenderer';
import HomeFilter from '@/components/filters/HomeFilter';
import LocalSearch from '@/components/search/LocalSearch';
import { Button } from '@/components/ui/button';
import ROUTES from '@/constants/route';
import { EMPTY_QUESTION } from '@/constants/states';
import { GetQuestions } from '@/lib/actions/question.action';
// import { api } from "@/lib/api";

// const questions = [
//   {
//     _id: "1",
//     title: "How to learn React?",
//     description: "I want to learn React, can anyone help me?",

//     tags: [
//       { _id: "1", name: "React" },
//       { _id: "2", name: "JavaScript" },
//     ],
//     author: {
//       _id: "1",
//       name: "John Doe",
//       image:
//         "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png",
//     },
//     upvotes: 10,
//     answers: 5,
//     views: 100,
//     createdAt: new Date(),
//   },
//   {
//     _id: "2",
//     title: "How to learn JavaScript?",
//     description: "I want to learn JavaScript, can anyone help me?",
//     tags: [
//       { _id: "1", name: "JavaScript" },
//       { _id: "2", name: "JavaScript" },
//     ],
//     author: {
//       _id: "1",
//       name: "John Doe",
//       image:
//         "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png",
//     },
//     upvotes: 10,
//     answers: 5,
//     views: 100,
//     createdAt: new Date(),
//   },
// ];
interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Home = async ({ searchParams }: SearchParams) => {
  // console.log("Where am I???");

  // const session = await auth();

  // if (session) {
  //   signOut();
  // }

  // console.log(session);

  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await GetQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query: query || '',
    filter: filter || '',
  });

  const { questions } = data || {};

  // const filteredQuestions = questions.filter((question) => {
  //   const matchesQuery = question.title
  //     .toLowerCase()
  //     .includes(query.toLowerCase());
  //   const matchesFilter = filter
  //     ? question.tags[0].name.toLowerCase() === filter.toLowerCase()
  //     : true;
  //   return matchesQuery && matchesFilter;
  // });

  // console.log(await searchParams);

  // if (session) {
  //   return (
  //     <form
  //       action={async () => {
  //         "use server";
  //         await signOut();
  //       }}
  //     >
  //       <button type="submit">Sign Out</button>
  //     </form>
  //   );
  // }

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Button
          className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>

      <section>
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Search Questions..."
          otherClasses="flex-1"
        />
      </section>
      <HomeFilter />
      <DataRenderer
        success={success}
        error={error}
        data={questions}
        empty={EMPTY_QUESTION}
        render={(questions) => (
          <div className="mt-10 flex w-full flex-col gap-6">
            {questions.map((question) => (
              <QuestionCard key={question._id} question={question} />
            ))}
          </div>
        )}
      />
      {/* {success ? (
        <div className="mt-10 flex w-full flex-col gap-6">
          {questions && questions.length > 0 ? (
            questions.map((question) => (
              <QuestionCard key={question._id} question={question} />
            ))
          ) : (
            <div className="mt-10 flex w-full items-center justify-center">
              <p className="text-dark400_light700">No questions found</p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-10 flex w-full items-center justify-center">
          <p className="text-dark400_light700">
            {error?.message || "Failed to fetch questions"}
          </p>
        </div>
      )} */}
    </>
  );
};

export default Home;
