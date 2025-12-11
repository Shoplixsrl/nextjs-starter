import { NextRequest, NextResponse } from 'next/server';

// Generate a simple WAV file with synthesized audio
function generateWavAudio(style: string, durationSeconds: number = 30): ArrayBuffer {
  const sampleRate = 44100;
  const numSamples = sampleRate * durationSeconds;
  const numChannels = 2;
  const bytesPerSample = 2;

  // WAV header size
  const headerSize = 44;
  const dataSize = numSamples * numChannels * bytesPerSample;
  const fileSize = headerSize + dataSize;

  const buffer = new ArrayBuffer(fileSize);
  const view = new DataView(buffer);

  // WAV header
  // "RIFF"
  view.setUint8(0, 0x52);
  view.setUint8(1, 0x49);
  view.setUint8(2, 0x46);
  view.setUint8(3, 0x46);

  // File size - 8
  view.setUint32(4, fileSize - 8, true);

  // "WAVE"
  view.setUint8(8, 0x57);
  view.setUint8(9, 0x41);
  view.setUint8(10, 0x56);
  view.setUint8(11, 0x45);

  // "fmt "
  view.setUint8(12, 0x66);
  view.setUint8(13, 0x6D);
  view.setUint8(14, 0x74);
  view.setUint8(15, 0x20);

  // Subchunk1 size (16 for PCM)
  view.setUint32(16, 16, true);

  // Audio format (1 = PCM)
  view.setUint16(20, 1, true);

  // Num channels
  view.setUint16(22, numChannels, true);

  // Sample rate
  view.setUint32(24, sampleRate, true);

  // Byte rate
  view.setUint32(28, sampleRate * numChannels * bytesPerSample, true);

  // Block align
  view.setUint16(32, numChannels * bytesPerSample, true);

  // Bits per sample
  view.setUint16(34, bytesPerSample * 8, true);

  // "data"
  view.setUint8(36, 0x64);
  view.setUint8(37, 0x61);
  view.setUint8(38, 0x74);
  view.setUint8(39, 0x61);

  // Data size
  view.setUint32(40, dataSize, true);

  // Generate audio data based on style
  const params = getStyleParams(style);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const sample = generateSample(t, params, durationSeconds);

    // Convert to 16-bit PCM
    const sampleInt = Math.max(-32768, Math.min(32767, Math.floor(sample * 32767)));

    // Left channel
    view.setInt16(headerSize + i * 4, sampleInt, true);
    // Right channel (slightly different for stereo effect)
    const rightSample = Math.max(-32768, Math.min(32767, Math.floor(sample * 32767 * 0.95)));
    view.setInt16(headerSize + i * 4 + 2, rightSample, true);
  }

  return buffer;
}

interface StyleParams {
  baseFreq: number;
  chordFreqs: number[];
  beatFreq: number;
  tempo: number;
  style: string;
}

function getStyleParams(style: string): StyleParams {
  switch (style) {
    case 'synth-pop':
      return {
        baseFreq: 220,
        chordFreqs: [261.63, 329.63, 392.00, 523.25], // C major
        beatFreq: 80,
        tempo: 120,
        style: 'synth-pop'
      };
    case 'electronic':
      return {
        baseFreq: 110,
        chordFreqs: [164.81, 196.00, 246.94, 329.63], // E minor
        beatFreq: 60,
        tempo: 128,
        style: 'electronic'
      };
    case 'hip-hop':
      return {
        baseFreq: 82.41,
        chordFreqs: [130.81, 164.81, 196.00, 261.63], // C minor
        beatFreq: 45,
        tempo: 90,
        style: 'hip-hop'
      };
    case 'rnb':
      return {
        baseFreq: 146.83,
        chordFreqs: [174.61, 220.00, 261.63, 349.23], // F major 7
        beatFreq: 55,
        tempo: 85,
        style: 'rnb'
      };
    case 'rock':
      return {
        baseFreq: 82.41,
        chordFreqs: [164.81, 196.00, 246.94, 329.63], // E power chord
        beatFreq: 100,
        tempo: 140,
        style: 'rock'
      };
    case 'indie':
      return {
        baseFreq: 196.00,
        chordFreqs: [246.94, 293.66, 392.00, 493.88], // G major
        beatFreq: 70,
        tempo: 110,
        style: 'indie'
      };
    case 'latin':
      return {
        baseFreq: 130.81,
        chordFreqs: [164.81, 196.00, 261.63, 329.63], // C-E-G-C
        beatFreq: 90,
        tempo: 100,
        style: 'latin'
      };
    case 'ambient':
    default:
      return {
        baseFreq: 110,
        chordFreqs: [146.83, 174.61, 220.00, 293.66], // D minor
        beatFreq: 30,
        tempo: 60,
        style: 'ambient'
      };
  }
}

function generateSample(t: number, params: StyleParams, duration: number): number {
  const { baseFreq, chordFreqs, beatFreq, tempo, style } = params;

  // Fade in/out
  const fadeTime = 0.5;
  let envelope = 1;
  if (t < fadeTime) {
    envelope = t / fadeTime;
  } else if (t > duration - fadeTime) {
    envelope = (duration - t) / fadeTime;
  }

  // Beat timing
  const beatPeriod = 60 / tempo;
  const beatPhase = (t % beatPeriod) / beatPeriod;

  let sample = 0;

  switch (style) {
    case 'synth-pop':
      // Synth lead
      sample += Math.sin(2 * Math.PI * chordFreqs[Math.floor(t * 2) % 4] * t) * 0.3;
      // Pad
      sample += Math.sin(2 * Math.PI * baseFreq * t) * 0.2 * (1 + 0.5 * Math.sin(2 * Math.PI * 0.5 * t));
      // Kick drum
      if (beatPhase < 0.1) {
        sample += Math.sin(2 * Math.PI * beatFreq * (1 - beatPhase * 5) * t) * (1 - beatPhase * 10) * 0.4;
      }
      // Hi-hat
      if (beatPhase > 0.5 && beatPhase < 0.55) {
        sample += (Math.random() * 2 - 1) * 0.1;
      }
      break;

    case 'electronic':
      // Bass wobble
      const wobble = 1 + 0.5 * Math.sin(2 * Math.PI * 4 * t);
      sample += Math.sin(2 * Math.PI * baseFreq * wobble * t) * 0.3;
      // Arpeggio
      const arpIndex = Math.floor(t * 8) % 4;
      sample += Math.sin(2 * Math.PI * chordFreqs[arpIndex] * t) * 0.2;
      // Kick
      if (beatPhase < 0.05) {
        sample += Math.sin(2 * Math.PI * beatFreq * t) * (1 - beatPhase * 20) * 0.5;
      }
      break;

    case 'hip-hop':
      // Deep bass
      sample += Math.sin(2 * Math.PI * baseFreq * t) * 0.4;
      // Snare on 2 and 4
      const measurePhase = (t % (beatPeriod * 4)) / (beatPeriod * 4);
      if ((measurePhase > 0.25 && measurePhase < 0.28) || (measurePhase > 0.75 && measurePhase < 0.78)) {
        sample += (Math.random() * 2 - 1) * 0.3;
      }
      // Kick on 1 and 3
      if (beatPhase < 0.08) {
        sample += Math.sin(2 * Math.PI * beatFreq * t) * (1 - beatPhase * 12) * 0.5;
      }
      // Hi-hat pattern
      if (Math.floor(t * 4) % 2 === 0 && (t * 4) % 1 < 0.1) {
        sample += (Math.random() * 2 - 1) * 0.08;
      }
      break;

    case 'rnb':
      // Smooth pad
      for (let i = 0; i < 4; i++) {
        sample += Math.sin(2 * Math.PI * chordFreqs[i] * t) * 0.1;
      }
      // Bass
      sample += Math.sin(2 * Math.PI * baseFreq * t) * 0.25;
      // Light percussion
      if (beatPhase < 0.03) {
        sample += Math.sin(2 * Math.PI * beatFreq * t) * (1 - beatPhase * 30) * 0.2;
      }
      break;

    case 'rock':
      // Distorted guitar (square wave)
      const guitarFreq = chordFreqs[Math.floor(t) % 2];
      sample += Math.sign(Math.sin(2 * Math.PI * guitarFreq * t)) * 0.2;
      // Power chord
      sample += Math.sign(Math.sin(2 * Math.PI * guitarFreq * 1.5 * t)) * 0.15;
      // Drums
      if (beatPhase < 0.05) {
        sample += Math.sin(2 * Math.PI * beatFreq * t) * (1 - beatPhase * 20) * 0.4;
      }
      // Snare
      if (beatPhase > 0.5 && beatPhase < 0.55) {
        sample += (Math.random() * 2 - 1) * 0.25;
      }
      break;

    case 'indie':
      // Clean guitar arpeggio
      const indieArp = Math.floor(t * 4) % 4;
      sample += Math.sin(2 * Math.PI * chordFreqs[indieArp] * t) * 0.25;
      // Tambourine
      if (beatPhase > 0.5 && beatPhase < 0.52) {
        sample += (Math.random() * 2 - 1) * 0.1;
      }
      // Light kick
      if (beatPhase < 0.04) {
        sample += Math.sin(2 * Math.PI * beatFreq * t) * (1 - beatPhase * 25) * 0.25;
      }
      break;

    case 'latin':
      // Clave rhythm
      const clavePattern = [0, 0.375, 0.5, 0.75, 0.875];
      for (const hit of clavePattern) {
        if (Math.abs(beatPhase - hit) < 0.02) {
          sample += Math.sin(2 * Math.PI * 800 * t) * 0.15 * Math.exp(-100 * Math.abs(beatPhase - hit));
        }
      }
      // Bass
      sample += Math.sin(2 * Math.PI * baseFreq * t) * 0.3;
      // Brass-like synth
      sample += Math.sin(2 * Math.PI * chordFreqs[Math.floor(t * 2) % 4] * t) * 0.2;
      break;

    case 'ambient':
    default:
      // Slow pad
      for (let i = 0; i < 4; i++) {
        sample += Math.sin(2 * Math.PI * chordFreqs[i] * t) * 0.08 * (1 + 0.3 * Math.sin(2 * Math.PI * (0.1 + i * 0.05) * t));
      }
      // Sub bass
      sample += Math.sin(2 * Math.PI * baseFreq * t) * 0.15;
      break;
  }

  return sample * envelope * 0.7;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ style: string }> }
) {
  const { style } = await params;

  // Generate 30 seconds of audio
  const audioBuffer = generateWavAudio(style, 30);

  return new NextResponse(audioBuffer, {
    headers: {
      'Content-Type': 'audio/wav',
      'Content-Length': audioBuffer.byteLength.toString(),
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'public, max-age=31536000',
    },
  });
}
