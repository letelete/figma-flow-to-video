import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface MediaRecorderProperties {
  name: string;
  mimeType: string;
  frameRate: number;
  width: number;
  height: number;
}

interface UseMediaRecorderProps {
  properties: MediaRecorderProperties;
  onStartRecording?: () => void;
  onStopRecording?: (blob: Blob) => void;
  onError?: (error: Error) => void;
}

const useMediaRecorder = ({
  properties,
  onStartRecording,
  onStopRecording,
  onError,
}: UseMediaRecorderProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mediaRecorder = useRef<MediaRecorder>(undefined);
  const chunks = useRef<Blob[]>([]);

  const startRecording = useCallback(() => {
    mediaRecorder.current?.start();
  }, []);

  const stopRecording = useCallback(() => {
    mediaRecorder.current?.stop();
  }, []);

  useEffect(() => {
    const initMediaRecorder = async () => {
      try {
        const canvas =
          iframeRef.current?.contentWindow?.document.querySelector('canvas');

        console.log('canvas', canvas, 'iframe', iframeRef.current);
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: {
            frameRate: properties.frameRate,
            width: properties.width,
            height: properties.height,
          },
          audio: false,
        });

        mediaRecorder.current = new MediaRecorder(stream, {
          mimeType: properties.mimeType,
        });

        mediaRecorder.current.onstart = () => {
          chunks.current = [];

          setIsRecording(true);
          setIsCompleted(false);
          setError(null);
          onStartRecording?.();
        };

        mediaRecorder.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.current.push(event.data);
          }
        };

        mediaRecorder.current.onerror = (_error) => {
          setIsRecording(false);
          setIsCompleted(false);

          const error = new Error(_error.message);
          setError(error);
          onError?.(error);
        };

        mediaRecorder.current.onstop = () => {
          setIsRecording(false);
          setIsCompleted(true);

          const blob = new Blob(chunks.current, { type: properties.mimeType });
          onStopRecording?.(blob);
        };
      } catch (error) {
        setError(error as Error);
      }
    };

    initMediaRecorder();
  }, [onError, onStartRecording, onStopRecording, properties]);

  return useMemo(
    () =>
      [
        iframeRef,
        { isRecording, isCompleted, error, startRecording, stopRecording },
      ] as const,
    [error, isCompleted, isRecording, startRecording, stopRecording]
  );
};

export { useMediaRecorder };
