import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FcSearch } from "react-icons/fc";

const API_KEY = import.meta.env.VITE_API_KEY;

//Function for Random number Generator
const generateRandomKuralNumber = () => {
  return Math.round(Math.random() * 1330) + 1;
};

export const Thirukural = () => {
  //Reference
  const inputRef = useRef();
  //States
  const [kural, setKural] = useState();
  const [inputKuralNumber, setInputKuralNumber] = useState("");
  const [kuralMeaningVisiblity, setKuralMeaningVisiblity] = useState(false);

  //Function for KuralMeaning Visiblity
  const handleKuralMeaningVisiblity = () => {
    if (kuralMeaningVisiblity) {
      setKuralMeaningVisiblity(false);
    } else {
      setKuralMeaningVisiblity(true);
    }
  };

  //Function For getting Random Kural
  const fetchRandomKural = async () => {
    const randomKuralNumber = generateRandomKuralNumber();
    const response = await axios.get(
      `https://getthirukkural.appspot.com/api/3.0/kural/${randomKuralNumber}?appid=${API_KEY}`
    );
    setKural(response.data);
    setKuralMeaningVisiblity(false);
  };

  //Function For getting specified kural
  const fetchSpecifedKural = async () => {
    if (!inputKuralNumber) {
      alert("குறள் எண் உள்ளிடுக...");
    } else if (inputKuralNumber > 1330) {
      alert("1 முதல் 1330 வரையிலான எண்ணை உள்ளிடவும்..");
    }
    const response = await axios.get(
      `https://getthirukkural.appspot.com/api/3.0/kural/${inputKuralNumber}?appid=${API_KEY}`
    );
    setKural(response.data);
    setInputKuralNumber("");
    setKuralMeaningVisiblity(false);
  };

  //Side Effects
  useEffect(() => {
    fetchRandomKural();
  }, []);

  return (
    <div className="border w-180 min-h-96 text-center px-3 my-40 rounded-xl bg-white">
      {/* Heading */}
      <h1 className="font-bold text-2xl my-3">வள்ளுவரின் குறள்</h1>

      {/* Inputs and Button Fields */}
      <div className="flex items-center justify-between my-5">
        <div className="flex">
          <input
            type="number"
            value={inputKuralNumber}
            onChange={(e) => setInputKuralNumber(e.target.value)}
            max={1330}
            min={1}
            placeholder="குறள் எண்"
            className="border w-40 py-2 px-5 rounded-md focus:outline-none mx-5 hover:bg-gray-100"
          />
          <button
            onClick={fetchSpecifedKural}
            className="border py-1 px-3 rounded-lg mx-5 active:scale-95 hover:bg-gradient-to-tl from-pink-400 via-rose-500 to-red-600"
          >
            <FcSearch />
          </button>
        </div>
        <div>
          <button
            onClick={fetchRandomKural}
            className="border py-2 px-3 rounded-lg mx-5 active:scale-95 hover:bg-gradient-to-bl from-lime-400 via-emerald-500 to-green-600"
          >
            புதிய குறள்
          </button>
        </div>
      </div>
      {/* Kural Block */}
      <div className="border text-white my-3 bg-olai_chuvadi bg-cover bg-center rounded-xl bg-gradient-to-tl from-pink-400 via-rose-500 to-red-600">
        <h1 className="font-semibold my-3">குறள்</h1>
        <div className="my-3 ">
          <p>{kural?.line1}</p>
          <p>{kural?.line2}</p>
          <p className="text-right mx-10 italic"> - திருவள்ளுவர்</p>
        </div>
      </div>
      {/* Kural Number , Paal , Meaning  */}
      <div className="my-3 flex justify-between items-center py-2">
        <div className="flex justify-start ">
          <p className="font-semibold px-5 ">
            குறள் எண் :{" "}
            <span className="font-normal">{`${kural?.number}`}</span>
          </p>
          <p className="font-semibold px-5">
            அதிகாரம் :{" "}
            <span className="font-normal">{`${kural?.athigaram}`}</span>
          </p>
        </div>
        <button
          onClick={handleKuralMeaningVisiblity}
          className="border py-2 px-3 rounded-lg mx-5 active:scale-95 hover:bg-gradient-to-bl from-lime-400 via-emerald-500 to-green-600"
        >
          பொருள்
        </button>
      </div>
      {/* Meaning of Kural */}
      {kuralMeaningVisiblity && (
        <>
          <div className="border my-3 px-3 bg-gradient-to-tl text-white from-pink-400 via-rose-500 to-red-600 rounded-xl">
            <h1 className="font-semibold my-2">பொருள்</h1>
            <p className="text-left text-sm px-5 my-2 text-wrap">
              {`${kural?.urai1} ${kural?.urai2} ${kural?.urai3}`}
            </p>
            <p className="text-right mx-10 italic text-sm">
              {" "}
              {`- ${kural.urai1Author}`}
            </p>
            <div className="border text-black py-3 my-3 flex justify-around bg-white rounded-xl text-sm">
              <p className="font-bold">
                பால் : <span className="font-normal">{`${kural?.paal}`}</span>
              </p>
              <p className="font-bold">
                இயல் : <span className="font-normal">{`${kural?.iyal}`}</span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
