import { useState, useEffect } from 'react';
import AnimalDetailModal from './AnimalDetailModal';
import type { Animal } from '../reducers/animalReducer';
import './AnimalCard.css';

interface Props {
  animal: Animal;
  onFeed?: (id: string) => void;
}

const getStatus = (lastFed: string) => {
  const hours = (Date.now() - new Date(lastFed).getTime()) / 3600000;
  if (hours >= 5) return { label: '🐾 Behöver mat NU', color: 'red' };
  if (hours >= 3) return { label: '⚠️ Börjar bli hungrig', color: 'orange' };
  return { label: '✅ Mätt och nöjd', color: 'green' };
};

const AnimalCard = ({ animal, onFeed }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [canFeed, setCanFeed] = useState(false);
  const [warning, setWarning] = useState('');

  useEffect(() => {
    const updateFeedStatus = () => {
      const hours = (Date.now() - new Date(animal.lastFed).getTime()) / 3600000;
      if (hours >= 4) {
        setCanFeed(true);
        setWarning('');
      } else if (hours >= 3) {
        setCanFeed(false);
        setWarning('⚠️ Djuret börjar bli hungrigt!');
      } else {
        setCanFeed(false);
        setWarning('');
      }
    };

    updateFeedStatus();
    const interval = setInterval(updateFeedStatus, 60000);
    return () => clearInterval(interval);
  }, [animal.lastFed]);

  const handleFeed = () => {
    if (onFeed) onFeed(animal.id);
    setCanFeed(false);
    setWarning('');
  };

  const status = getStatus(animal.lastFed);

  const cardClass =
    status.color === 'red'
      ? 'animal-card hungry'
      : status.color === 'orange'
      ? 'animal-card warning'
      : 'animal-card full';

  return (
    <>
      <div className={cardClass} onClick={() => setShowModal(true)}>
        <img
          src={animal.imageUrl}
          alt={animal.name}
          onError={(e) => (e.currentTarget.src = '/vite.svg')}
        />
        <div className="info">
          <h3>{animal.name}</h3>
          <p>{animal.shortDescription}</p>
          <span className={`status ${status.color}`}>{status.label}</span>
        </div>
      </div>

      {showModal && (
        <AnimalDetailModal
          animal={animal}
          onClose={() => setShowModal(false)}
          onFeed={handleFeed}
          canFeed={canFeed}
          warning={warning}
        />
      )}
    </>
  );
};

export default AnimalCard;
