// GetPokemons.tsx

import '../index.css';  // Asegúrate de ajustar la ruta si es necesario
import axios from "axios";
import React, { useEffect, useState } from "react";
import pokeImage from '../poke.png';

const GetPokemons = () => {
const [data, setData] = useState([]);
const [generation, setGeneration] = useState<number>(1);
const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
const [verMasMovimientos, setVerMasMovimientos] = useState(false);

const Obtener = async () => {
  try {
    let apiUrl = '';

    switch (generation) {
      case 1:
        apiUrl = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=151';
        break;
      case 2:
        apiUrl = 'https://pokeapi.co/api/v2/pokemon?offset=151&limit=100';
        break;
      case 3:
        apiUrl = 'https://pokeapi.co/api/v2/pokemon?offset=251&limit=135';
        break;
      case 4:
        apiUrl = 'https://pokeapi.co/api/v2/pokemon?offset=386&limit=107';
        break;
      case 5:
        apiUrl = 'https://pokeapi.co/api/v2/pokemon?offset=493&limit=156';
        break;
      default:
        apiUrl = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=151';
    }

    const response = await axios.get(apiUrl);
    const json = response.data;
    setData(json.results);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  Obtener();
}, [generation]);

const handleGenerationChange = (event: any) => {
  setGeneration(parseInt(event.target.value, 10));
};

const obtenerDetallesPokemon = async (pokemonName: string) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemonData = response.data;
    setSelectedPokemon(pokemonData);
    setVerMasMovimientos(false); // Reiniciamos el estado al seleccionar un nuevo Pokémon
  } catch (error) {
    console.error(error);
  }
};

const cerrarVentanaEmergente = () => {
  setSelectedPokemon(null);
  setVerMasMovimientos(false); // Reiniciamos el estado al cerrar la ventana emergente
};

return (
  <div>
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 col-md-6">
          <img
            src={pokeImage}
            alt="Logo de Pokémon"
            className="img-fluid float-md-left"
          />
          <br /><br /><br /><br /><br /><br /><hr className='horizontal-line' />
        </div>
      </div>
    </div>

    <div className="container mt-3">
<div className="row mb-3">
  <div className="col-12 col-md-6">
    <label htmlFor="generationSelect" className="form-label">Generación:</label>
    <select
      id="generationSelect"
      className="form-select custom-select"  // Agrega la clase custom-select
      value={generation}
      onChange={handleGenerationChange}
    >
      <option value={1}>Primera</option>
      <option value={2}>Segunda</option>
      <option value={3}>Tercera</option>
      <option value={4}>Cuarta</option>
      <option value={5}>Quinta</option>
    </select>
  </div>
</div>

      <div className="row">
        {data.map((item, index) => (
          <div key={index} className="col-6 col-md-3 mb-3">
            <div className="card pokemon-card" onClick={() => obtenerDetallesPokemon(item['name'])}>
              <img
                src={`https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${item['name']}.png`}
                className="card-img-top"
                alt={`${item['name']} imagen`}
              />
              <div className="card-body">
                <h5 className="card-title">{item['name']}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {selectedPokemon && (
      <div className="modal" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{selectedPokemon.name}</h5>
              <button type="button" className="close" onClick={cerrarVentanaEmergente}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="text-center">
                <img
                  src={`https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${selectedPokemon.name}.png`}
                  alt={`${selectedPokemon.name} imagen`}
                  className="img-fluid mb-3"
                />
              </div>
              <p>Número de Pokémon: {selectedPokemon.id}</p>
              <p>Altura: {selectedPokemon.height}</p>
              <p>Peso: {selectedPokemon.weight}</p>
              <p>Tipo(s): {selectedPokemon.types.map((type: any) => type.type.name).join(', ')}</p>
              <p>Movimientos:</p>
              <ul>
                {selectedPokemon.moves.slice(0, 5).map((move: any, index: number) => (
                  <li key={index}>{move.move.name}</li>
                ))}
              </ul>
              {selectedPokemon.moves.length > 5 && (
                <button
                  type="button"
                  className="btn"
                  onClick={() => setVerMasMovimientos(!verMasMovimientos)}
                >
                  {verMasMovimientos ? "Ver menos" : "Ver más"}
                </button>
              )}
              {verMasMovimientos && (
                <ul>
                  {selectedPokemon.moves.slice(5).map((move: any, index: number) => (
                    <li key={index}>{move.move.name}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={cerrarVentanaEmergente}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);
}

export default GetPokemons;












