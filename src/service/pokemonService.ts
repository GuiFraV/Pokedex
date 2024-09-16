export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

export async function fetchPokemons(): Promise<Pokemon[]> {
  const requests = [];

  for (let i = 1; i <= 151; i++) {
    requests.push(
      fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then((res) => res.json())
    );
  }
  const results = await Promise.all(requests);

  const pokemons = results.map((data: any) => ({
    id: data.id,
    name: data.name,
    image: data.sprites.other["official-artwork"].front_default,
    types: data.types.map((typeInfo: any) => typeInfo.type.name),
  }));

  return pokemons;
}
