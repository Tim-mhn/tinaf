import { component } from 'tinaf/component';
import { DocPageLayout } from '../../layouts';
import { Code, HighlightedText, InlineCode, TsxCode } from '../../components';

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

      <TsxCode
        code={`import { createRouter } from "tinaf/router"

const DashboardPage = component(() => ... )
const HomePage = component(() => ... )

const router = createRouter([
  {
    path: "/dashboard",
    component: DashboardPage
  },
  {
    path: "/",
    component: HomePage
  }
])`}
      />

      <p>and inject it to your app </p>

      <TsxCode
        code={`import { createRouter, ROUTER_PROVIDER_KEY} from "tinaf/router"
import { createApp } from "tinaf/render"

const router = createRouter([ ... ])
const App = component(() => ... )

const app = createApp(App);

app.provide(ROUTER_PROVIDER_KEY, router);
app.render("app")`}
      />

      <p>
        Tinaf supports various features such as
        <ul className="list-disc text-tm-400 mx-2">
          <li>Nested routes</li>
          <li>Dynamic params</li>
          <li>Re-directions</li>
        </ul>
      </p>

      <h3 className="text-2xl ">Nested routes</h3>

      <TsxCode
        code={`const router = createRouter([
  {
    path: "/dashboard",
    component: Dashboard,
    children: [
      {
        path: "/orders",
        component: Orders
      },
      {
        path: "/users",
        component: Users
      }
    ],
    path: "/",
    component: Home
  }])`}
      />

      <h3 className="text-2xl ">Dynamic params</h3>

      <p>
        Precede your dynamic param with the <InlineCode>:</InlineCode> character
        to mark it as a dynamic param
      </p>

      <TsxCode
        code={`const router = createRouter([
  {
    path: "/users/:userId",
    component: UserPage,
    children: [
      {
        path: "/orders/:orderId",
        component: OrdersPage
      }
    ]
  }
])`}
      />

      <p>
        You can retrieve the dynamic params using the{' '}
        <InlineCode>injectRouter</InlineCode> function{' '}
      </p>

      <TsxCode
        code={`// navigating to /users/bob/orders/1234
import { injectRouter } from "tinaf/router"

const router = injectRouter();
router.route.value.params; // { userId: "bob", orderId: "1234" }`}
      />

      <h3 className="text-2xl ">Re-directions</h3>

      <TsxCode
        code={`const router = createRouter([
  {
    path: '/foo', // '/foo' redirects to '/'
    redirect: '/',
  },
  {
    path: '/docs',
    redirect: '/docs/introduction', // '/docs' redirects to '/docs/introduction'
    component: Docs ,
    children: [
      {
        path: '/bar',
        redirect: '/introduction', // '/docs/bar' redirects to '/docs/introduction'
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
      />
    </DocPageLayout>
  );
});
