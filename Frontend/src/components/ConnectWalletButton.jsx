import React, { useState } from 'react';

// Logos (replace with actual image imports or URLs)
const logos = {
  metamask: 'https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg',
  phantom: 'https://raw.githubusercontent.com/solana-labs/solana-pay/main/assets/phantom-wallet.svg',
  petra: 'https://petra.app/icon.svg',
  okx: 'https://static.okx.com/cdn/wallet/logo/okx-wallet-icon.svg',
  unisat: 'https://unisat.io/favicon.ico',
};

const wallets = [
  {
    chain: 'EVM',
    items: [
      { name: 'MetaMask', logo: logos.metamask, key: 'metamask' },
    ],
  },
  {
    chain: 'Solana',
    items: [
      { name: 'Phantom', logo: logos.phantom, key: 'phantom' },
    ],
  },
  {
    chain: 'Aptos',
    items: [
      { name: 'Petra', logo: logos.petra, key: 'petra' },
    ],
  },
  {
    chain: 'Sui',
    items: [
      { name: 'OKX Wallet', logo: logos.okx, key: 'okx_sui' },
    ],
  },
  {
    chain: 'Tron',
    items: [
      { name: 'OKX Wallet', logo: logos.okx, key: 'okx_tron' },
    ],
  },
  {
    chain: 'Bitcoin',
    items: [
      { name: 'UniSat', logo: logos.unisat, key: 'unisat' },
    ],
  },
];

const ConnectWalletSidebar = ({ open, onClose, onConnect }) => (
  <div
    className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transition-transform duration-300 ${
      open ? 'translate-x-0' : 'translate-x-full'
    }`}
  >
    <div className="flex justify-between items-center p-4 border-b">
      <h2 className="text-lg font-bold">Connect Wallet</h2>
      <button onClick={onClose} className="text-gray-500 text-xl">&times;</button>
    </div>
    <div className="p-4 space-y-6">
      {wallets.map(group => (
        <div key={group.chain}>
          <h3 className="font-semibold mb-2">{group.chain}</h3>
          <div className="space-y-2">
            {group.items.map(wallet => (
              <div key={wallet.key} className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <img src={wallet.logo} alt={wallet.name} className="w-8 h-8" />
                  <span>{wallet.name}</span>
                </div>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => onConnect(wallet.key)}
                >
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function ConnectWalletButton() {
  const [open, setOpen] = useState(false);

  const handleConnect = walletKey => {
    // Stub: Add wallet connect logic for each walletKey
    alert(`Connect logic for ${walletKey} goes here.`);
    setOpen(false);
  };

  return (
    <>
      <button
        className="bg-blue-600 text-white px-5 py-2 rounded shadow"
        onClick={() => setOpen(true)}
      >
        Connect Wallet
      </button>
      <ConnectWalletSidebar
        open={open}
        onClose={() => setOpen(false)}
        onConnect={handleConnect}
      />
      {/* Optional: Overlay when sidebar is open */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
