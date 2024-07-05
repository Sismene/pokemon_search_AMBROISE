<template>
  <div class="container mx-auto p-4 relative">
    <h1 class="text-2xl font-bold mb-4">Pokemon Search</h1>
    <!-- SearchBar component with v-model for two-way data binding on query -->
    <SearchBar v-model:query="query" @select-first="selectFirstPokemon" />
    <!-- PokemonList component displayed only if query is not empty -->
    <PokemonList
        v-if="query"
        :query="query"
        :pokemonList="pokemonList"
        @select="selectPokemon"
        class="absolute top-20 w-full z-10 bg-white shadow-lg rounded-lg"
    />
    <!-- PokemonDetail component to show selected Pokemon details -->
    <PokemonDetail :selectedPokemonName="selectedPokemonName" class="relative z-0" />
  </div>
  <footer class="text-center p-4">
    Made with
    <i class="zmdi zmdi-favorite"></i>
    by Théo
  </footer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import pokemonData from '../assets/pokemon.json';
import SearchBar from './SearchBar.vue';
import PokemonList from './PokemonList.vue';
import PokemonDetail from './PokemonDetail.vue';

export default defineComponent({
  name: 'SearchAndDetail',
  components: {
    SearchBar,
    PokemonList,
    PokemonDetail
  },
  setup() {
    // State variables
    const query = ref<string>('');
    const pokemonList = ref<Array<{ name: string, url: string }>>(pokemonData.results);
    const selectedPokemonName = ref<string | null>(null);

    // Function to select a Pokemon and clear the search query
    const selectPokemon = (name: string) => {
      console.log('Selecting Pokemon:', name); // Log the selection
      selectedPokemonName.value = name;
      query.value = '';  // Clear the search query to hide the list
    };

    // Function to select the first Pokemon in the filtered list
    const selectFirstPokemon = () => {
      const firstPokemon = pokemonList.value.find((pokemon) =>
          pokemon.name.toLowerCase().includes(query.value.toLowerCase())
      );
      if (firstPokemon) {
        selectPokemon(firstPokemon.name);
      }
    };

    return { query, pokemonList, selectedPokemonName, selectPokemon, selectFirstPokemon };
  },
});
</script>