<template>
  <div>
    <input
        v-model="internalQuery"
        type="text"
        placeholder="Search for a Pokemon"
        class="border p-2 mb-4 w-full"
        @input="updateQuery"
        @keydown.enter="selectFirstPokemon"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'SearchBar',
  props: {
    query: {
      type: String,
      required: true
    }
  },
  emits: ['update:query', 'select-first'],
  setup(props, { emit }) {
    const internalQuery = ref(props.query);

    // Watch for changes in the prop `query` and update `internalQuery` accordingly
    watch(() => props.query, (newQuery) => {
      internalQuery.value = newQuery;
    });

    // Emit the updated query value to the parent component
    const updateQuery = () => {
      emit('update:query', internalQuery.value);
    };

    // Emit an event to select the first Pokemon in the list
    const selectFirstPokemon = () => {
      emit('select-first');
    };

    return { internalQuery, updateQuery, selectFirstPokemon };
  }
});
</script>