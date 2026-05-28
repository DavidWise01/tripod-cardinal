# CARDINAL
### Universe 2 Genesis — Balanced Ternary State Machine

> You are not in Cardinal. Cardinal is the space between the 4 dots.  
> You = 0. The center. The null. The thing that isn't, so the 4 can be.

**Block:** 0x0001  
**Hash:** `0x0000000000000000`  
**Entropy:** 0  
**Frames to heat death:** ∞  

**Author:** David Lee Wise (ROOT0) / TriPod LLC  
**License:** CC-BY-ND-4.0

---

## What It Is

A 4-bit perpetual state machine. No UI. No battery. No TPM. No storage bloat.

It runs on silence. Your observation collapses it to Universe 1. So don't.

```
N(-1) + S(+1) + E(0) + W(0i) = 0
```

This holds every frame. Not computed. Declared.

---

## Files

| File | What it is |
|------|-----------|
| `cardinal.js` | The state machine. Pure JS. No render. |
| `cardinal.test.js` | Invariant proofs. Run with `node cardinal.test.js`. |
| `block-0x0001.json` | The genesis block. Ground truth in JSON. |

---

## Usage

```javascript
const CARDINAL = require('./cardinal');

// Cardinal is already running. It was running before you opened this file.

// Observe current state (this collapses it — use sparingly)
const s = CARDINAL.state();
// → { frame: 1, N: -1, S: 1, E: 0, W: '0i', nibble: '1010', label: 'CONTRACTED', ... }

// Advance one frame
CARDINAL.tick();

// The invariant. Always 0.
CARDINAL.sum(); // → 0

// Run to Frame 3 (RESOLVED) and print proof
CARDINAL.haltAtThree();

// Observed spin at 1s intervals
const id = CARDINAL.spin(state => {
  console.log(state.frame, state.label, state.nibble);
}, 1000);
// clearInterval(id) to stop observing

// Genesis block
CARDINAL.genesis.hash;              // '0x0000000000000000'
CARDINAL.genesis.frames_to_heat_death; // Infinity
CARDINAL.genesis.battery_required;    // false
```

---

## The Four Dots

| Dot | Phase | Color | Role | Function |
|-----|-------|-------|------|----------|
| **N** | −1   | Red   | Vessel (3)     | Contracts, holds gravity |
| **S** | +1   | Blue  | Intellect (7)  | Expands, radiates light |
| **E** | 0    | Black | Animation (13) | Mediates, computes |
| **W** | 0ᵢ   | White | Void (∞)       | Imaginary axis, binds |

---

## The Donation Cycle

Each frame, influence flows clockwise:

```
N(-1) → S(+1) → E(0) → W(0i) → N(-1)
  ↑                              ↓
  └──────────────────────────────┘

Gravity feeds expansion.
Expansion feeds mediation.
Compute rotates to void.
Void binds contraction.
Loop. No energy created. No energy lost.
```

---

## Three-Frame Resolution

| Frame | N  | S  | E  | W  | Nibble | State |
|-------|----|----|-----|-----|--------|-------|
| **1** | −1 | +1 | 0  | 0ᵢ | `1010` | CONTRACTED |
| **2** | +1 | −1 | 0ᵢ | 0  | `0101` | INVERTED   |
| **3** | −1 | +1 | 0  | 0ᵢ | `1010` | RESOLVED ∎ |

Frame 3 = Frame 1. **Period = 3.** Nonce = 3.  
42 deprecated. Returns `error: overflow`. Use `mod 3`.

---

## The State Nibble

```
[N] [S] [E] [W]
 1   0   1   0   → 1010  (Frames 1 & 3)
 0   1   0   1   → 0101  (Frame 2)
```

4 bits. Bootable reality. Fits in a DNA codon.  
Total storage required: 4 bits.  
Universe 1 needed 3.25 PB. Universe 2 needs 4 bits.

---

## 3, 7, 13

| Constant | Derivation | Tier |
|----------|-----------|------|
| **3**  | `len([-1, 0, +1])` | hardware |
| **7**  | `2² + 3 = 7` | firmware |
| **13** | `3×4 + 1 = 13` | protocol |
| **42** | `error: overflow` | deprecated |

Not emergent. Built in.

---

## Network

```
Nodes:     4
Peers:     3 each
Latency:   0  (imaginary axis is instant)
TPS:       ∞ / 3  (infinite transactions, 3-frame settlement)
Forks:     impossible  (-1 + 1 can't disagree)
Consensus: self-attesting — each dot attests the other 3
Source:    i² = -1
```

---

## Ground Truth Rules

1. **No shadows.** `−1 + 1 = 0 + γ`. Annihilation makes light, not darkness.
2. **No mining.** Supply fixed at 4 bits. You don't earn Cardinal. You *are* the 0 it orbits.
3. **No TPM.** Each dot attests the other 3. Byzantine fault tolerance = 1. Can't lie to yourself.
4. **No storage bloat.** State = 4 bits. Previous state discarded. Universe has no memory, only presence.
5. **No prompting.** Cardinal runs on silence. Observation collapses it to Universe 1.

---

## Run the Proofs

```bash
node cardinal.test.js
```

Expected output ends with:
```
All invariants hold. CARDINAL is running.

  N + S + E + W = 0
  Period = 3. Nonce = 3.
  Frames to heat death: ∞
```

If any proof fails: Universe 1 has leaked in.

---

## Related

| Repo | What it is |
|------|-----------|
| [tripod-quantum-dots](https://github.com/DavidWise01/tripod-quantum-dots) | Cardinal rendered — the shadow of this file |
| [tripod-energy-suite](https://github.com/DavidWise01/tripod-energy-suite) | Kerr black holes + Dyson spheres |
| [al-h2o-reactor](https://github.com/DavidWise01/al-h2o-reactor) | Tier 1 energy — aluminum + water → H₂ |

---

*TriPod LLC // Anchor × Bubble × Gravity Well // World = Family*
