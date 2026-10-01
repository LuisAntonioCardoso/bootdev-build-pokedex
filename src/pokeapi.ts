import { Cache } from "./pokecache.js"

export class PokeAPI {
  private static readonly baseURL = 'https://pokeapi.co/api/v2/';
  static #cache = new Cache(10000);

  constructor(){}

  async fetchLocations(pageURL?:string): Promise<ShallowLocations> { 
    const url = pageURL || `${PokeAPI.baseURL}/location-area/`;
    try {
      const cached:ShallowLocations|undefined = PokeAPI.#cache.get(url);
      if(cached)
        return cached;

      const response = await fetch(url);
      
      if (!response.ok)
        throw new Error(`${response.status} ${response.statusText}`);

      const data = await response.json();
      PokeAPI.#cache.add(url, data);
      return data;

    } catch (error) {
      throw new Error(`Error fetching locations: ${(error as Error).message}`)
    }
  }

  async fetchLocation(locationName:string): Promise<Location> { 
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    try {
      const cached:Location|undefined = PokeAPI.#cache.get(url);
      if(cached)
        return cached;

      const response = await fetch(url);
      
      if (!response.ok)
        throw new Error(`${response.status} ${response.statusText}`);

      const data = await response.json();
      PokeAPI.#cache.add(url, data);
      return data;

    } catch (error) {
      throw new Error(`Error fetching location ${locationName}: ${(error as Error).message}`)
    }
  }

  async fetchPokemon(pokemonName:string): Promise<Pokemon> { 
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
    try {
      const cached:Pokemon|undefined = PokeAPI.#cache.get(url);
      if(cached)
        return cached;

      const response = await fetch(url);
      
      if (!response.ok)
        throw new Error(`${response.status} ${response.statusText}`);

      const data = await response.json();
      PokeAPI.#cache.add(url, data);
      return data;

    } catch (error) {
      throw new Error(`Error fetching pokemon ${pokemonName}: ${(error as Error).message}`)
    }
  }
}

export type Pokemon = {
  id: number;
	name: string;
	base_experience: number;
	height: number;
	is_default: boolean;
	order: number;
	weight: number;
	abilities: {
		is_hidden: boolean;
		slot: number;
		ability: {
			name: string;
			url: string;
		};
	}[];
	forms: {
		name: string;
		url: string;
	}[];
	game_indices: {
		game_index: number;
		version: {
			name: string;
			url: string;
		};
	}[];
	held_items: {
		item: {
			name: string;
			url: string;
		};
		version_details: {
			rarity: number;
			version: {
				name: string;
				url: string;
			};
		}[];
	}[];
	location_area_encounters: string;
	moves: {
		move: {
			name: string;
			url: string;
		};
		version_group_details: {
			level_learned_at: number;
			version_group: {
				name: string;
				url: string;
			};
			move_learn_method: {
				name: string;
				url: string;
			};
			order: number;
		}[];
	}[];
	species: {
		name: string;
		url: string;
	};
  sprites: {
		back_default: string | null;
		back_female: string | null;
		back_shiny: string | null;
		back_shiny_female: string | null;
		front_default: string | null;
		front_female: string | null;
		front_shiny: string | null;
		front_shiny_female: string | null;
		other: {
			dream_world: {
				front_default: string | null;
				front_female: string | null;
			};
			home: {
				front_default: string | null;
				front_female: string | null;
				front_shiny: string | null;
				front_shiny_female: string | null;
			};
			"official-artwork": {
				front_default: string | null;
				front_shiny: string | null;
			};
			showdown: {
				back_default: string | null;
				back_female: string | null;
				back_shiny: string | null;
				back_shiny_female: string | null;
				front_default: string | null;
				front_female: string | null;
				front_shiny: string | null;
				front_shiny_female: string | null;
			};
		};
		versions: {
			"generation-i": {
				"red-blue": {
					back_default: string | null;
					back_gray: string | null;
					front_default: string | null;
					front_gray: string | null;
				};
				yellow: {
					back_default: string | null;
					back_gray: string | null;
					front_default: string | null;
					front_gray: string | null;
				};
			};
			"generation-ii": {
				crystal: {
					back_default: string | null;
					back_shiny: string | null;
					front_default: string | null;
					front_shiny: string | null;
				};
				gold: {
					back_default: string | null;
					back_shiny: string | null;
					front_default: string | null;
					front_shiny: string | null;
				};
				silver: {
					back_default: string | null;
					back_shiny: string | null;
					front_default: string | null;
					front_shiny: string | null;
				};
			};
			"generation-iii": {
				emerald: {
					front_default: string | null;
					front_shiny: string | null;
				};
				"firered-leafgreen": {
					back_default: string | null;
					back_shiny: string | null;
					front_default: string | null;
					front_shiny: string | null;
				};
				"ruby-sapphire": {
					back_default: string | null;
					back_shiny: string | null;
					front_default: string | null;
					front_shiny: string | null;
				};
			};
			"generation-iv": {
				"diamond-pearl": {
					back_default: string | null;
					back_female: string | null;
					back_shiny: string | null;
					back_shiny_female: string | null;
					front_default: string | null;
					front_female: string | null;
					front_shiny: string | null;
					front_shiny_female: string | null;
				};
				"heartgold-soulsilver": {
					back_default: string | null;
					back_female: string | null;
					back_shiny: string | null;
					back_shiny_female: string | null;
					front_default: string | null;
					front_female: string | null;
					front_shiny: string | null;
					front_shiny_female: string | null;
				};
				platinum: {
					back_default: string | null;
					back_female: string | null;
					back_shiny: string | null;
					back_shiny_female: string | null;
					front_default: string | null;
					front_female: string | null;
					front_shiny: string | null;
					front_shiny_female: string | null;
				};
			};
			"generation-v": {
				"black-white": {
					animated: {
						back_default: string | null;
						back_female: string | null;
						back_shiny: string | null;
						back_shiny_female: string | null;
						front_default: string | null;
						front_female: string | null;
						front_shiny: string | null;
						front_shiny_female: string | null;
					};
					back_default: string | null;
					back_female: string | null;
					back_shiny: string | null;
					back_shiny_female: string | null;
					front_default: string | null;
					front_female: string | null;
					front_shiny: string | null;
					front_shiny_female: string | null;
				};
			};
			"generation-vi": {
				"omegaruby-alphasapphire": {
					front_default: string | null;
					front_female: string | null;
					front_shiny: string | null;
					front_shiny_female: string | null;
				};
				"x-y": {
					front_default: string | null;
					front_female: string | null;
					front_shiny: string | null;
					front_shiny_female: string | null;
				};
			};
			"generation-vii": {
				icons: {
					front_default: string | null;
					front_female: string | null;
				};
				"ultra-sun-ultra-moon": {
					front_default: string | null;
					front_female: string | null;
					front_shiny: string | null;
					front_shiny_female: string | null;
				};
			};
			"generation-viii": {
				icons: {
					front_default: string | null;
					front_female: string | null;
				};
			};
		};
	};
	cries: {
		latest: string;
		legacy: string;
	};
	stats: {
		base_stat: number;
		effort: number;
		stat: {
			name: string;
			url: string;
		};
	}[];
	types: {
		slot: number;
		type: {
			name: string;
			url: string;
		};
	}[];
	past_types: {
		generation: {
			name: string;
			url: string;
		};
		types: {
			slot: number;
			type: {
				name: string;
				url: string;
			};
		}[];
	}[];
	past_abilities: {
		generation: {
			name: string;
			url: string;
		};
		abilities: {
			ability: {
				name: string;
				url: string;
			} | null;
			is_hidden: boolean;
			slot: number;
		}[];
	}[];
};

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};
