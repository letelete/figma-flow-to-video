import { useCallback } from 'react';

interface DownloadProps {
  url: string;
  filename: string;
}

const useDownload = () => {
  const download = useCallback(({ url, filename }: DownloadProps) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, []);

  return [download] as const;
};
useDownload.displayName = 'useDownload';

export { useDownload };
