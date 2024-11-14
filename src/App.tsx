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
  const [characters, setCharacters] = useState<Character[]>([]);
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

  return (
    <>
      <div className="text-center">
        <h2 className="text-3xl">TypeScript Rick Morty Api</h2>
      </div>
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap justify-center">
          {characters.map((character) => (
            <div className="flex text-center align-middle col sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
              <div className="max-w-sm card shadow-2xl border  rounded-xl dark:bg-gray-800 dark:border-gray-700">
                <img
                  className="image"
                  src={character.image}
                  alt="Karakter fotografı"
                />
                <div className="p-5">
                  <p className="mb-3 font-bold text-lg ">{character.name}</p>
                  <p className="mb-3 font-bold text-lg ">
                    {character.gender == "Male" ? "Erkek" : "Kadın"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
