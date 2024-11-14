import axios from "axios";
import { useEffect, useState } from "react";

interface Character {
  id: number;
  name: string;
  status: string;
  gender: string;
  location: {
    name: string;
  };
  image: string;
}

function App() {
  const [character, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getAllCharacters = async () => {
      try {
        const response = await axios.get(
          "https://rickandmortyapi.com/api/character"
        );
        const data = await response.data.results;
        setCharacters(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error("API Hatası var kardeşim " + error);
      }
    };

    getAllCharacters();
  }, []);

  return <></>;
}

export default App;
