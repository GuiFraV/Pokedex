import React from "react";
import { Pokemon } from "@/service/pokemonService";
import Image from "next/image";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const typeColors: { [key: string]: string } = {
  grass: "bg-green-500",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-500",
  bug: "bg-green-700",
  normal: "bg-gray-400",
  poison: "bg-purple-500",
  ground: "bg-yellow-700",
  fairy: "bg-pink-400",
  fighting: "bg-red-700",
  psychic: "bg-pink-700",
  rock: "bg-gray-700",
  ghost: "bg-purple-700",
  ice: "bg-blue-200",
  dragon: "bg-indigo-700",
  dark: "bg-gray-800",
  steel: "bg-gray-500",
  flying: "bg-blue-300",
};

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const mainType = pokemon.types[0];
  const bgColor = typeColors[mainType] || "bg-gray-500";

  return (
    <div className={`card text-black mb-4 $`}>
      <div className="card-body text-center">
        <Image
          src={pokemon.image}
          width={500}
          height={500}
          alt={pokemon.name}
          className="w-50 h-50 mx-auto mb-2"
        />
        <h5 className="card-title capitalize text-black ">{pokemon.name}</h5>
        <div>
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={`badge ${bgColor} text-white me-1 capitalize`}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
