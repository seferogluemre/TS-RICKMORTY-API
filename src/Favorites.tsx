import "./Style.css";
import { useEffect, useState } from "react";
import { FaSkullCrossbones } from "react-icons/fa6";
import { LuHeartPulse } from "react-icons/lu";
import { GrStatusUnknown } from "react-icons/gr";
import { Character } from "./components/interfaces/Character";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";

function Favorites() {
  const [favorites, setFavorites] = useState<Character[]>([]);

  useEffect(() => {
    const storedFavorites = sessionStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  return (
    <div>
      <div className="back-btn">
        <Link to="/">
          <IoArrowBack />{" "}
        </Link>
      </div>
      <h1 className="text-center my-3 text-3xl text-white">
        Favori Karakterler
      </h1>
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap justify-center">
          {favorites.map(({ gender, image, id, name, location, status }) => (
            <div
              className="flex text-center align-middle col sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2"
              key={id}
            >
              <div className="max-w-sm card shadow-2xl border  rounded-xl dark:bg-gray-800 dark:border-gray-700">
                <img className="image" src={image} alt="Karakter fotografı" />
                <div className="p-5 body my-1">
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
                    <span>Yaşıyormu : </span>
                    {(() => {
                      // Status Kontrolüne göre deger döndürme
                      switch (status) {
                        case "Alive":
                          return <LuHeartPulse className="icon text-red-600" />;
                        case "Dead":
                          return <FaSkullCrossbones className="icon" />;
                        case "unknown":
                          return <GrStatusUnknown className="icon-unknown " />;
                      }
                    })()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
