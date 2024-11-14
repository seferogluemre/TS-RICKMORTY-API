import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, FormControl, Form } from "react-bootstrap";
import { FaSkullCrossbones } from "react-icons/fa6";
import { LuHeartPulse } from "react-icons/lu";
import { GrStatusUnknown } from "react-icons/gr";
interface Character {
  id: number;
  name: string;
  status: string;
  gender: string;
  location: { name: string };
  image: string;
}

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchCharacter, setSearchCharacter] = useState<string>("");

  useEffect(() => {
    const getAllCharacters = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://rickandmortyapi.com/api/character?limit=10&page=2"
        );
        const data = await response.data.results;
        setCharacters(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error("API Hatası var kardeşim " + error);
        setLoading(false);
      }
    };

    getAllCharacters();
  }, []);

  const searchCharacters = characters.filter((character) => {
    const nameMatch = character.name
      .toLowerCase()
      .includes(searchCharacter.toLowerCase());

    return nameMatch;
  });

  if (loading) {
    return (
      <div className={`${loading ? "alert-container" : "none"}`}>
        <Alert className="">Karakterler Yüklenirken Hata Oluştu</Alert>
      </div>
    );
  }

  return (
    <>
      <div className="text-center">
        <h2 className="title">TypeScript Rick Morty Api</h2>
        <Form>
          <FormControl
            type="text"
            value={searchCharacter}
            placeholder="Search Characters....."
            className="input my-5"
            onChange={(e) => setSearchCharacter(e.target.value)}
          />
        </Form>
      </div>
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap justify-center">
          {searchCharacters.map(
            ({ gender, image, id, name, location, status }) => (
              <div
                className="flex text-center align-middle col sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2"
                key={id}
              >
                <div className="max-w-sm card shadow-2xl border  rounded-xl dark:bg-gray-800 dark:border-gray-700">
                  <img className="image" src={image} alt="Karakter fotografı" />
                  <div className="p-5 body">
                    <p className="mb-4 font-bold text-lg ">{name}</p>
                    <p className="mb-4 font-bold text-lg ">
                      Adres:{" "}
                      {location.name === "unknown"
                        ? "Adres Bulunamadı"
                        : location.name}
                    </p>
                    <p className="mb-4 font-bold text-lg ">
                      Cinsiyet :
                      <span style={{ color: "#ffc2a3" }}>
                        {gender == "Male" ? "Erkek" : "Kadın"}
                      </span>
                    </p>
                    <p className="mb-3 font-bold text-lg flex justify-center">
                      <span>Yaşıyormu? </span>
                      {(() => {
                        // Status Kontrolüne göre deger döndürme
                        switch (status) {
                          case "Alive":
                            return (
                              <LuHeartPulse className="icon text-red-600" />
                            );
                          case "Dead":
                            return <FaSkullCrossbones className="icon" />;
                          case "unknown":
                            return (
                              <GrStatusUnknown className="icon-unknown " />
                            );
                        }
                      })()}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default App;
