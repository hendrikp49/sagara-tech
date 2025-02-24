import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";

const useCharacter = () => {
  const [character, setCharacter] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [loading, setLoading] = useState(false);

  const getCharacters = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setCharacter(response.data.results);
      setPageInfo(response.data.info);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getCharactersByPage = (direction) => {
    if (pageInfo.next && direction === "next") getCharacters(pageInfo.next);
    if (pageInfo.prev && direction === "prev") getCharacters(pageInfo.prev);
  };

  return {
    getCharacters,
    getCharactersByPage,
    setCharacter,
    character,
    loading,
    pageInfo,
  };
};

export default useCharacter;
