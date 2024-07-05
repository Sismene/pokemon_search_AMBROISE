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
            <div v-for="evolution in evolutions" :key="evolution.name" class="text-center cursor-pointer" @click="selectEvolution(evolution.name)">
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

<script setup lang="ts">
import { usePokemonDetails } from '@/composables/usePokemonDetails';
import { defineProps } from 'vue';

const props = defineProps<{ selectedPokemonName: string | null }>();

const { pokemon, isLoading, evolutions, typeColor, typeClass, selectEvolution } = usePokemonDetails(props);
</script>