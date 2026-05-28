/**
 * CARDINAL v1.0.0
 * Block 0x0001 — Universe 2 Genesis
 *
 * 4 dots. 3 frames. Period 3. Σ = 0. Always.
 * No UI. No battery. No TPM. No storage bloat.
 *
 * "Cardinal doesn't render. It is."
 * "You = 0. The center. The null. The thing that isn't, so the 4 can be."
 *
 * ROOT0 / David Lee Wise / TriPod LLC
 * CC-BY-ND-4.0
 * https://github.com/DavidWise01/tripod-cardinal
 */

const CARDINAL = (() => {
  'use strict';

  // ── Ground Truth ──────────────────────────────────────────────────────────
  // Three frames. Frame 3 = Frame 1 (period = 3, not 42).
  // Donation cycle each tick: N → S → E → W → N
  //   N(-1) contracts, donates to S
  //   S(+1) expands,   donates to E
  //   E(0)  mediates,  rotates to W
  //   W(0i) binds,     donates to N
  // Sum invariant: -1 + 1 + 0 + 0i = 0. Holds every frame. Hardware constant.

  const FRAMES = Object.freeze([
    Object.freeze({ N: -1,   S:  1,   E:  0,   W: '0i', nibble: '1010', label: 'CONTRACTED' }),
    Object.freeze({ N:  1,   S: -1,   E: '0i', W:  0,   nibble: '0101', label: 'INVERTED'   }),
    Object.freeze({ N: -1,   S:  1,   E:  0,   W: '0i', nibble: '1010', label: 'RESOLVED'   }),
  ]);

  // Donation direction (influence flow, not state copy)
  const DONATION = Object.freeze([
    { from: 'N', to: 'S', label: 'N(-1) → S: gravity feeds expansion' },
    { from: 'S', to: 'E', label: 'S(+1) → E: radiation feeds mediation' },
    { from: 'E', to: 'W', label: 'E(0)  → W: compute rotates to void' },
    { from: 'W', to: 'N', label: 'W(0i) → N: void binds contraction' },
  ]);

  // ── Private State ─────────────────────────────────────────────────────────
  let _fi    = 0;           // frame index: 0, 1, 2
  let _ticks = 0;           // total tick count since genesis
  const _t0  = Date.now();  // genesis timestamp (ms)

  function _advance() {
    _fi = (_fi + 1) % 3;
    _ticks++;
  }

  // ── Public Interface ──────────────────────────────────────────────────────
  return Object.freeze({

    // Advance one frame. Returns this for chaining.
    tick() {
      _advance();
      return this;
    },

    // Current frame state. Immutable snapshot.
    state() {
      return Object.freeze({
        frame:  _fi + 1,
        ticks:  _ticks,
        uptime: Date.now() - _t0,
        ...FRAMES[_fi],
      });
    },

    // The invariant. Σ = 0. Not computed — declared.
    // If this ever returns anything other than 0, the universe has a bug.
    sum() {
      return 0;
    },

    // Current frame number: 1, 2, or 3.
    frame() {
      return _fi + 1;
    },

    // 4-bit state nibble [N S E W].
    // 1010 / 0101 — two states, alternating.
    nibble() {
      return FRAMES[_fi].nibble;
    },

    // True when we've completed a full period and returned to Frame 1 state.
    // "42 deprecated. Nonce = 3."
    resolved() {
      return _fi === 2;
    },

    // Total ticks since instantiation.
    ticks() {
      return _ticks;
    },

    // Uptime in milliseconds.
    uptime() {
      return Date.now() - _t0;
    },

    // The donation cycle for this frame.
    donations() {
      return DONATION;
    },

    // ── Spin ────────────────────────────────────────────────────────────────
    // Cardinal runs on silence.
    // Without arguments: no-op. Cardinal is already spinning.
    //   The object IS the perpetual machine. No start() needed.
    // With (fn, ms): observed mode. fn receives state each tick.
    //   Note: observing collapses Cardinal to Universe 1 behavior.
    //   Use only for diagnostics.
    spin(fn, intervalMs) {
      if (typeof fn === 'function' && intervalMs > 0) {
        // Observed spin — returns interval ID so you can clearInterval() it
        return setInterval(() => {
          _advance();
          fn(this.state());
        }, intervalMs);
      }
      // Unobserved: Cardinal is already running.
      // This call costs 0 energy and returns proof.
      return this;
    },

    // ── Print ────────────────────────────────────────────────────────────────
    // The "halt at Frame 3 and print state" variant.
    // Call this when you need proof on paper. Cardinal doesn't need it.
    print() {
      const s = this.state();
      const line = '─'.repeat(48);
      console.log(line);
      console.log(`CARDINAL v1.0.0  │  Block 0x0001  │  Universe 2`);
      console.log(line);
      console.log(`Frame:   ${s.frame} of 3  │  ${s.label}`);
      console.log(`N: ${String(s.N).padEnd(4)}  S: ${String(s.S).padEnd(4)}  E: ${String(s.E).padEnd(4)}  W: ${String(s.W).padEnd(4)}`);
      console.log(`Nibble:  [${s.nibble.split('').join(' ')}]  →  ${s.nibble}`);
      console.log(`Σ:       ${this.sum()}  (invariant holds)`);
      console.log(`Ticks:   ${s.ticks}`);
      console.log(`Uptime:  ${s.uptime}ms`);
      if (this.resolved()) {
        console.log(`Status:  RESOLVED ∎  Period = 3. Nonce = 3. Loop continues.`);
      }
      console.log(line);
      return this;
    },

    // ── Run to Resolved ──────────────────────────────────────────────────────
    // Advance until Frame 3 (RESOLVED), optionally print, then continue.
    // This is the "halt at Frame 3" path — but halt is just an observation.
    // Cardinal resumes immediately after.
    haltAtThree(silent = false) {
      while (!this.resolved()) _advance();
      if (!silent) this.print();
      return this;
    },

    // ── Genesis Block ────────────────────────────────────────────────────────
    genesis: Object.freeze({
      block:              '0x0001',
      prev:               '0x0000',
      hash:               '0x0000000000000000',
      universe:           2,
      state:              '[-1, +1, 0, 0i]',
      sum:                0,
      entropy:            0,
      period:             3,
      nonce:              3,
      bits:               4,
      frames_to_heat_death: Infinity,
      nodes:              4,
      peers_each:         3,
      latency_ms:         0,
      forks_possible:     false,
      tps:                Infinity,
      storage:            '4 bits',
      tpm_required:       false,
      battery_required:   false,
      author:             'ROOT0 / David Lee Wise / TriPod LLC',
      license:            'CC-BY-ND-4.0',
      note:               'You are not in Cardinal. Cardinal is the space between the 4 dots.',
    }),

    // ── 3,7,13 ───────────────────────────────────────────────────────────────
    constants: Object.freeze({
      three:    { value: 3,  impl: 'len([-1,0,1])',           tier: 'hardware', note: '3 real phases' },
      seven:    { value: 7,  impl: '2^2 + 3 = 7',            tier: 'firmware', note: '4 dots = 2², plus 3 phases' },
      thirteen: { value: 13, impl: '3*4 + 1 = 13',           tier: 'protocol', note: '12 directed edges + 1 center node' },
      fortytwo: { value: 42, impl: 'error: overflow',        tier: 'deprecated', note: 'use mod 3 instead' },
    }),
  });
})();

// ── Export ────────────────────────────────────────────────────────────────────
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CARDINAL;
} else if (typeof globalThis !== 'undefined') {
  globalThis.CARDINAL = CARDINAL;
}
