import { injectApp } from '../common';
import { onInit } from '../component';
import { Reactive, reactive } from '../reactive';
import type { InjectionProvider } from '../render/app';

export type QueryFn<T> = () => T | Promise<T>;

async function toPromise<T>(value: T | Promise<T>) {
  return value;
}

type QueryState<T> = {
  data: Reactive<T | undefined>;
  error: Reactive<unknown | undefined>;
  isPending: Reactive<boolean>;
  isFetching: boolean;
};
export class QueryClient {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private keyToState = new Map<string, QueryState<any>>();

  private _id = crypto.randomUUID();

  prepare<T>(queryKey: string, initialValue?: T) {
    const state = this.keyToState.get(queryKey) as QueryState<T> | undefined;

    if (state) return state;

    const newState: QueryState<T> = {
      data: reactive<T | undefined>(initialValue),
      error: reactive<unknown | undefined>(undefined),
      isPending: reactive(false),
      isFetching: false,
    };

    this.keyToState.set(queryKey, newState);

    return newState;
  }
  getData<T>(queryFn: QueryFn<T>, queryKey: string) {
    const state = this.keyToState.get(queryKey);

    if (!state)
      throw new Error(`query client state not found for key ${queryKey}`);

    if (!state.isFetching) {
      state.isPending.update(true);
      toPromise(queryFn())
        .then((data) => {
          state.data.update(data);
        })
        .catch((err) => state.error.update(err))
        .finally(() => state.isPending.update(false));

      state.isFetching = true;
    }

    return state;
  }

  reset() {
    this.keyToState.clear();
  }
}

const QUERY_CLIENT_INJECTION_KEY = 'query-client';
function injectQueryClient() {
  const queryClient = injectApp().get(
    QUERY_CLIENT_INJECTION_KEY
  ) as QueryClient;
  if (!queryClient)
    throw new Error(
      "Query Client has not been provided. Have you called app.provide('query-client', new QueryClient())?"
    );
  return queryClient;
}

export function useQuery<T>(
  {
    queryFn,
    queryKey,
    initialValue,
  }: {
    queryFn: QueryFn<T>;
    queryKey: string;
    initialValue?: T;
  },
  injections: { queryClient?: QueryClient } = {}
) {
  const queryClient = injections?.queryClient || injectQueryClient();

  const { isPending, data, error } = queryClient.prepare<T>(
    queryKey,
    initialValue
  );

  const execute = async () => {
    queryClient.getData(queryFn, queryKey);
  };

  onInit(() => execute());

  return {
    data,
    error,
    isPending,
    execute,
  };
}

export const createQueryClientProvider =
  (): InjectionProvider<QueryClient> => ({
    key: QUERY_CLIENT_INJECTION_KEY,
    value: new QueryClient(),
  });
