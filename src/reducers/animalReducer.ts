// Typ för ett djur
export interface Animal {
    id: string;
    name: string;
    shortDescription: string;
    description: string;
    imageUrl: string;
    lastFed: string;
  }
  
  // State-typ
  export type AnimalState = {
    animals: Animal[];
  };
  
  // Möjliga actions
  export type AnimalAction =
    | { type: 'SET_ANIMALS'; payload: Animal[] }
    | { type: 'FEED_ANIMAL'; payload: { id: string; time: string } };
  
  // Reducerfunktion
  export const animalReducer = (
    state: AnimalState,
    action: AnimalAction
  ): AnimalState => {
    let updated: Animal[];
  
    switch (action.type) {
      case 'SET_ANIMALS':
        updated = action.payload;
        break;
  
      case 'FEED_ANIMAL':
        updated = state.animals.map(animal =>
          animal.id === action.payload.id
            ? { ...animal, lastFed: action.payload.time }
            : animal
        );
        break;
  
      default:
        return state;
    }
  
    localStorage.setItem('zoo_animals', JSON.stringify(updated));
    return { ...state, animals: updated };
  };
  