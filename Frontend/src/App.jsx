// Helper to shorten address
function shortAddress(addr) {
  if (!addr) return '';
  return addr.slice(0, 6) + '...' + addr.slice(-4);
}
import { useState } from "react";
import './App.css';
import WalletSidebar from './components/WalletSidebar';
import Navbar from './components/Navbar';


const CHAINS = [
  { name: 'Ethereum', icon: '/icons/ethereum.svg' },
  { name: 'Aptos', icon: '/icons/aptos.svg' },
  { name: 'Solana', icon: '/icons/solana.svg' },
  { name: 'Polygon', icon: '/icons/polygon.svg' }
];

const TOKENS = [
  { name: 'USDC', icon: '/icons/usdc.svg' },
  { name: 'USDT', icon: '/icons/usdt.svg' },
  { name: 'ETH', icon: '/icons/eth.svg' },
  { name: 'APT', icon: '/icons/apt.svg' }
];
// Custom dropdown for icons
function IconDropdown({ options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const selected = options.find(opt => opt.name === value);
  return (
      <div style={{ position: 'relative', width: '100%', marginBottom: 12 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.5rem',
            borderRadius: 12,
            border: '2px solid #fbbf24', // orange border
            cursor: 'pointer',
            background: `linear-gradient(90deg, rgba(255,255,255,0.9) 60%, rgba(255,255,255,0.2) 100%), url(${selected.icon}) right/48px 48px no-repeat`,
            backgroundBlendMode: 'screen',
            minHeight: '64px', // double the height
            boxShadow: '0 2px 8px rgba(255,179,71,0.08)'
          }}
          onClick={() => setOpen(!open)}
        >
          <img src={selected.icon} alt={selected.name} style={{ width: 32, height: 32, marginRight: 12 }} />
          <span style={{ fontWeight: 600, color: '#b45309', fontSize: '1.1rem' }}>{selected.name}</span>
          {/* No dropdown arrow for cleaner look */}
        </div>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff',
          border: '1px solid #ccc', borderRadius: 6, zIndex: 10
        }}>
          {options.map(opt => (
            <div
              key={opt.name}
              style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', cursor: 'pointer' }}
              onClick={() => { onChange(opt.name); setOpen(false); }}
            >
              <img src={opt.icon} alt={opt.name} style={{ width: 24, height: 24, marginRight: 8 }} />
              <span>{opt.name}</span>
            </div>
          ))}
        </div>  
      )}
    </div>
  );
}


function App() {
  const [fromChain, setFromChain] = useState('Ethereum');
  const [toChain, setToChain] = useState('Aptos');
  const [amount, setAmount] = useState('1');
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState('USDC');

  const handleSwap = e => {
    e.preventDefault();
    // Implement swap logic here (e.g., send to backend)
    alert('Swap Initiated!');
  };

  return (
    <>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',background: 'linear-gradient(135deg, #fefefeff 30%, #ffddacff 100%)', position: 'relative' }}>
          
        <div style={{ position: 'fixed', top: 32, left: 32, zIndex: 1000 }}>
            <Navbar/>
        </div>
      {!sidebarOpen && (
        <button
          style={{
            position: 'fixed',
            top: 32,
            right: 180,
            zIndex: 1001,
            padding: '0.5rem 1rem',
            borderRadius: 8,
            background: '#0a143c',
            color: '#fff',
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer'
          }}
          onClick={() => setSidebarOpen(true)}
        >
              {fromAddress ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <img src="/icons/petra.svg" alt="Petra" style={{ width: 24, height: 24 }} />
                  {shortAddress(fromAddress)}
                </span>
              ) : 'Open Wallet'}
        </button>
      )}
  <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontWeight: 700, fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>Cross-Chain Token Swap</h1>
      <form 
        onSubmit={handleSwap}
        style={{
          background: 'linear-gradient(135deg, #fffbe6 0%, #ffe5b4 50%, #ffb347 100%)',
          borderRadius: '20px',
          boxShadow: '0 4px 32px rgba(30,36,56,0.08)',
          padding: '2.5rem 2rem',
          minWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Inter, Segoe UI, Arial, sans-serif'
        }}
      >
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>Initiate a Swap</h2>
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 500, display: 'block', marginBottom: 8 }}>From:</label>
            <IconDropdown options={CHAINS} value={fromChain} onChange={setFromChain} />
            <IconDropdown options={TOKENS} value={selectedToken} onChange={setSelectedToken} />
            <input
              type="text"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              style={{ width: '100%', marginTop: '1rem', padding: '0.5rem', borderRadius: 6, border: '1px solid #ccc' }}
            />

            <label style={{ display: 'block', marginTop: 16, marginBottom: 6, fontWeight: 500 }}>Source Address</label>
            <input 
              type="text"
              value={fromAddress}
              style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #eee', background: '#f6f6f6' }}
              placeholder="Connect a Wallet"
              // readOnly
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 500, display: 'block', marginBottom: 8 }}>To:</label>
            <IconDropdown options={CHAINS.filter(chain => chain.name !== fromChain)} value={toChain} onChange={setToChain} />
            <IconDropdown options={TOKENS} value={selectedToken} onChange={setSelectedToken} />
            <input
              type="text"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              style={{ width: '100%', marginTop: '1rem', padding: '0.5rem', borderRadius: 6, border: '1px solid #ccc' }}
            />
            
            <label style={{ display: 'block', marginTop: 16, marginBottom: 6, fontWeight: 500 }}>Destination Address</label>
            <input 
              type="text"
              value={toAddress}
              onChange={e => setToAddress(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #eee', background: '#f6f6f6' }}
              placeholder="Enter Destination Address"
              // readOnly
            />
          </div>
        </div>
        <button type="submit" style={{
          width: '100%',
          padding: '1rem',
          border: 'none',
          borderRadius: 8,
          background: '#0a143c',
          color: '#fff',
          fontSize: '1rem',
          fontWeight: 700,
          cursor: 'pointer',
          marginTop: '0.5rem'
        }}>
          Swap Tokens
        </button>
      </form>
      {/* Move WalletSidebar to the top right corner */}
      <div style={{ position: 'fixed', top: 32, right: 32, zIndex: 1000 }}>
        <WalletSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} onPetraConnect={setFromAddress} />
      </div>
    </div>

    </>
  );
}

export default App;

