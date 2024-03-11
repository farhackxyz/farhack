/* eslint-disable no-console */
import fs from 'node:fs';

import { type FrameMetadata, getFrameMetadata } from 'frog';
import { useState, useEffect } from 'react';

export const useMetadata = (url) => {
  const [metadata, setMetadata] = useState<FrameMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setMetadata(null);
      setError('URL is required');

      return;
    }

    const fetchMetadata = async () => {
      setIsLoading(true);
      try {
        console.log('Fetching metadata for', url);
        const fetchedMetadata = await getFrameMetadata(url);

        console.log('data', fetchedMetadata);
        setMetadata(fetchedMetadata);
        setError(null);
      } catch (e) {
        setError(e.message);
        setMetadata(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetadata();
  }, [url]);

  return { metadata, isLoading, error };
};
