import Layout from "@/components/layouts/Layout";
import { useEffect, useState } from "react";

const CharByLocation = () => {
  const [dataCharacter, setDataCharacter] = useState([]);
  const [dataFilter, setDataFilter] = useState("");

  const handleChangeFilter = (e) => {
    setDataFilter(e.target.value);
  };

  const filterDataByLocation = !dataFilter
    ? dataCharacter
    : dataCharacter?.filter((item) => item.planet === dataFilter);

  useEffect(() => {
    const dataLocal = localStorage.getItem("planet");
    if (dataLocal && !dataFilter) {
      setDataCharacter(JSON.parse(dataLocal));
    }
  }, []);

  return (
    <Layout>
      <section className="flex gap-5 flex-col items-center justify-center p-5 lg:gap-10 lg:p-10">
        <h1 className="text-4xl font-bold text-center">
          Find Characters By Location
        </h1>
        {/* select */}
        <div className="w-full flex justify-end">
          <select
            onChange={handleChangeFilter}
            value={dataFilter}
            className="flex pr-5 gap-2 py-2 px-1 bg-background border justify-end rounded-lg w-48 self-end items-end"
          >
            <option value="">All</option>
            <option value="Mars">Mars</option>
            <option value="Earth">Earth</option>
            <option value="Venus">Venus</option>
          </select>
        </div>
        <div className="flex w-full flex-wrap  gap-5 ">
          {/* card */}
          {filterDataByLocation.length === 0 ? (
            <p className="w-full text-center mt-20 text-neutral-400">
              Data not found
            </p>
          ) : (
            filterDataByLocation?.map((item) => (
              <div
                key={item?.char.id}
                className="flex flex-col gap-2 items-center border border-gray-300 rounded-lg p-3 w-[300px]"
              >
                <img
                  src={item?.char.image}
                  alt={item?.char.name}
                  className="rounded-lg object-cover max-w-full"
                />
                <h2 className="text-2xl font-bold line-clamp-1 text-center">
                  {item?.char.name}
                </h2>
                <p>Moved to: {item?.planet}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </Layout>
  );
};

export default CharByLocation;
