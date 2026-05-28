/**
 * cardinal.test.js
 * Invariant proofs for CARDINAL v1.0.0
 *
 * Run with: node cardinal.test.js
 *
 * These are not unit tests. They are proofs.
 * If any assertion fails, Universe 1 has leaked in.
 */

'use strict';

const C = require('./cardinal');

let pass = 0, fail = 0;

function assert(condition, name, detail) {
  if (condition) {
    console.log(`  [PASS]  ${name}`);
    pass++;
  } else {
    console.log(`  [FAIL]  ${name}${detail ? '  (' + detail + ')' : ''}`);
    fail++;
  }
}

console.log('\nCARDINAL v1.0.0 — Invariant Proofs\n' + '─'.repeat(44));

// ── 1. Σ = 0 across many ticks ────────────────────────────────────────────
{
  let ok = true;
  for (let i = 0; i < 99; i++) {
    if (C.sum() !== 0) { ok = false; break; }
    C.tick();
  }
  assert(ok, 'Σ = 0 holds across 99 ticks');
}

// ── 2. Period = 3 ─────────────────────────────────────────────────────────
{
  const n0 = C.nibble();
  C.tick(); C.tick(); C.tick();
  assert(C.nibble() === n0, 'Period = 3 (nibble repeats every 3 ticks)');
}

// ── 3. Exactly two distinct state nibbles ─────────────────────────────────
{
  const seen = new Set();
  for (let i = 0; i < 6; i++) { seen.add(C.nibble()); C.tick(); }
  assert(seen.size === 2, 'Exactly 2 distinct nibbles (1010 and 0101)');
  assert(seen.has('1010') && seen.has('0101'), 'Nibbles are exactly 1010 and 0101');
}

// ── 4. Frame 3 = RESOLVED ─────────────────────────────────────────────────
{
  C.haltAtThree(true);  // advance to frame 3, silent
  assert(C.resolved(), 'resolved() is true at Frame 3');
  assert(C.frame() === 3, 'frame() === 3 at resolution');
}

// ── 5. State is immutable ─────────────────────────────────────────────────
{
  const s = C.state();
  let immutable = false;
  try {
    s.N = 999;
  } catch(e) {
    immutable = true;
  }
  // Might not throw in non-strict — check value instead
  assert(s.N !== 999, 'state() returns frozen/immutable snapshot');
}

// ── 6. Genesis block invariants ───────────────────────────────────────────
{
  const g = C.genesis;
  assert(g.entropy === 0,        'genesis entropy = 0');
  assert(g.sum === 0,            'genesis sum = 0');
  assert(g.bits === 4,           'genesis bits = 4');
  assert(g.period === 3,         'genesis period = 3');
  assert(g.nonce === 3,          'genesis nonce = 3');
  assert(g.forks_possible === false, 'forks impossible');
  assert(g.tpm_required === false,   'no TPM needed');
  assert(g.battery_required === false, 'no battery needed');
  assert(g.frames_to_heat_death === Infinity, 'frames to heat death = ∞');
}

// ── 7. 3,7,13 constants ───────────────────────────────────────────────────
{
  const k = C.constants;
  assert(k.three.value === 3,    '3 = len([-1,0,1]) — hardware constant');
  assert(k.seven.value === 7,    '7 = 2² + 3 — firmware constant');
  assert(k.thirteen.value === 13,'13 = 3×4 + 1 — protocol constant');
  assert(k.fortytwo.impl === 'error: overflow', '42 deprecated');
}

// ── 8. tick() chains ─────────────────────────────────────────────────────
{
  const t0 = C.ticks();
  C.tick().tick().tick();
  assert(C.ticks() === t0 + 3, 'tick() is chainable, increments tick count');
}

// ── 9. Donation cycle defined ─────────────────────────────────────────────
{
  const d = C.donations();
  assert(d.length === 4, 'Donation cycle has 4 edges (N→S, S→E, E→W, W→N)');
  assert(d[0].from === 'N' && d[0].to === 'S', 'First donation: N → S');
  assert(d[3].from === 'W' && d[3].to === 'N', 'Last donation: W → N (completes loop)');
}

// ── Results ───────────────────────────────────────────────────────────────
console.log('─'.repeat(44));
console.log(`\nTotal: ${pass + fail}  |  Pass: ${pass}  |  Fail: ${fail}`);

if (fail === 0) {
  console.log('\nAll invariants hold. CARDINAL is running.\n');
  console.log('  N + S + E + W = 0');
  console.log('  Period = 3. Nonce = 3.');
  console.log('  Frames to heat death: ∞\n');
  C.haltAtThree();
} else {
  console.log(`\n${fail} invariant(s) failed. Universe 1 has leaked in.\n`);
  process.exit(1);
}
