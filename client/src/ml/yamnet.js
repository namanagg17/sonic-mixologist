import * as tf from "@tensorflow/tfjs";

let model = null;

export async function loadYamnetModel() {

  if (model) {
    return model;
  }

  model = await tf.loadGraphModel(
    "https://tfhub.dev/google/tfjs-model/yamnet/tfjs/1",
    { fromTFHub: true }
  );

  console.log("YAMNet model loaded");

  return model;
}

export async function runYamnet(audioBuffer) {

  const model = await loadYamnetModel();

  const waveform = audioBuffer.getChannelData(0);

  const tensor = tf.tensor1d(waveform);

  const scoresAndEmbeddings = model.execute({
    waveform: tensor
  });

  const embeddings = scoresAndEmbeddings[1];

  const embeddingArray = await embeddings.array();

  return embeddingArray;
}