import { useLayoutEffect, useState } from 'react';
import { FIGMA_ORIGIN } from '~/ui/features/figma-embed-kit/constants';

const FIGMA_EMBED_BASE_URL = `${FIGMA_ORIGIN}/embed`;
const FIGMA_PROTO_BASE_URL = `${FIGMA_ORIGIN}/proto`;

/**
 * Generates an embed source URL for a given Figma node ID by
 * extracting the prototype ID from the current project view.
 *
 * @param nodeId - The ID of the Figma node to embed.
 * @returns The generated embed source URL.
 */
function useFigmaEmbedSource(projectId: string, nodeId: string) {
  const [source, setSource] = useState<URL | null>(null);

  useLayoutEffect(() => {
    try {
      const innerURL = new URL(`${FIGMA_PROTO_BASE_URL}/${projectId}`);
      innerURL.searchParams.set('embed_host', 'inline-viewer');
      innerURL.searchParams.set('hide-ui', '1');
      innerURL.searchParams.set('inline-viewer', '1');
      innerURL.searchParams.set('kind', 'proto');
      innerURL.searchParams.set('node-id', nodeId);

      const url = new URL(FIGMA_EMBED_BASE_URL);
      url.searchParams.set('embed_host', 'inline-viewer');
      url.searchParams.set('url', innerURL.toString());

      setSource(url);
    } catch (error) {
      console.error(error);
      setSource(null);
    }
  }, [nodeId, projectId]);

  return [source] as const;
}

export { useFigmaEmbedSource };
