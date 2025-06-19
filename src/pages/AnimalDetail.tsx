import { useParams, useNavigate } from 'react-router-dom';
import { useAnimalContext } from '../context/AnimalContext';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AnimalDetailModal from '../components/AnimalDetailModal';
import type { Animal } from '../reducers/animalReducer';

const AnimalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useAnimalContext();
  const [animal, setAnimal] = useState<Animal | undefined>(undefined);
  const [canFeed, setCanFeed] = useState(false);
  const [warning, setWarning] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const found = state.animals.find(a => a.id === id);
    setAnimal(found);
  }, [state.animals, id]);

  useEffect(() => {
    if (!animal) return;

    const updateStatus = () => {
      const lastFed = new Date(animal.lastFed);
      const now = new Date();
      const diffHours = (now.getTime() - lastFed.getTime()) / (1000 * 60 * 60);

      if (diffHours >= 4) {
        setCanFeed(true);
        setWarning('');
      } else if (diffHours >= 3) {
        setCanFeed(false);
        setWarning('⚠️ Djuret börjar bli hungrigt!');
      } else {
        setCanFeed(false);
        setWarning('');
      }
    };

    updateStatus();
    const interval = setInterval(updateStatus, 60000);
    return () => clearInterval(interval);
  }, [animal]);

  const handleFeed = () => {
    if (!animal) return;
    const now = new Date().toISOString();
    dispatch({ type: 'FEED_ANIMAL', payload: { id: animal.id, time: now } });
    setCanFeed(false);
    setWarning('');
    toast.success(`${animal.name} har matats 🐾`);
  };

  if (!animal) {
    return (
      <section className="fade-in">
        <p>Djur hittades inte.</p>
        <button onClick={() => navigate(-1)}>Tillbaka</button>
      </section>
    );
  }

  return (
    <section className="fade-in">
      <h2>{animal.name}</h2>
      <img
        src={animal.imageUrl}
        alt={animal.name}
        onClick={() => setShowModal(true)}
        style={{ maxWidth: '300px', cursor: 'pointer' }}
        onError={(e) => (e.currentTarget.src = '/vite.svg')}
      />
      <p>{animal.description}</p>
      <p>Senast matad: {new Date(animal.lastFed).toLocaleString()}</p>
      {warning && <p style={{ color: 'orange' }}>{warning}</p>}
      <button onClick={handleFeed} disabled={!canFeed}>
        {canFeed ? 'Mata djuret 🐾' : 'Går ej att mata ännu'}
      </button>

      {showModal && (
        <AnimalDetailModal
          animal={animal}
          onClose={() => setShowModal(false)}
          onFeed={handleFeed}
          canFeed={canFeed}
          warning={warning}
        />
      )}
    </section>
  );
};

export default AnimalDetail;
