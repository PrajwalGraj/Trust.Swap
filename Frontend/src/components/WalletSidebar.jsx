import React from "react";
import MetamaskConnect from "./MetamaskConnect";
import PetraConnect from "./PetraConnect";
import PhantomConnect from "./PhantomConnect";
import OKXConnect from "./OKXConnect";

export default function WalletSidebar({ open, onClose, onPetraConnect }) {
  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: open ? 0 : '-320px',
          height: '100%',
          width: '320px',
          background: '#fff',
          boxShadow: '0 0 16px rgba(0,0,0,0.08)',
          zIndex: 50,
          borderLeft: '1px solid #eee',
          transition: 'right 0.3s'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottom: '1px solid #eee' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>Select Wallet</h2>
          <button onClick={onClose} style={{ color: '#888', fontSize: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>&times;</button>
        </div>
        <div style={{ padding: 16, background: '#fee', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <MetamaskConnect />
          <PetraConnect onConnect={onPetraConnect} />
          <PhantomConnect />
          <OKXConnect />
        </div>
      </div>
      {open && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 40 }}
          onClick={onClose}
        />
      )}
    </>
  );
}
