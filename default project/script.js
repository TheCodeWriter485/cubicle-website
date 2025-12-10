// pokeapi.js

// Import the PokeAPI wrapper from CDN context (already loaded in HTML)
const P = new Pokedex.Pokedex();

/**
 * Get Pokémon data by name from PokéAPI.
 * @param {string} name - Pokémon name
 * @returns {Promise<object|null>} - Pokémon data or null if not found
 */
async function getPokemonData(name) {
  try {
    const pokemon = await P.getPokemonByName(name.toLowerCase());
    return {
      name: pokemon.name,
      id: pokemon.id,
      types: pokemon.types.map(t => t.type.name).join(" "),
      abilities: pokemon.abilities.map(a => a.ability.name).join("<br>"),
      sprite: pokemon.sprites.front_default || pokemon.sprites.other["official-artwork"].front_default,
      stats: pokemon.stats.map(s => `${s.stat.name}: ${s.base_stat}`).join("<br>"),
      baseStat: pokemon.stats.map(n =>`${n.base_stat}`).join("<br>"),
    };
  } catch (err) {
    console.error(`Error fetching data for ${name}:`, err);
    return null;
  }
}