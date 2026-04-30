import { useState, useEffect, useCallback } from 'react';
import type { ServerSideConfig, ServerSideParams, ServerSideResponse } from '../types';

interface UseServerSideDataOptions {
  config?: ServerSideConfig;
  initialData?: Record<string, unknown>[];
  pageSize?: number;
}

interface UseServerSideDataResult {
  data: Record<string, unknown>[];
  totalRecords: number;
  loading: boolean;
  error: unknown;
  currentPage: number;
  pageSize: number;
  sortField?: string;
  sortOrder?: 1 | -1;
  globalFilter?: string;
  filters: Record<string, unknown>;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSort: (field: string, order: 1 | -1) => void;
  setGlobalFilter: (filter: string) => void;
  setFilters: (filters: Record<string, unknown>) => void;
  refresh: () => void;
}

export const useServerSideData = (
  options: UseServerSideDataOptions
): UseServerSideDataResult => {
  const { config, initialData = [], pageSize: initialPageSize = 10 } = options;

  const [data, setData] = useState<Record<string, unknown>[]>(initialData);
  const [totalRecords, setTotalRecords] = useState(initialData.length);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sortField, setSortField] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<1 | -1 | undefined>(undefined);
  const [globalFilter, setGlobalFilter] = useState<string | undefined>(undefined);
  const [filters, setFilters] = useState<Record<string, unknown>>({});

  const fetchData = useCallback(async () => {
    if (!config) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params: ServerSideParams = {
        page: currentPage,
        pageSize,
        sortField,
        sortOrder,
        globalFilter,
        filters,
      };

      const requestParams = config.transformRequest 
        ? config.transformRequest(params) 
        : params;

      const url = new URL(config.endpoint);
      
      if (config.method === 'GET' || !config.method) {
        Object.entries(requestParams).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            url.searchParams.append(key, String(value));
          }
        });
        
        if (config.params) {
          Object.entries(config.params).forEach(([key, value]) => {
            url.searchParams.append(key, String(value));
          });
        }
      }

      const response = await fetch(url.toString(), {
        method: config.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...config.headers,
        },
        body: config.method === 'POST' ? JSON.stringify(requestParams) : undefined,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonData = await response.json();
      
      const transformedData: ServerSideResponse = config.transformResponse
        ? config.transformResponse(jsonData)
        : jsonData;

      setData(transformedData.data);
      setTotalRecords(transformedData.totalRecords);
    } catch (err) {
      setError(err);
      if (config.onError) {
        config.onError(err);
      }
    } finally {
      setLoading(false);
    }
  }, [
    config,
    currentPage,
    pageSize,
    sortField,
    sortOrder,
    globalFilter,
    filters,
  ]);

  useEffect(() => {
    if (config) {
      fetchData();
    }
  }, [fetchData, config]);

  const handleSetPage = (page: number) => {
    setCurrentPage(page);
  };

  const handleSetPageSize = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleSetSort = (field: string, order: 1 | -1) => {
    setSortField(field);
    setSortOrder(order);
  };

  const handleSetGlobalFilter = (filter: string) => {
    setGlobalFilter(filter);
    setCurrentPage(1);
  };

  const handleSetFilters = (newFilters: Record<string, unknown>) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const refresh = () => {
    fetchData();
  };

  return {
    data,
    totalRecords,
    loading,
    error,
    currentPage,
    pageSize,
    sortField,
    sortOrder,
    globalFilter,
    filters,
    setPage: handleSetPage,
    setPageSize: handleSetPageSize,
    setSort: handleSetSort,
    setGlobalFilter: handleSetGlobalFilter,
    setFilters: handleSetFilters,
    refresh,
  };
};

export default useServerSideData;
