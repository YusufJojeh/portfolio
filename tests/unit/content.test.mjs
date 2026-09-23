// Content integrity for the cinematic portfolio copy (messages/final/*).
//
//   node --test tests/unit
//
// The copy is the evidence layer of the site, so these checks guard two
// things: both locales say the same things, and nothing slips in that reads
// like an unverified metric.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const load = (locale) => JSON.parse(readFileSync(new URL(`../../messages/final/${locale}.json`, import.meta.url), 'utf8'));
const en = load('en');
const ar = load('ar');

/** Every leaf as [path, value], with array indices in the path. */
function leaves(node, path = []) {
  if (Array.isArray(node)) return node.flatMap((v, i) => leaves(v, [...path, i]));
  if (node && typeof node === 'object') return Object.entries(node).flatMap(([k, v]) => leaves(v, [...path, k]));
  return [[path.join('.'), node]];
}

/** Shape only: keys and array lengths, not values. */
function shape(node) {
  if (Array.isArray(node)) return node.map(shape);
  if (node && typeof node === 'object') return Object.fromEntries(Object.entries(node).map(([k, v]) => [k, shape(v)]));
  return typeof node;
}

test('en and ar have the same keys and list lengths', () => {
  assert.deepEqual(shape(ar), shape(en));
});

test('no empty strings', () => {
  for (const [path, value] of [...leaves(en), ...leaves(ar)]) {
    if (typeof value === 'string') assert.notEqual(value.trim(), '', `empty string at ${path}`);
  }
});

test('Arabic copy is actually Arabic', () => {
  // Proper nouns, stack names and dates may stay Latin; running sentences may not.
  const latinSentences = leaves(ar).filter(
    ([, v]) => typeof v === 'string' && v.split(/\s+/).length > 4 && !/[؀-ۿ]/.test(v),
  );
  assert.deepEqual(latinSentences, []);
});

// Patterns that would read as an unverified claim: percentages, "10+",
// multipliers, user/revenue/uptime figures.
const METRIC = [
  /\d+\s*%/,
  /\d+\s*\+/,
  /\b\d+(\.\d+)?\s*x\b/i,
  /\b\d[\d,.]*\s*(k|m|bn)\b/i,
  /\b(users?|customers?|clients?|requests?|uptime|revenue|downloads?)\b.*\d|\d.*\b(users?|customers?|clients?|uptime|revenue|downloads?)\b/i,
  /[٠-٩]+\s*٪/,
];

// The one place numbers are allowed as numbers: CareerGuide's documented
// scoring weights, which are configuration rather than outcomes.
const ALLOWED = [/^work\.careerguide\.weightList\.\d+\.v$/];

test('no metric-like claims in the copy', () => {
  for (const [path, value] of [...leaves(en), ...leaves(ar)]) {
    if (ALLOWED.some((re) => re.test(path))) continue;
    for (const re of METRIC) {
      assert.ok(!re.test(String(value)), `metric-like text at ${path}: "${value}" (${re})`);
    }
  }
});

test('CareerGuide weights sum to 100', () => {
  for (const messages of [en, ar]) {
    const total = messages.work.careerguide.weightList.reduce((sum, w) => sum + w.v, 0);
    assert.equal(total, 100);
  }
});

test('the generated-art disclosure exists in both locales', () => {
  assert.match(en.art.note, /illustrative/i);
  assert.ok(ar.art.note.length > 10);
});

test('Dhura is labelled as a concept, not a product', () => {
  assert.match(en.work.dhura.status, /not a shipped product/i);
  assert.match(en.dhura.status, /not a shipped product/i);
});
