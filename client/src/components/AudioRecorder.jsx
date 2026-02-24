import { useState, useRef } from "react";

const AudioRecorder = ({ onAudioCaptured }) => {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      chunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      onAudioCaptured(blob);
    };

    mediaRecorder.start();
    setRecording(true);

    // Auto stop after 5 seconds
    setTimeout(() => {
      mediaRecorder.stop();
      setRecording(false);
    }, 5000);
  };

  return (
    <button
      onClick={startRecording}
      disabled={recording}
      className="px-6 py-3 bg-cocktail-gold text-black rounded-lg"
    >
      {recording ? "Recording..." : "Record 5 Seconds"}
    </button>
  );
};

export default AudioRecorder;