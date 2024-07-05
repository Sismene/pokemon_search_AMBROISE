import { ref, computed, watch } from 'vue';

export function usePokemonDetails(props: { selectedPokemonName: string | null }) {
    const pokemon = ref<any>(null);
    const isLoading = ref<boolean>(false);
    const evolutions = ref<Array<{ name: string, image: string }>>([]);

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
            pokemon.value = data;

            await fetchEvolutionChain(data.species.url);
        } catch (error) {
            console.error('Error fetching Pokémon details:', error);
        } finally {
            isLoading.value = false;
        }
    };

    const fetchEvolutionChain = async (speciesUrl: string) => {
        try {
            const speciesResponse = await fetch(speciesUrl);
            const speciesData = await speciesResponse.json();
            const evolutionResponse = await fetch(speciesData.evolution_chain.url);
            const evolutionData = await evolutionResponse.json();

            const chain = evolutionData.chain;

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

    const selectEvolution = (name: string) => {
        fetchPokemonDetails(name);
    };

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

    const typeColor = computed(() => {
        if (!pokemon.value || !pokemon.value.types.length) return '#FFFFFF';
        return typeColorMap[pokemon.value.types[0].type.name] || '#FFFFFF';
    });

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

    watch(() => props.selectedPokemonName, (newName) => {
        if (newName) {
            fetchPokemonDetails(newName);
        }
    });

    return { pokemon, isLoading, evolutions, typeColor, typeClass, selectEvolution };
}