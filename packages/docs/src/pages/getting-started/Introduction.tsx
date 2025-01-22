import { component } from 'tinaf/component';
import { Divider, Link } from '../../components';
import { DocPageLayout } from '../../layouts';

export const IntroductionPage = component(() => {
  return (
    <DocPageLayout title="Introduction">
      <h3 className="text-4xl">What is Tinaf ?</h3>
      <p>
        Tinaf is a fun attempt to build a front-end framework, an equivalent of
        Vue, Angular or React. It merely serves an education role to
        understanding how front-end libraries and reactivity work.
      </p>

      <p>
        It is based on JSX, Vite and RxJS and takes a bit from the different
        popular frameworks out there.
      </p>

      <p>
        One of my main drivers was to understand how reactivity, and more
        specifically how{' '}
        <span className="text-accent ">fine-grained reactivity</span> work. See
        more about{' '}
        <Link href="/docs/reactivity" color="green">
          reactivity
        </Link>
        .
      </p>
      <p>
        You can check out the source code on{' '}
        <Link color="green" href="https://github.com/tim-mhn/tinaf">
          GitHub
        </Link>
        .
      </p>

      <p>
        Want to see what it looks like ?{' '}
        <Link color="green" href="/docs/quick-start">
          Let's get started !
        </Link>
      </p>
    </DocPageLayout>
  );
});
