import { injectApp } from '../common';
import { onInit } from '../component';
import { Reactive, reactive } from '../reactive';
import type { InjectionProvider } from '../render/app';

export type QueryFn<T> = () => T | Promise<T>;

async function toPromise<T>(value: T | Promise<T>) {
  return value;
}

type QueryState<T, InitialValue extends T | undefined = undefined> = {
  data: Reactive<T | InitialValue>;
  error: Reactive<unknown | undefined>;
  isPending: Reactive<boolean>;
  isFetching: boolean;
};

type QueryClientPrepareResponse<
  T,
  InitialValue extends T | undefined
> = undefined extends InitialValue
  ? QueryState<T, undefined>
  : QueryState<T, InitialValue>;
export class QueryClient {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private keyToState = new Map<string, QueryState<any>>();

  private _id = crypto.randomUUID();

  prepare<T, InitialValue extends T | undefined>(
    queryKey: string,
    initialValue?: InitialValue
  ): QueryClientPrepareResponse<T, InitialValue> {
    const state = this.keyToState.get(queryKey) as
      | QueryState<T, InitialValue>
      | undefined;

    if (state) return state as QueryClientPrepareResponse<T, InitialValue>;

    const newState: QueryState<T, InitialValue> = {
      // @ts-expect-error initialValue
      data: reactive<T | InitialValue>(initialValue),
      error: reactive<unknown | undefined>(undefined),
      isPending: reactive(false),
      isFetching: false,
    };

    // @ts-expect-error newState
    this.keyToState.set(queryKey, newState);

    return newState as QueryClientPrepareResponse<T, InitialValue>;
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

export function useQuery<T, InitialValue extends T | undefined = undefined>(
  {
    queryFn,
    queryKey,
    initialValue,
  }: {
    queryFn: QueryFn<T>;
    queryKey: string;
    initialValue?: InitialValue;
  },
  injections: { queryClient?: QueryClient } = {}
) {
  const queryClient = injections?.queryClient || injectQueryClient();

  const { isPending, data, error } = queryClient.prepare<T, InitialValue>(
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
