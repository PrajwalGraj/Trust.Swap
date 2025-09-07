import { useState } from 'react';
import { shortAddress } from './shortAddress';

export default function OKXConnect({ onConnect }) {
  const [address, setAddress] = useState('');

  const connectOKX = async () => {
    if (window.okxwallet && window.okxwallet.isOKXWallet) {
      try {
        const accounts = await window.okxwallet.request({ method: 'eth_requestAccounts' });
        setAddress(accounts[0]);
        if (onConnect) onConnect(accounts[0]);
      } catch (err) {
        alert('OKX Wallet connection failed');
      }
    } else {
      alert('OKX Wallet not found');
    }
  };

  return (
    <button
      style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0.75rem 1rem', borderRadius: 8, border: '1px solid #eee', background: '#fff', cursor: 'pointer', width: '100%', fontWeight: 600 }}
      onClick={connectOKX}
    >
      <img src="/icons/okx.svg" alt="OKX" style={{ width: 28, height: 28 }} />
      <span>{address ? shortAddress(address) : 'Connect OKX'}</span>
    </button>
  );
}
