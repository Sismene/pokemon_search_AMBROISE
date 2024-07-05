<template>
  <ul :class="customClass" class="mt-4">
    <li
        v-for="pokemon in filteredPokemon"
        :key="pokemon.name"
        class="cursor-pointer p-2 hover:bg-gray-200"
        @click="$emit('select', pokemon.name)"
    >
      {{ pokemon.name }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';

interface Pokemon {
  name: string;
  url: string;
}

export default defineComponent({
  name: 'PokemonList',
  props: {
    query: {
      type: String,
      required: true
    },
    pokemonList: {
      type: Array as PropType<Pokemon[]>,
      required: true
    },
    customClass: {
      type: String,
      default: ''
    }
  },
  emits: ['select'],
  setup(props) {
    const filteredPokemon = computed(() => {
      return props.pokemonList.filter((pokemon: Pokemon) =>
          pokemon.name.toLowerCase().includes(props.query.toLowerCase())
      );
    });

    return { filteredPokemon };
  }
});
</script>