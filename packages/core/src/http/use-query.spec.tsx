import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fakeMount } from '../test-utils/fake-mount';
import { flushPromises } from '../test-utils/flush-promises';
import { component } from '../component';
import { setupFakeApp } from '../test-utils/fake-app';
import type { TinafApp } from '../render';
import { createQueryClientProvider, QueryClient, useQuery, type QueryFn } from './use-query';


describe('useQuery', () => {
  let queryClient! :QueryClient 

  let app!: TinafApp;

  beforeEach(() => {
    app = setupFakeApp();
    const queryClientProvider = createQueryClientProvider()
    app.use(queryClientProvider)
    queryClient= queryClientProvider.value

  });

  afterEach(() => {
    queryClient.reset();
  });

  async function setup<T>({ queryFn, initialValue }: { queryFn: QueryFn<T>, initialValue?: T }) {
    let data!: ReturnType<typeof useQuery<T>>['data'];
    let error!: ReturnType<typeof useQuery<T>>['error'];


    const TestComponent = component(() => {
      const { data: _data, error: _error } = useQuery(
        {
          queryFn,
          queryKey: 'a',
          initialValue
        },
      );

      // @ts-expect-error _data
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
        return 'data';
      });
      const { data } = await setup({ queryFn });


      expect(data.value).toBe('data');
    });

    it('allows to pass an initial value', async () => {

      const queryClient = new QueryClient();
      
      const { data } = useQuery({ queryKey: 'my-query', queryFn: vi.fn(), initialValue: 'initial value' },{
        queryClient
      });

      expect(data.value).toEqual('initial value')
    })

    it('is pending when the query is being executed until the queryFn completes', async () => {

      const queryClient = new QueryClient();

      const queryFn = vi.fn().mockResolvedValue('data');

      const { isPending, execute } = useQuery(
        { queryFn, queryKey: 'c' },
        { queryClient}
      );

      expect(isPending.value).toBe(false);

      execute();

      expect(isPending.value).toBe(true);

      await flushPromises();

      expect(isPending.value).toBe(false);

      await flushPromises();

    });
  });

    it('if it fails, it returns an error', async () => {
      const queryFn = vi.fn().mockRejectedValue('an error occurred');

      const { data, error } = await setup({ queryFn });
      expect(data.value).toBeUndefined();
      expect(error.value).toBe('an error occurred');
    });


    it('emits the latest value of data in case we subscribe lately to the data', async () => {
      const queryClient = new QueryClient();

      

      const {  data, execute } = useQuery(
        { queryFn: () => 'data', queryKey: 'a' },
        { queryClient}
      );

      let value: string | undefined;
      execute()

      await flushPromises()

      data.valueChanges$.subscribe(v => value = v)


      
      expect(value).toBe('data');

    })



  describe('state management', () => {
    it('shared data across components to deduplicate function calls when they share the same query key', async () => {
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

      // @ts-expect-error children not yet correctly typed
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

    it('does not share data across components when the query keys are different', async () => {
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

      // @ts-expect-error children not yet correctly typed
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
