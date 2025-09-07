import { useState } from 'react';
import { shortAddress } from './shortAddress';

export default function PetraConnect({ onConnect }) {
  const [address, setAddress] = useState('');

  const connectPetra = async () => {
    if (window.aptos) {
      try {
        const response = await window.aptos.connect();
        setAddress(response.address);
  if (onConnect) onConnect(response.address);
      } catch (err) {
        alert('Petra connection failed');
      }
    } else {
      alert('Petra wallet not found');
    }
  };

  return (
    <button
      style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0.75rem 1rem', borderRadius: 8, border: '1px solid #eee', background: '#fff', cursor: 'pointer', width: '100%', fontWeight: 600 }}
      onClick={connectPetra}
    >
      <img src="/icons/petra.svg" alt="Petra" style={{ width: 28, height: 28 }} />
      <span>{address ? shortAddress(address) : 'Connect Petra'}</span>
    </button>
  );
}
