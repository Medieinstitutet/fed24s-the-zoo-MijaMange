import { useAnimals } from '../hooks/useAnimals';
import { useState, useEffect } from 'react';
import type { Animal } from '../reducers/animalReducer';
import AnimalDetailModal from '../components/AnimalDetailModal';
import { useAnimalContext } from '../context/AnimalContext';

const AnimalList = () => {
  const { animals, loading, error } = useAnimals();
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const { dispatch } = useAnimalContext();
  const [hasHiddenAnimals, setHasHiddenAnimals] = useState(false);

  const handleFeed = (id: string, time: string) => {
    dispatch({ type: 'FEED_ANIMAL', payload: { id, time } });
    if (selectedAnimal && selectedAnimal.id === id) {
      setSelectedAnimal({ ...selectedAnimal, lastFed: time });
    }
  };

  const getStatus = (lastFed: string) => {
    const hours = (Date.now() - new Date(lastFed).getTime()) / (1000 * 60 * 60);
    if (hours >= 5) return { label: '🔴 Behöver mat NU', color: 'red', pulse: true };
    if (hours >= 3) return { label: '🟠 Börjar bli hungrig', color: 'orange' };
    return { label: '🟢 Mätt och nöjd', color: 'green' };
  };

  const getCountdown = (lastFed: string) => {
    const fedTime = new Date(lastFed).getTime();
    const nextFeed = fedTime + 4 * 60 * 60 * 1000;
    const diff = Math.max(0, nextFeed - Date.now());
    const hrs = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isValidAnimal = (animal: Animal) => {
    return animal.name !== 'Kontakt' && animal.imageUrl && !animal.imageUrl.includes('vite.svg');
  };

  const visibleAnimals = animals.filter(isValidAnimal);

  useEffect(() => {
    setHasHiddenAnimals(visibleAnimals.length < animals.length);
  }, [animals]);

  if (loading) return <p>Laddar djur...</p>;
  if (error) return <p>Fel: {error}</p>;

  return (
    <section>
      {/* <h2 className="lcd-font" style={{ textAlign: 'center' }}>Våra djur</h2> */}
      {hasHiddenAnimals && (
        <p style={{ textAlign: 'center', color: 'orange', fontFamily: 'Courier New' }}>
          Några ogiltiga djur har dolts från listan.
        </p>
      )}
      <div className="animal-grid">
        {visibleAnimals.map(animal => {
          const status = getStatus(animal.lastFed);
          const countdown = getCountdown(animal.lastFed);
          return (
            <div
              key={animal.id}
              className={`animal-card ${status.pulse ? 'hungry' : ''}`}
              onClick={() => setSelectedAnimal(animal)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={animal.imageUrl}
                alt={animal.name}
                onError={(e) => (e.currentTarget.src = '/fallback-animal.png')}
              />
              <div className="info">
                <h3 className="lcd-font">{animal.name}</h3>
                <p>{animal.shortDescription}</p>
                <span style={{ color: status.color }}>{status.label}</span>
                <div className="timer">{countdown}</div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedAnimal && (
        <AnimalDetailModal
          animal={selectedAnimal}
          onClose={() => setSelectedAnimal(null)}
          onFeed={handleFeed}
        />
      )}
    </section>
  );
};

export default AnimalList;
