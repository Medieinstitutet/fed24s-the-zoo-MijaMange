import { useEffect, useState } from 'react';
import { useAnimalContext } from '../context/AnimalContext';
import type { Animal } from '../reducers/animalReducer';


export const useAnimals = () => {
  const { state, dispatch } = useAnimalContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimals = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://animals.azurewebsites.net/api/animals');
        if (!res.ok) throw new Error('Kunde inte hämta djur');
        const data: Animal[] = await res.json();
        dispatch({ type: 'SET_ANIMALS', payload: data });
        setError(null);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    // Endast om vi inte redan har data
    if (state.animals.length === 0) {
      fetchAnimals();
    }
  }, [dispatch, state.animals.length]);

  return { animals: state.animals, loading, error };
};
