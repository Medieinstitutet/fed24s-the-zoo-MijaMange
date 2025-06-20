import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import type { Animal } from '../reducers/animalReducer';

interface Props {
  animal: Animal;
  onClose: () => void;
  onFeed: (id: string, time: string) => void;
}

const AnimalDetailModal = ({ animal, onClose, onFeed }: Props) => {
  const [canFeed, setCanFeed] = useState(false);
  const [warning, setWarning] = useState('');
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateStatus = () => {
      const lastFed = new Date(animal.lastFed);
      const now = new Date();
      const hours = (now.getTime() - lastFed.getTime()) / (1000 * 60 * 60);

      const nextFeedingTime = new Date(lastFed.getTime() + 4 * 60 * 60 * 1000);
      const timeRemaining = nextFeedingTime.getTime() - now.getTime();

      if (hours >= 4) {
        setCanFeed(true);
        setWarning('');
        setTimeLeft('');
      } else {
        setCanFeed(false);
        const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
        const hoursLeft = Math.floor(timeRemaining / 1000 / 60 / 60);
        setTimeLeft(`${hoursLeft}h ${minutes}m`);
        if (hours >= 3) {
          setWarning('⚠️ Djuret börjar bli hungrigt!');
        } else {
          setWarning('');
        }
      }
    };

    updateStatus();
    const interval = setInterval(updateStatus, 60000);
    return () => clearInterval(interval);
  }, [animal]);

  const handleFeedClick = () => {
    const now = new Date().toISOString();
    onFeed(animal.id, now);
    setCanFeed(false);
    setWarning('');
    setTimeLeft('');

    toast.success(`${animal.name} har matats 🐾`);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>{animal.name}</h2>

        <img
          src={animal.imageUrl}
          alt={animal.name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/fallback-animal.png';
          }}
          style={{
            width: '100%',
            maxHeight: '300px',
            objectFit: 'contain',
            marginBottom: '1rem',
          }}
        />

        <p>{animal.description || animal.shortDescription}</p>
        <p>Senast matad: {new Date(animal.lastFed).toLocaleString()}</p>
        {warning && <p style={{ color: 'orange' }}>{warning}</p>}
        {!canFeed && timeLeft && (
          <p style={{ fontFamily: 'Courier New, monospace', color: '#555' }}>
            Nästa matning möjlig om: <strong>{timeLeft}</strong>
          </p>
        )}
        <button onClick={handleFeedClick} disabled={!canFeed}>
          {canFeed ? 'Mata djuret 🐾' : 'Går ej att mata ännu'}
        </button>
      </div>
    </div>
  );
};

export default AnimalDetailModal;
