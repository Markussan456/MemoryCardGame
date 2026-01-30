import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
const pokemonNames = [
  "pikachu",
  "charizard",
  "bulbasaur",
  "squirtle",
  "jigglypuff",
  "mewtwo",
  "eevee",
  "snorlax",
  "gengar",
  "dragonite",
  "meowth",
  "psyduck",
  "machamp",
  "alakazam",
  "gyarados",
  "lapras",
  "ditto",
  "vaporeon",
  "mew",
  "articuno",
];

function App() {
  async function getAllPokemon() {
    const allPokemon = [];
    for (const name of pokemonNames) {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await res.json();
      allPokemon.push(data);
    }
    console.log("Collected pokemons");
    setPokemon(allPokemon);
  }

  const [clickedPokemon, setClicked] = useState([]);
  const [pokemon, setPokemon] = useState([]);
  const [score, Setscore] = useState(0);
  const [bestScore, SetBestScore] = useState(0);

  useEffect(() => {
    getAllPokemon();
  }, []);

  function shuffleArr() {
    let arrCopy = [...pokemon];
    let currentIndex = arrCopy.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [arrCopy[currentIndex], arrCopy[randomIndex]] = [
        arrCopy[randomIndex],
        arrCopy[currentIndex],
      ];
    }
    console.log(pokemon);
    setPokemon(arrCopy);
    console.log(pokemon);
  }
  function handleClick(pokemon) {
    const hasDuplicate = clickedPokemon.includes(pokemon.id);
    if (!hasDuplicate) {
      Setscore((prevScore) => prevScore + 1);
      setClicked((prev) => [...prev, pokemon.id]);
      shuffleArr();
    } else {
      if (bestScore === 0) {
        SetBestScore(score);
        Setscore(0);
        setClicked([]);
      } else if (bestScore < score) {
        SetBestScore(score);
        Setscore(0);
        setClicked([]);
      } else {
        Setscore(0);
        setClicked([]);
      }
    }
  }

  return (
    <>
      <div className="scores">
        <h1>Score : {score}</h1>
        <p>Best Score : {bestScore}</p>
      </div>
      <div className="pokemonDiv">
        {pokemon && pokemon.length > 0 ? (
          pokemon.map((pokemons) => {
            return (
              <div key={pokemons.id}>
                <img
                  onClick={() => handleClick(pokemons)}
                  className="pokemonImgs"
                  src={pokemons.sprites.front_default}
                  alt=""
                />
                <p className="pokemonName">{pokemons.name}</p>
              </div>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default App;
