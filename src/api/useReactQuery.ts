/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    UseMutationResult,
    UseQueryOptions,
    UseQueryResult,
    useMutation,
    useQuery,
} from 'react-query';
import axiosInstance from './axiosInstance';
import { AxiosError } from 'axios';

interface UseFetchType<T> {
    endpoint: string;
    params?: any;
    options?: T;
}

interface UsePostType {
    endpoint: string;
}

const useFetch = <T>({
    endpoint,
    params,
    options,
}: UseFetchType<UseQueryOptions<T, AxiosError, T, string | string[]>>): UseQueryResult<
    T,
    AxiosError
> =>
    useQuery(
        [endpoint, params],
        (): T | Promise<T> =>
            new Promise((resolve, reject) => {
                axiosInstance
                    .get(endpoint, { params })
                    .then((res) => resolve(res?.data?.result))
                    .catch((err) => reject(err?.response?.data?.error));
            }),
        {
            enabled: !!endpoint,
            retry: 1,
            refetchOnWindowFocus: false,
            ...options,
        }
    );

const usePost = <T, F>({ endpoint }: UsePostType): UseMutationResult<F, AxiosError, T> =>
    useMutation({
        mutationFn: (data) =>
            new Promise((resolve, reject) => {
                axiosInstance
                    .post(endpoint, data)
                    .then((data) => resolve(data?.data?.result))
                    .catch((err) => reject(err?.response?.data?.error));
            }),
    });

export { useFetch, usePost };
