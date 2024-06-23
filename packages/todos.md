# Todos

- Classes: Improve the DX to pass classes to a component. classes could be a special keyword like children that's automatically passed to the first DOM child ✔

- Component: add option to pass string children that are simply rendered as text nodes ✔

- Lifecycle hooks: Implement some onMounted / onDestroy lifecycle hooks to better control subscriptions and avoid memory leaks ✔

- Routing: add the option to pass a route object (and not just a string)

- Routing: Nested RouterView ✔

- JSX:
  - working poc with no props
  - make work with props
  - make work with children
  - create plugin
  - make work with dom element: transform <div> <Foo /> </div> -> div(Foo())
  - make work with styles and event listeners ?

/dashboard/orders

<Header />
<RouterView /> /dashboard --> Dashboard
   --> <Dashboard>
           <DashboardHeader />
            <RouterView /> /orders --> OrdersPage
                --> <OrdersPage />
<Footer />

# Ideas

- Forms: Build a good Form API (Angular style ?)

- Http client or hook

- Routing: passing a string route that is not resolved should pass it as is in the <a> href attribute

- Routing: avoid rerendering the components when route changes but it's the same route pattern. ✔
