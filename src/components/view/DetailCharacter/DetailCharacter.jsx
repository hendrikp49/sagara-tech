import Layout from "@/components/layouts/Layout";
import Toast from "@/components/ui/Toast";
import useCharacter from "@/hooks/useCharacter";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DetailCharacter = () => {
  const { character, setCharacter } = useCharacter();
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const router = useRouter();
  const { id } = router.query;
  const [assigned, setAssigned] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Fetch karakter dari API
  const getDetailChar = async () => {
    try {
      const result = await axios.get(currentPage);
      setCharacter(result.data.results);
    } catch (error) {
      console.error("Error fetching character:", error);
    }
  };

  const detailChar = character?.find((item) => item.id === parseInt(id));

  const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
      if (typeof window !== "undefined") {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : initialValue;
      }
      return initialValue;
    });

    useEffect(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(storedValue));
      }
    }, [storedValue, key]);

    return [storedValue, setStoredValue];
  };

  const [characterByLocation, setCharacterByLocation] = useLocalStorage(
    "planet",
    []
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = JSON.parse(localStorage.getItem("planet")) || [];
      const check = storedData.some((item) => item.char.id === parseInt(id));
      setAssigned(check);
    }
  }, [id, characterByLocation]);

  // Tambah karakter ke planet
  const addCharToPlanet = (character, newPlanet) => {
    if (!character) return;

    setCharacterByLocation((prev) => {
      const updatedData = [...prev, { char: character, planet: newPlanet }];
      localStorage.setItem("planet", JSON.stringify(updatedData));
      return updatedData;
    });
    setShowToast(true);
    setToastMessage(`${character.name} assigned to ${newPlanet}`);
    setAssigned(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  useEffect(() => {
    getDetailChar();
    if (!localStorage.getItem("planet")) {
      localStorage.setItem("planet", JSON.stringify([]));
    }
  }, []);

  return (
    <Layout>
      {/* toast when click button */}
      {showToast && <Toast>{toastMessage}</Toast>}

      <div className="p-5 lg:p-10">
        <h1 className="font-bold text-2xl lg:text-4xl mb-10 text-center">
          {`Detail Character of ${detailChar?.name}`}{" "}
        </h1>
        <div className="flex items-center lg:items-start flex-col lg:flex-row lg:justify-center gap-5 lg:gap-10">
          {/* char */}
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 w-full lg:max-w-[60%] border border-gray-300 p-5 rounded-lg">
            <img
              src={detailChar?.image}
              alt={detailChar?.name}
              className="rounded-lg object-cover max-w-full"
            />
            <div className="flex flex-col gap-1">
              <h2 className="font-bold text-xl text-center mb-5">
                {detailChar?.name}
              </h2>
              <p>Gender : {detailChar?.gender}</p>
              <p>Species : {detailChar?.species}</p>
              <p>Status : {detailChar?.status}</p>
            </div>
          </div>

          {/* assign to */}
          <div className="flex flex-col gap-5 p-5">
            <h2 className="text-2xl font-bold">Assigned to :</h2>

            <div className="flex flex-col gap-5 w-full ">
              <button
                onClick={() => addCharToPlanet(detailChar, "Earth")}
                className={`rounded-full max-w-full px-3 py-2 bg-neutral-300 text-background ${
                  assigned ? "opacity-50" : "hover:bg-neutral-400"
                } ease-in-out duration-150 `}
                disabled={assigned}
              >
                Earth
              </button>
              <button
                onClick={() => addCharToPlanet(detailChar, "Mars")}
                className={`rounded-full max-w-full px-3 py-2 bg-neutral-300 text-background ${
                  assigned ? "opacity-50" : "hover:bg-neutral-400"
                } ease-in-out duration-150 `}
                disabled={assigned}
              >
                Mars
              </button>
              <button
                onClick={() => addCharToPlanet(detailChar, "Venus")}
                className={`rounded-full max-w-full px-3 py-2 bg-neutral-300 text-background ${
                  assigned ? "opacity-50" : "hover:bg-neutral-400"
                } ease-in-out duration-150 `}
                disabled={assigned}
              >
                Venus
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailCharacter;
