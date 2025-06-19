import { useAnimals } from '../hooks/useAnimals';
import { useState, useEffect } from 'react';
import type { Animal } from '../reducers/animalReducer';
import AnimalDetailModal from '../components/AnimalDetailModal';
import { useAnimalContext } from '../context/AnimalContext';

const AnimalList = () => {
  const { animals, loading, error } = useAnimals();
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const { dispatch } = useAnimalContext();
  const [timeLeft, setTimeLeft] = useState<{ [id: string]: string }>({});
  const [searchTerm, setSearchTerm] = useState('');

  const handleFeed = (id: string, time: string) => {
    dispatch({ type: 'FEED_ANIMAL', payload: { id, time } });
    if (selectedAnimal && selectedAnimal.id === id) {
      setSelectedAnimal({ ...selectedAnimal, lastFed: time });
    }
  };

  const getStatus = (lastFed: string) => {
    const hours = (Date.now() - new Date(lastFed).getTime()) / (1000 * 60 * 60);
    if (hours >= 5) return { label: 'Behöver mat NU', color: 'red', pulse: true };
    if (hours >= 3) return { label: 'Börjar bli hungrig', color: 'orange', warning: true };
    return { label: 'Mätt och nöjd', color: 'green', full: true };
  };

  const isValidAnimal = (animal: Animal) => {
    return animal.name !== 'Kontakt' && animal.imageUrl && !animal.imageUrl.includes('vite.svg');
  };

  const visibleAnimals = animals.filter(isValidAnimal);

  const filteredAnimals = visibleAnimals.filter(animal => {
    const status = getStatus(animal.lastFed).label.toLowerCase();
    const name = animal.name.toLowerCase();
    const search = searchTerm.toLowerCase();
    return name.includes(search) || status.includes(search);
  });

  useEffect(() => {
    const updateTimers = () => {
      const newTimes: { [id: string]: string } = {};
      visibleAnimals.forEach(animal => {
        const msLeft = 4 * 60 * 60 * 1000 - (Date.now() - new Date(animal.lastFed).getTime());
        const clamped = Math.max(msLeft, 0);
        const h = Math.floor(clamped / 3600000).toString().padStart(2, '0');
        const m = Math.floor((clamped % 3600000) / 60000).toString().padStart(2, '0');
        const s = Math.floor((clamped % 60000) / 1000).toString().padStart(2, '0');
        newTimes[animal.id] = `${h}:${m}:${s}`;
      });
      setTimeLeft(newTimes);
    };

    updateTimers();
    const interval = setInterval(updateTimers, 1000);
    return () => clearInterval(interval);
  }, [visibleAnimals]);

  if (loading) return <p>Laddar djur...</p>;
  if (error) return <p>Fel: {error}</p>;

  return (
    <section>
      <input
        type="text"
        placeholder="Sök efter djur eller matstatus..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          marginBottom: '1.5rem',
          borderRadius: '8px',
          border: '2px solid #ccc',
          width: '100%',
          maxWidth: '500px',
          display: 'block',
          marginInline: 'auto'
        }}
      />

      <div className="animal-grid">
        {filteredAnimals.map(animal => {
          const status = getStatus(animal.lastFed);
          return (
            <div
              key={animal.id}
              className={`animal-card ${status.pulse ? 'hungry' : ''} ${status.full ? 'full' : ''} ${status.warning ? 'warning' : ''}`}
              onClick={() => setSelectedAnimal(animal)}
              style={{ cursor: 'pointer' }}
            >
              <div className="animal-status" style={{ color: status.color }}>
                {status.label}
              </div>
              <img
                src={animal.imageUrl}
                alt={animal.name}
                onError={(e) => (e.currentTarget.src = '/fallback-animal.png')}
              />
              <div className="timer">
                {timeLeft[animal.id]}
              </div>
              <div className="info">
                <h3>{animal.name}</h3>
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
