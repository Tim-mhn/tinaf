import { component } from 'tinaf/component';
import { DocPageLayout } from '../../layouts';
import { Code, HighlightedText, InlineCode } from '../../components';

export const RoutingPage = component(() => {
  return (
    <DocPageLayout title="Routing">
      <p>
        Tinaf comes with&nbsp;
        <HighlightedText>single-page application routing</HighlightedText>
        {', '}
        similar to Vue Router, React Router or Angular Router. There are 2
        important entities:
      </p>

      <ul className="list-disc">
        <li>
          <InlineCode>Router</InlineCode>: maps a url to a component
        </li>
        <li>
          <InlineCode>{`<RouterView />`}</InlineCode>: specifies where to insert
          route components.
        </li>
      </ul>

      <p>
        <InlineCode>{`<RouterView />`}</InlineCode> is the equivalent to
        Angular's <InlineCode>{`<router-outlet />`}</InlineCode> or Vue's{' '}
        <InlineCode>{`<router-view />`}</InlineCode>
      </p>

      <p>Create your first router with a list of routes</p>

      <Code>
        {`import { createRouter } from "tinaf/router"`}
        <br></br>
        {`const router = createRouter([`}
        <br />
        {`{`}
        <br />
        {`path: "/dashboard,`}
        <br />
        {`component: DashboardPage`}
        <br /> {`},`}
        <br />
        {` {`}
        <br />
        {` path: "/",`}
        <br />
        {` component: HomePage`}
        <br />
        {`}])`}
      </Code>

      <p>and inject it to your app </p>

      <Code>
        {`import { createRouter, ROUTER_PROVIDER_KEY } from "tinaf/router"`}
        <br></br>
        {`import { createApp } from "tinaf/render"`}
        <br /> <br />
        {`const router = createRouter([ ... ])`}
        <br />
        {`const app = createApp(App)`}
        <br />
        {`app.provide(ROUTER_PROVIDER_KEY, router)`}
        <br />
        {`app.render('app')`}
      </Code>

      <p>
        Tinaf supports various features such as
        <ul className="list-disc text-tm-400 mx-2">
          <li>Nested routes</li>
          <li>Dynamic params</li>
          <li>Re-directions</li>
        </ul>
      </p>

      <h3 className="text-2xl ">Nested routes</h3>

      <Code>
        {`
        
        createRouter([
        {
          path: '/dashboard',
          component: Dashboard,
          children: [
            {
                path: '/orders',
                component: Orders
            },
            {
                path: '/users',
                component: Users
            }
          ]
        },
        {
          path: '/',
          component: Home
        }
        ])
        `}
      </Code>

      <h3 className="text-2xl ">Dynamic params</h3>

      <p>
        Precede your dynamic param with the <InlineCode>:</InlineCode> character
        to mark it as a dynamic param
      </p>
      <Code>
        {`
        
        createRouter([
        {
          path: '/users/:userId',
          component: UserPage,
          children: [{
             path: '/orders/:orderId'
          }]
        },
        ])
        `}
      </Code>

      <p>
        You can retrieve the dynamic params using the{' '}
        <InlineCode>injectRouter</InlineCode> function{' '}
      </p>

      <Code>
        {`navigating to /users/bob/orders/1234`}
        <br />
        <br />

        {`const router = injectRouter();`}
        <br />
        {`router.route.value.params; // { userId: "bob", orderId: "1234" }`}
      </Code>
      <h3 className="text-2xl ">Re-directions</h3>

      <Code>
        {`
        const router = createRouter([
          {
            path: '/foo',
            redirect: '/',
          },
          {
            path: '/docs',
            redirect: '/docs/introduction',
            component: Docs ,
            children: [
              {
                path: '/bar',
                redirect: '/introduction',
              },
              {
                path: '/introduction',
                component: IntroductionPage ,
              },
              {
                path: '/quick-start',
                component: QuickStartPage ,
              },
            ],
          },
          {
            path: '/',
            component: Home ,
          },
        ]);`}
      </Code>
    </DocPageLayout>
  );
});
