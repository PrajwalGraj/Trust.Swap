import { useState } from 'react';
import { ethers } from 'ethers';
import { shortAddress } from './shortAddress';

export default function MetamaskConnect({ onConnect }) {
  const [address, setAddress] = useState('');

  const connectMetamask = async () => {
    const ethereum = window.ethereum;
    if (ethereum && ethereum.isMetaMask && !(ethereum.isPhantom)) {
      try {
        const provider = new ethers.BrowserProvider(ethereum);
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        setAddress(accounts[0]);
        if (onConnect) onConnect(accounts[0]);
      } catch (err) {
        alert('Metamask connection failed');
      }
    } else {
      alert('Metamask not found or Phantom is active. Please disable Phantom and use Metamask.');
    }
  };

  return (
    <button
      style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0.75rem 1rem', borderRadius: 8, border: '1px solid #eee', background: '#fff', cursor: 'pointer', width: '100%', fontWeight: 600 }}
      onClick={connectMetamask}
    >
      <img src="/icons/metamask.svg" alt="Metamask" style={{ width: 28, height: 28 }} />
      <span>{address ? shortAddress(address) : 'Connect Metamask'}</span>
    </button>
  );
}
