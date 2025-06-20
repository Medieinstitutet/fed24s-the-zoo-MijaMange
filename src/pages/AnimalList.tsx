import { useAnimals } from '../hooks/useAnimals';
import { useState, useEffect, useMemo } from 'react';
import type { Animal } from '../reducers/animalReducer';
import AnimalDetailModal from '../components/AnimalDetailModal';
import { useAnimalContext } from '../context/AnimalContext';

type FilterStatus = 'all' | 'hungry' | 'full';

const AnimalList = () => {
  const { animals, loading, error } = useAnimals();
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const { dispatch } = useAnimalContext();
  const [timeLeft, setTimeLeft] = useState<{ [id: string]: string }>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

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

  // Memoisera filtered array för att undvika onödiga re-render och oändliga loops
  const visibleAnimals = useMemo(() => animals.filter(isValidAnimal), [animals]);

  const filteredAnimals = useMemo(() => {
    return visibleAnimals.filter(animal => {
      const status = getStatus(animal.lastFed).label.toLowerCase();
      const name = animal.name.toLowerCase();
      const search = searchTerm.toLowerCase();

      const matchesSearch = name.includes(search) || status.includes(search);

      if (filterStatus === 'hungry') {
        return matchesSearch && status === 'behöver mat nu';
      } else if (filterStatus === 'full') {
        return matchesSearch && status === 'mätt och nöjd';
      }

      return matchesSearch; // all
    });
  }, [visibleAnimals, searchTerm, filterStatus]);

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
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <button
          onClick={() => setFilterStatus('all')}
          style={{
            backgroundColor: filterStatus === 'all' ? '#4a90e2' : '#ddd',
            color: filterStatus === 'all' ? 'white' : '#333',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Visa alla djur
        </button>
        <button
          onClick={() => setFilterStatus('hungry')}
          style={{
            backgroundColor: filterStatus === 'hungry' ? '#cc4444' : '#f9d6d6',
            color: filterStatus === 'hungry' ? 'white' : '#cc4444',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Visa djur som behöver mat NU
        </button>
        <button
          onClick={() => setFilterStatus('full')}
          style={{
            backgroundColor: filterStatus === 'full' ? '#44aa44' : '#d6f9d6',
            color: filterStatus === 'full' ? 'white' : '#44aa44',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Visa mätta och nöjda djur
        </button>
      </div>

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
