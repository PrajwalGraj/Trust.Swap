# Trust.Swap
## Cross-Chain Native Token Swap Platform

## 🚀 Overview
A trustless, fast, and seamless platform for swapping native tokens (ETH, APT, SOL, etc.) across blockchains—no wrapped assets, no centralized relayers.

## 🎯 Goal
Enable users to transfer real native tokens between chains using Hash Time-Locked Contracts (HTLC) and a Liquidity Provider (LP) model. No middlemen, no fake tokens, no risk.

## How It Works
1. **User Initiates Swap:**
   - Locks tokens on the source chain using HTLC (hashlock + timelock).
2. **LP Provides Liquidity:**
   - LP locks equivalent tokens on the destination chain with the same hashlock.
3. **Atomic Claim:**
   - User reveals the secret to claim destination tokens.
   - LP uses the secret to claim source tokens.
  
<img width="1430" height="848" alt="Screenshot 2025-09-07 at 1 23 26 PM" src="https://github.com/user-attachments/assets/d8312da2-986b-4ab2-9e45-6265f8d629e3" />

<img width="1430" height="848" alt="Screenshot 2025-09-07 at 1 22 58 PM" src="https://github.com/user-attachments/assets/84b85150-7f40-4a34-8c7a-7029fd564362" />


**Guarantee:** Either both transfers succeed, or both fail—fully atomic and trustless.

## Key Features
- **Native token swaps:** No wrapped assets, no relayers.
- **Instant swaps:** As long as LP liquidity exists.
- **Trust-minimized:** HTLC ensures security for both parties.
- **LP model:** LPs earn fees for providing liquidity.
- **Fallback options:** P2P swaps or pooled liquidity if no LP is available.

## Problems Solved
- Centralized bridges are slow/risky.
- No dependence on relayers/oracles.
- Users get real tokens, not wrapped.
- LP model solves UX issues when liquidity is low.

## Example Workflow: ETH → Aptos
1. **Alice requests swap:** Source = Ethereum, Destination = Aptos, Token = ETH, Amount = 1 ETH.
2. **LP locks tokens:** LP locks 1 ETH on Aptos and 1 ETH on Ethereum using HTLC.
3. **Atomic claim:** Alice claims 1 ETH on Aptos by revealing the secret. LP claims 1 ETH on Ethereum.
4. **Result:** Alice gets native ETH on Aptos. LP earns a fee. No middleman.

## Analogy
Like giving cash to a courier in New York, who instantly delivers real ETH in Paris. Later, the courier claims the NY cash—no fake money, no cheating, fully atomic.

## Tech Stack
- **Smart Contracts:** Move (Aptos), Solidity (Ethereum)
- **Frontend:** React, Aptos Wallet Adapter
- **Backend/CLI:** Aptos CLI, custom scripts

## Demo Steps
1. Connect wallet (Petra/Aptos).
2. Initiate a swap or demo transfer.
3. Sign transaction in wallet popup.
4. Show tokens locked in contract.
5. Query contract state via CLI.

## Future Directions
- Add more chains and tokens.
- Support pooled liquidity and fallback P2P swaps.
- Improve UX and security.

---
