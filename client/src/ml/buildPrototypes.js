import { runYamnet } from "./yamnet";

export async function buildPrototype(audioBuffers) {

  const embeddings = [];

  for (const buffer of audioBuffers) {
    const result = await runYamnet(buffer);

    const meanEmbedding = result[0].map((_, i) =>
      result.reduce((sum, frame) => sum + frame[i], 0) / result.length
    );

    embeddings.push(meanEmbedding);
  }

  const prototype = embeddings[0].map((_, i) =>
    embeddings.reduce((sum, emb) => sum + emb[i], 0) / embeddings.length
  );

  return prototype;
}