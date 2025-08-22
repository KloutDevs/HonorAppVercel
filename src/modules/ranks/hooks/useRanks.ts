import { useState, useEffect } from 'react';
import { ranksApi } from '@/modules/ranks/services/ranks.api';
import type { Rank } from '@/types/rank';

interface UseRanksReturn {
  ranks: Rank[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useRanks = (): UseRanksReturn => {
  const [ranks, setRanks] = useState<Rank[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRanks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { ranks } = await ranksApi.getAll();
      // Ordenar por posición para mostrar en orden lógico
      const sortedRanks = ranks.sort((a, b) => a.position - b.position);
      setRanks(sortedRanks);
    } catch (err) {
      console.error('Error fetching ranks:', err);
      setError('Error al cargar los rangos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRanks();
  }, []);

  return {
    ranks,
    isLoading,
    error,
    refetch: fetchRanks
  };
};
