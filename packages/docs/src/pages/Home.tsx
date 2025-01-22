import { component } from 'tinaf/component';
import { Button, Divider, Link } from '../components';
import { injectRouter, RouterLink } from 'tinaf/router';

const SupportedFeatures = component(() => {
  return (
    <div className="flex flex-col gap-4 px-8">
      <div className="text-3xl md:text-5xl text-accent-2">
        Supported Features
      </div>

      <ul className="list-disc px-4 text-xl md:text-2xl">
        <li>For loops</li>
        <li>Conditional Rendering</li>
        <li>Event Handling</li>
        <li>Routing</li>
        <li>Dynamic Params Matching</li>
        <li>Server State & HTTP Fetching</li>
        <li>Conditional styles</li>
      </ul>
    </div>
  );
});

const InspiredBy = component(() => {
  return (
    <div className="flex flex-col gap-4 px-8">
      <div className="text-3xl md:text-5xl  text-accent">Inspired by</div>

      <ul className="list-disc px-4  text-xl md:text-2xl">
        <li>
          JSX: <Link href="https://react.dev/">Reactjs</Link> &{' '}
          <Link href="https://www.solidjs.com/"></Link>
          Solid
        </li>
        <li>
          {' '}
          Reactivity System:{' '}
          <Link color="green" href="https://vuejs.org/">
            {' '}
            Vue
          </Link>{' '}
          & <Link href="https://www.rxjs.dev">RxJS</Link>
        </li>
        <li>
          Server State:{' '}
          <Link color="green" href="https://tanstack.com/">
            TanStack Query
          </Link>
        </li>
      </ul>
    </div>
  );
});

const MainCaption = component(() => {
  return (
    <div className="flex flex-col gap-4 md:gap-32 py-4">
      <div className="mx-auto justify-center items-center flex flex-col gap-1 md:gap-4 text-6xl md:text-9xl c">
        <div className="text-center"> This Is Not A Framework </div>
        <div className="text-5xl font-extralight"> T.I.N.A.F. </div>
      </div>
      <div className="text-center text-tm-300 text-lg md:text-2xl   mx-auto md:max-w-7xl">
        A fun attempt to build a mini front-end library with&nbsp;
        <Link href="https://docs.solidjs.com/advanced-concepts/fine-grained-reactivity">
          fine-grained reactivity
        </Link>{' '}
        and{' '}
        <Link href="https://react.dev/learn/writing-markup-with-jsx">JSX</Link>
      </div>
    </div>
  );
});

export const Home = component(() => {
  const router = injectRouter();

  return (
    <div className="flex flex-col  max-w-full">
      <MainCaption />

      <div className="flex flex-col gap-8 md:gap-16">
        <Divider />
        <div className="flex justify-center items-center">
          <Button onClick={() => router.navigate('/docs/introduction')}>
            Get started
          </Button>
        </div>

        <Divider />
        <div className="flex flex-col md:flex-row gap-16">
          <SupportedFeatures />
          <InspiredBy />
        </div>
      </div>
    </div>
  );
});
