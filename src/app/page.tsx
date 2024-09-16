"use client";
import { useEffect, useState } from "react";
import { fetchPokemons, Pokemon } from "../service/pokemonService";
import PokemonCard from "../components/PokemonCard";
import PaginationComponent from "../components/PaginationComponent";
import { Container, Row, Col, Form } from "react-bootstrap";

const ITEMS_PER_PAGE = 20;

const Home = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getPokemons = async () => {
      const allPokemons = await fetchPokemons();
      setPokemons(allPokemons);
    };
    getPokemons();
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPokemons.length / ITEMS_PER_PAGE);
  const displayedPokemons = filteredPokemons.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Pokédex</h1>
      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Rechercher un Pokémon"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </Form>
      <Row>
        {displayedPokemons.map((pokemon) => (
          <Col key={pokemon.id} xs={12} sm={6} md={4} lg={3}>
            <PokemonCard pokemon={pokemon} />
          </Col>
        ))}
      </Row>
      <PaginationComponent
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default Home;
