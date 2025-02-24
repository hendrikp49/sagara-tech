import useCharacter from "@/hooks/useCharacter";
import Link from "next/link";
import { useEffect } from "react";
import { setPage } from "@/store/paginationSlice";
import { useDispatch, useSelector } from "react-redux";
import Layout from "@/components/layouts/Layout";

const Homepage = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const { getCharacters, getCharactersByPage, character, loading, pageInfo } =
    useCharacter();

  useEffect(() => {
    getCharacters(currentPage);
    if (!localStorage.getItem("planet")) {
      localStorage.setItem("planet", JSON.stringify([]));
    }
  }, []);

  return (
    <Layout>
      <section className="flex gap-5 flex-col items-center justify-center p-5 lg:gap-10 lg:p-10">
        <h1 className="text-4xl font-bold text-center">
          Rick and Morty Characters
        </h1>
        <div className="flex flex-wrap gap-5 ">
          {/* Pagination */}
          <div className="flex gap-2 w-full items-center justify-between">
            <button
              onClick={() => {
                dispatch(setPage(pageInfo.prev));
                getCharactersByPage("prev");
              }}
              className={`bg-neutral-300 rounded-lg px-3 py-2 ease-in-out duration-150 text-background ${
                !pageInfo.prev ? "opacity-50" : "hover:bg-neutral-400"
              }`}
              disabled={!pageInfo.prev}
            >
              Previous
            </button>
            <button
              onClick={() => {
                dispatch(setPage(pageInfo.next));
                getCharactersByPage("next");
              }}
              className={`bg-neutral-300  rounded-lg px-3 py-2 ease-in-out duration-150 text-background ${
                !pageInfo.next ? "opacity-50" : "hover:bg-neutral-400"
              }`}
            >
              Next
            </button>
          </div>

          {/* card */}
          {character?.map((item) => (
            <Link
              href={`/${item.id}`}
              key={item.id}
              className="flex flex-col gap-2 items-center flex-grow border border-gray-300 rounded-lg p-3 w-72"
            >
              <img
                src={item.image}
                alt={item.name}
                className="rounded-lg object-cover max-w-full"
              />
              <h2 className="text-2xl font-bold line-clamp-1 text-center">
                {item.name}
              </h2>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex gap-2 w-full items-center justify-between">
          <button
            onClick={() => {
              dispatch(setPage(pageInfo.prev));
              getCharactersByPage("prev");
            }}
            className={`bg-neutral-300 rounded-lg px-3 py-2 ease-in-out duration-150 text-background ${
              !pageInfo.prev ? "opacity-50" : "hover:bg-neutral-400"
            }`}
            disabled={!pageInfo.prev}
          >
            Previous
          </button>
          <button
            onClick={() => {
              dispatch(setPage(pageInfo.next));
              getCharactersByPage("next");
            }}
            className={`bg-neutral-300 rounded-lg px-3 py-2 ease-in-out duration-150 text-background ${
              !pageInfo.next ? "opacity-50" : "hover:bg-neutral-400"
            }`}
          >
            Next
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default Homepage;
