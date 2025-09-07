import { useState } from 'react';
import { shortAddress } from './shortAddress';

export default function PhantomConnect({ onConnect }) {
  const [address, setAddress] = useState('');

  const connectPhantom = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        const resp = await window.solana.connect();
        const pubKey = resp.publicKey?.toString() || '';
        setAddress(pubKey);
        if (onConnect) onConnect(pubKey);
      } catch (err) {
        alert('Phantom connection failed');
      }
    } else {
      alert('Phantom wallet not found');
    }
  };

  return (
    <button
      style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0.75rem 1rem', borderRadius: 8, border: '1px solid #eee', background: '#fff', cursor: 'pointer', width: '100%', fontWeight: 600 }}
      onClick={connectPhantom}
    >
      <img src="/icons/phantom.svg" alt="Phantom" style={{ width: 28, height: 28 }} />
      <span>{address ? shortAddress(address) : 'Connect Phantom'}</span>
    </button>
  );
}
