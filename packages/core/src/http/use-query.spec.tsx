import { afterEach, describe, expect, it, vi } from 'vitest';
import { Reactive, reactive } from '../reactive/reactive';
import { fakeMount } from '../test-utils/fake-mount';
import { flushPromises } from '../test-utils/flush-promises';
import { component, onInit } from '../component';
import { setupFakeApp } from '../test-utils/fake-app';

type QueryFn<T> = () => T | Promise<T>;


async function toPromise<T>(value: T | Promise<T>) {
  return value;
}

class QueryClient<T>{



  private keyToState = new Map<string, { data: Reactive<T>, error: Reactive<unknown>, isPending: Reactive<boolean>, isFetching: boolean }>();




  prepare(queryKey: string) {

    const state = this.keyToState.get(queryKey);

    if (state) return state

    const newState = {
      data: reactive(undefined),
      error: reactive(undefined),
      isPending: reactive(false),
      isFetching: false
    };

    this.keyToState.set(queryKey, newState);

    return newState
    
  }
  getData<T>(queryFn: QueryFn<T>, queryKey: string) {
    console.log('queryClient.getData')


    const state = this.keyToState.get(queryKey)

    if (!state) throw new Error(`query client state not found for key ${queryKey}`, )

    if (state.isFetching) {
      state.isPending.update(true);
      toPromise(queryFn())
        .then((data) => {
          console.log('update query data with ', data)
          state.data.update(data);
        })
        .catch((err) => state.error.update(err))
        .finally(() => state.isPending.update(false));

        state.isFetching = true;
    }

    return state
  }

  reset() {
    // this.queryData.update(undefined);
    // this.isFetching = false;
    // this.pendingState.update(false);
    // this.error.update(undefined);
    this.keyToState.clear()
  }
}

const queryClient = new QueryClient();
function useQuery<T>({
  queryFn,
  queryKey,
}: {
  queryFn: QueryFn<T>;
  queryKey: string;
}) {


  const { isPending, data, error } = queryClient.prepare(queryKey);



  const execute = async () => {
    queryClient.getData(queryFn, queryKey)
    }

  onInit(() => execute());

  return {
    data,
    error,
    isPending,
    execute,
  };
}

describe('useQuery', () => {
  afterEach(() => {
    queryClient.reset();
  });

  async function setup<T>({ queryFn }: { queryFn: QueryFn<T> }) {
    let data!: ReturnType<typeof useQuery<T>>['data'];
    let error!: ReturnType<typeof useQuery<T>>['error'];

    const TestComponent = component(() => {
      const { data: _data, error: _error } = useQuery({
        queryFn,
        queryKey: 'a',
      });

      data = _data;
      error = _error;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return 'a' as any;
    });

    fakeMount(TestComponent);

    await flushPromises();

    return { data, error };
  }

  describe('state', () => {
    it('returns the data of the query fn', async () => {
      const queryFn = vi.fn(async () => {
        console.log('data')
      return 'data'
    });
      const { data } = await setup({ queryFn });

      console.log('checking data')

      expect(data.value).toBe('data');
    });

    it.skip('if it fails, it returns an error', async () => {
      const queryFn = vi.fn().mockRejectedValue('an error occurred');

      const { data, error } = await setup({ queryFn });
      expect(data.value).toBeUndefined();
      expect(error.value).toBe('an error occurred');
    });

    it.skip('is pending when the query is being executed until the queryFn completes', async () => {
      const queryFn = vi.fn().mockResolvedValue('data');

      const { isPending, execute } = useQuery({ queryFn, queryKey: 'b' });

      expect(isPending.value).toBe(false);

      execute();

      expect(isPending.value).toBe(true);

      await flushPromises();

      expect(isPending.value).toBe(false);
    });
  });

  describe('state management', () => {
    it.skip('shared data across components to deduplicate function calls when they share the same query key', async () => {
      const app = setupFakeApp();

      const queryClient = {};

      app.provide('query-client', queryClient);

      const queryFn = vi.fn(async () => 'data');

      const ComponentA = component(() => {
        useQuery({
          queryFn,
          queryKey: 'data',
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return 'a' as any;
      });

      const ComponentB = component(() => {
        useQuery({
          queryFn,
          queryKey: 'data',
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return 'b' as any;
      });

      const Container = component(({ children }) => {
        return children;
      });

      const Parent = component(() => {
        return (
          <Container>
            <ComponentA />
            <ComponentB />
          </Container>
        );
      });

      fakeMount(Parent);

      await flushPromises();
      expect(queryFn).toHaveBeenCalledTimes(1);
    });

    it.skip('does not share data across components when the query keys are different', async () => {
      const app = setupFakeApp();

      const queryClient = {};

      app.provide('query-client', queryClient);

      const queryFn = vi.fn(async () => 'data');

      const ComponentA = component(() => {
        useQuery({
          queryFn,
          queryKey: 'key-a',
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return 'a' as any;
      });

      const ComponentB = component(() => {
        useQuery({
          queryFn,
          queryKey: 'key-b',
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return 'b' as any;
      });

      const Container = component(({ children }) => {
        return children;
      });

      const Parent = component(() => {
        return (
          <Container>
            <ComponentA />
            <ComponentB />
          </Container>
        );
      });

      fakeMount(Parent);

      await flushPromises();
      expect(queryFn).toHaveBeenCalledTimes(2);
    });
  });
});
