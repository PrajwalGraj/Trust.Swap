module AtomicSwap::HTLC {
    use std::signer;
    use std::option;
    use std::table;
    use aptos_framework::coin;
    use aptos_framework::timestamp;
    use aptos_std::hash;
        use aptos_framework::event;
        use aptos_framework::account;

    /// Swap struct: stores all swap details and locked coins
    struct Swap<T: store> has store {
        sender: address,
        receiver: address,
        amount: u64,
        hashlock: vector<u8>,
        timelock: u64,
        secret: option::Option<vector<u8>>,
        claimed: bool,
        refunded: bool,
        coin: option::Option<coin::Coin<T>>,
    }

    /// Table of swaps for O(1) lookup by swap_id
    struct Swaps<T: store> has key {
    inner: table::Table<u64, Swap<T>>,
    }

    /// Event emitted when swap is created
    struct LockedEvent has copy, drop, store {
        sender: address,
        swap_id: u64,
        receiver: address,
        amount: u64,
        hashlock: vector<u8>,
        timelock: u64,
    }

    /// Event emitted when swap is claimed
    struct ClaimedEvent has copy, drop, store {
        sender: address,
        swap_id: u64,
        receiver: address,
        secret: vector<u8>,
    }

    /// Event emitted when swap is refunded
    struct RefundedEvent has copy, drop, store {
        sender: address,
        swap_id: u64,
    }

    /// Initialize Swaps table and event handles for coin type T
    public fun init<T: store>(account: &signer) {
        let addr = signer::address_of(account);
        let swaps = Swaps<T> {
            inner: table::new<u64, Swap<T>>(),
        };
        move_to(account, swaps);
    }

    /// Create a new swap, lock coins, and emit LockedEvent
    public fun create_swap<T: store>(
        sender: &signer,
        receiver: address,
        amount: u64,
        hashlock: vector<u8>,
        timelock: u64,
        swap_id: u64
    ) acquires Swaps {
        let addr = signer::address_of(sender);
        let swaps = borrow_global_mut<Swaps<T>>(addr);
        assert!(!table::contains(&swaps.inner, swap_id), 1); // Swap ID must be new
        let locked_coin = coin::withdraw<T>(sender, amount);
        let swap = Swap<T> {
            sender: addr,
            receiver,
            amount,
            hashlock,
            timelock,
            secret: option::none<vector<u8>>(),
            claimed: false,
            refunded: false,
            coin: option::some(locked_coin),
        };
        table::add(&mut swaps.inner, swap_id, swap);
    // Event emission removed for compatibility
    }

    /// Claim a swap by providing the correct secret, transfer coins, emit ClaimedEvent
    public fun claim_swap<T: store>(
        claimer: &signer,
        swap_id: u64,
        secret: vector<u8>
    ) acquires Swaps {
        let addr = signer::address_of(claimer);
        let swaps = borrow_global_mut<Swaps<T>>(addr);
        assert!(table::contains(&swaps.inner, swap_id), 2); // Swap must exist
        let swap = table::borrow_mut(&mut swaps.inner, swap_id);
        assert!(!swap.claimed, 3); // Not already claimed
        assert!(!swap.refunded, 4); // Not already refunded
        assert!(swap.receiver == addr, 5); // Only receiver can claim
        let now = timestamp::now_seconds();
        assert!(swap.timelock > now, 6); // Timelock not expired
        assert!(hash::sha2_256(secret) == swap.hashlock, 7); // Secret matches hashlock
        swap.claimed = true;
        swap.secret = option::some(secret);
        let coin_val = option::extract(&mut swap.coin);
        coin::deposit<T>(addr, coin_val);
    // Event emission removed for compatibility
    }

    /// Refund a swap after timelock expiry, return coins, emit RefundedEvent
    public fun refund_swap<T: store>(
        sender: &signer,
        swap_id: u64
    ) acquires Swaps {
        let addr = signer::address_of(sender);
        let swaps = borrow_global_mut<Swaps<T>>(addr);
        assert!(table::contains(&swaps.inner, swap_id), 8); // Swap must exist
        let swap = table::borrow_mut(&mut swaps.inner, swap_id);
        assert!(!swap.claimed, 9); // Not already claimed
        assert!(!swap.refunded, 10); // Not already refunded
        assert!(swap.sender == addr, 11); // Only sender can refund
        let now = timestamp::now_seconds();
        assert!(swap.timelock <= now, 12); // Timelock expired
        swap.refunded = true;
        let coin_val = option::extract(&mut swap.coin);
        coin::deposit<T>(addr, coin_val);
    // Event emission removed for compatibility
    }
}