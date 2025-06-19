import { createContext, useContext, useReducer } from 'react';
import { animalReducer } from '../reducers/animalReducer';
import type { Animal, AnimalState, AnimalAction } from '../reducers/animalReducer';


// Hämta initialt djurdata från localStorage (eller tomt)
const getInitialAnimals = (): Animal[] => {
  const data = localStorage.getItem('zoo_animals');
  return data ? JSON.parse(data) : [];
};

// Första tillståndet för context
const initialState: AnimalState = {
  animals: getInitialAnimals()
};

// Definiera context-typ
interface AnimalContextProps {
  state: AnimalState;
  dispatch: React.Dispatch<AnimalAction>;
}

// Skapa context
const AnimalContext = createContext<AnimalContextProps | undefined>(undefined);

// Provider-komponenten
export const AnimalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(animalReducer, initialState);

  return (
    <AnimalContext.Provider value={{ state, dispatch }}>
      {children}
    </AnimalContext.Provider>
  );
};

// Custom hook
export const useAnimalContext = () => {
  const context = useContext(AnimalContext);
  if (!context) throw new Error('useAnimalContext must be used within AnimalProvider');
  return context;
};
