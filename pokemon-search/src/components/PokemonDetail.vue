<template>
  <div v-if="isLoading" class="text-center mt-4">
    <p class="text-xl font-semibold">Loading...</p>
  </div>
  <div v-else class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-4 relative z-0 p-4 flex">
    <div v-if="pokemon" class="flex w-full">
      <!-- Left Column -->
      <div :style="{ backgroundColor: typeColor }" class="w-1/3 p-4 rounded-lg">
        <div class="text-center">
          <h1 class="text-3xl font-bold mb-4 capitalize">{{ pokemon.name }}</h1>
          <img :src="pokemon.sprites.other['official-artwork'].front_default" alt="Image of Pokemon" class="mb-4 mx-auto w-64 h-64 object-contain" />
          <div class="bg-gray-100 p-4 rounded-lg mt-4">
            <h2 class="text-2xl font-bold mb-2">Basic Information</h2>
            <p><strong>Weight:</strong> {{ pokemon.weight }} hectograms</p>
            <p><strong>Height:</strong> {{ pokemon.height }} decimetres</p>
            <p><strong>Base Experience:</strong> {{ pokemon.base_experience }}</p>
          </div>
          <div class="bg-gray-100 p-4 rounded-lg mt-4">
            <h2 class="text-2xl font-bold mb-2">Types</h2>
            <div>
              <span v-for="type in pokemon.types" :key="type.type.name" class="capitalize inline-block px-2 py-1 m-1 rounded" :class="typeClass(type.type.name)">
                {{ type.type.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- Middle Column -->
      <div class="w-1/3 p-4">
        <div class="bg-gray-100 p-4 rounded-lg">
          <h2 class="text-2xl font-bold mb-2">Abilities</h2>
          <ul>
            <li v-for="ability in pokemon.abilities" :key="ability.ability.name" class="capitalize">
              {{ ability.ability.name }}
            </li>
          </ul>
        </div>
        <div class="bg-gray-100 p-4 rounded-lg mt-4">
          <h2 class="text-2xl font-bold mb-2">Base Stats</h2>
          <ul>
            <li v-for="stat in pokemon.stats" :key="stat.stat.name" class="capitalize">
              <span class="font-semibold">{{ stat.stat.name }}:</span> {{ stat.base_stat }}
            </li>
          </ul>
        </div>
        <div class="bg-gray-100 p-4 rounded-lg mt-4">
          <h2 class="text-2xl font-bold mb-2">Moves</h2>
          <ul>
            <li v-for="move in pokemon.moves.slice(0, 5)" :key="move.move.name" class="capitalize">
              {{ move.move.name }}
            </li>
          </ul>
          <p class="text-sm text-gray-500 mt-2">Showing first 5 moves...</p>
        </div>
      </div>
      <!-- Right Column for Images -->
      <div class="w-1/3 p-4">
        <div class="bg-gray-100 p-4 rounded-lg">
          <h2 class="text-2xl font-bold mb-2">Images</h2>
          <div class="flex flex-wrap justify-center space-x-2">
            <img v-if="pokemon.sprites.front_default" :src="pokemon.sprites.front_default" alt="Front default" class="mb-4 w-24 h-24 object-contain" />
            <img v-if="pokemon.sprites.back_default" :src="pokemon.sprites.back_default" alt="Back default" class="mb-4 w-24 h-24 object-contain" />
            <img v-if="pokemon.sprites.front_shiny" :src="pokemon.sprites.front_shiny" alt="Front shiny" class="mb-4 w-24 h-24 object-contain" />
            <img v-if="pokemon.sprites.back_shiny" :src="pokemon.sprites.back_shiny" alt="Back shiny" class="mb-4 w-24 h-24 object-contain" />
          </div>
        </div>
        <!-- Evolution Section -->
        <div class="bg-gray-100 p-4 rounded-lg mt-4">
          <h2 class="text-2xl font-bold mb-2">Evolutions</h2>
          <div v-if="evolutions.length" class="flex flex-wrap justify-center space-x-2">
            <div v-for="evolution in evolutions" :key="evolution.name" class="text-center">
              <img :src="evolution.image" :alt="evolution.name" class="mb-2 w-24 h-24 object-contain" />
              <p class="capitalize">{{ evolution.name }}</p>
            </div>
          </div>
          <p v-else>No evolutions available.</p>
        </div>
      </div>
    </div>
    <div v-else class="text-center p-4">
      <p class="text-xl font-semibold">Please select a Pokémon to see the details.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue';

export default defineComponent({
  name: 'PokemonDetail',
  props: {
    selectedPokemonName: {
      type: String,
      required: false
    }
  },
  setup(props) {
    // State variables
    const pokemon = ref<any>(null);
    const isLoading = ref<boolean>(false);
    const evolutions = ref<Array<{ name: string, image: string }>>([]);

    // Function to fetch Pokémon details from the API
    const fetchPokemonDetails = async (name: string) => {
      isLoading.value = true;
      pokemon.value = null;
      evolutions.value = [];

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Log fetched data
        pokemon.value = data;
        console.log('Pokemon value set to:', pokemon.value); // Log the pokemon value

        // Fetch the evolution chain
        await fetchEvolutionChain(data.species.url);
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      } finally {
        isLoading.value = false;
      }
    };

    // Function to fetch evolution chain
    const fetchEvolutionChain = async (speciesUrl: string) => {
      try {
        const speciesResponse = await fetch(speciesUrl);
        const speciesData = await speciesResponse.json();
        const evolutionResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionResponse.json();

        const chain = evolutionData.chain;

        // Traverse the evolution chain and collect names and images
        let current = chain;
        while (current) {
          const evolutionName = current.species.name;
          const evolutionImageResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionName}`);
          const evolutionImageData = await evolutionImageResponse.json();
          evolutions.value.push({
            name: evolutionName,
            image: evolutionImageData.sprites.front_default
          });

          current = current.evolves_to[0];
        }
      } catch (error) {
        console.error('Error fetching evolution chain:', error);
      }
    };

    // Map to get the background color based on Pokémon type
    const typeColorMap: Record<string, string> = {
      grass: '#78C850',
      fire: '#F08030',
      water: '#6890F0',
      bug: '#A8B820',
      normal: '#A8A878',
      poison: '#A040A0',
      electric: '#F8D030',
      ground: '#E0C068',
      fairy: '#EE99AC',
      fighting: '#C03028',
      psychic: '#F85888',
      rock: '#B8A038',
      ghost: '#705898',
      ice: '#98D8D8',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      flying: '#A890F0'
    };

    // Compute the background color based on the first Pokémon type
    const typeColor = computed(() => {
      if (!pokemon.value || !pokemon.value.types.length) return '#FFFFFF';
      return typeColorMap[pokemon.value.types[0].type.name] || '#FFFFFF';
    });

    // Compute the class for each type for consistent styling
    const typeClass = (type: string) => {
      const baseClass = 'text-white px-2 py-1 m-1 rounded';
      switch (type) {
        case 'grass':
          return `${baseClass} bg-green-500`;
        case 'fire':
          return `${baseClass} bg-red-500`;
        case 'water':
          return `${baseClass} bg-blue-500`;
        case 'bug':
          return `${baseClass} bg-green-700`;
        case 'normal':
          return `${baseClass} bg-gray-400`;
        case 'poison':
          return `${baseClass} bg-purple-500`;
        case 'electric':
          return `${baseClass} bg-yellow-500`;
        case 'ground':
          return `${baseClass} bg-yellow-700`;
        case 'fairy':
          return `${baseClass} bg-pink-500`;
        case 'fighting':
          return `${baseClass} bg-red-700`;
        case 'psychic':
          return `${baseClass} bg-pink-700`;
        case 'rock':
          return `${baseClass} bg-yellow-800`;
        case 'ghost':
          return `${baseClass} bg-purple-700`;
        case 'ice':
          return `${baseClass} bg-blue-200`;
        case 'dragon':
          return `${baseClass} bg-indigo-700`;
        case 'dark':
          return `${baseClass} bg-gray-800`;
        case 'steel':
          return `${baseClass} bg-gray-500`;
        case 'flying':
          return `${baseClass} bg-blue-300`;
        default:
          return `${baseClass} bg-gray-500`;
      }
    };

    // Watch for changes in the selected Pokémon name and fetch details when it changes
    watch(() => props.selectedPokemonName, (newName) => {
      if (newName) {
        console.log('New selected Pokemon:', newName); // Log the selected Pokemon name
        fetchPokemonDetails(newName);
      }
    });

    return { pokemon, isLoading, evolutions, typeColor, typeClass };
  }
});
</script>