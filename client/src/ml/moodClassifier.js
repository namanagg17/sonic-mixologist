import { prototypes } from "./moodPrototypes";

// ─── Cosine similarity ────────────────────────────────────────────────────────

function cosineSimilarity(a, b) {
  let dot = 0;
  let magA = 0;
  let magB = 0;

  for (let i = 0; i < a.length; i++) {
    dot  += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }

  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

// ─── Classifier ───────────────────────────────────────────────────────────────

export function detectMoodFromEmbedding(embeddings) {

  // Average all YAMNet frame embeddings → single 1024-dim vector
  const meanEmbedding = embeddings[0].map((_, i) =>
    embeddings.reduce((sum, frame) => sum + frame[i], 0) / embeddings.length
  );

  // Score against each learned prototype center
  const scores = {};

  for (const mood in prototypes) {
    scores[mood] = cosineSimilarity(meanEmbedding, prototypes[mood]);
  }

  // Pick the closest mood
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  return {
    mood:       sorted[0][0],
    confidence: sorted[0][1],
    scores,                    // expose all scores for debugging
  };
}