# Routing

Tinaf uses 2 main objects for routing: `Router` and `RouterView`.

- `Router` handles the client-side navigation
- `RouterView` tells the router where to render the components

## Basics

### 1. Define the routes

```

const Home = component(() => "Home")
const Foo = component(() => "Foo")
const Bar = component(() => "Bar")

 const routes = [
{
    path: '/foo',
    component: Foo
},
{
    path: '/bar',
    component: Bar
},
{
    path: '/',
    component: Home
}]
```

### 2. Create the router

```
import { createRouter } from 'tinaf/router';

const routes = [ ... ]
const router = createRouter(routes)
```

### 3. Provide the router to the app

```
const router = createRouter(routes);

const App = component(() => {
    return div(
        div('Header'),
        RouterView(), --> this is where the components will be rendered
        div('Footer')

    )
})


const app = createApp(App)
app.provide(ROUTER_PROVIDER_KEY, router);

app.render('app'); // 'app' should match the id of the main container in your index.html file



```

## Pattern matching

Tinaf supports pattern matching using the `:<param>` syntax

```
 const routes = [
 {
    path: '/:productId',
    component: Product
 }
]
```

When navigating to /product/123, we will render the `Product` component.

**NB**: navigating from `/product/123` to `/product/456` will not trigger a re-render. You need to react the the route changes. See more below

## Nested routes

You can have nested routes using the `children` prop in your routes.

```

const DashboardContainer = component(() => {
    return div(
        div('Dashboard Header'),
        RouterView(),
    )
})
const routes = [
 {
    path: '/dashboard',
    component: DashboardContainer,
    children: [{
        path: '/favorites',
        component: Favorites
    },{
        path: 'profile',
        component: Profile
    }]
 }
]

const App = component(() => {
    return div(
        Header()
        RouterView(),
        Footer()
    )
})
```

Navigating to `/dashboard/favorites` will render the following (virtual) DOM

```
<div>
 <Header />

 <div>
   <div>Dashboard Header</div>
   <Favorites/>
 </div>

 <Footer />

</div>
```

## Reactive Route

You can access the router object using `injectRouter`

```
const router = injectRouter();
const route = router.route;
```

`route` will be a `Reactive<RouterLocation>` object

```
type RouterLocation = {
  path: string;
  params: Record<string, string>;
};
```

When using a dynamic param, if you want to fetch data on the param value, you can do the following

```
const routes = [
    ...,
    path: '/:productId',
    component: ProductPage
]

// ProductPage.ts

declare function getProduct(productId: string): Product;

const ProductPage = component(() => {
    const router = injectRouter();

    const productId = computed(
      () => router.route.value.params.productId,
    );

   const product = computed(() => getProduct(productId.value));

   const { title } = toReactiveProps(product);

   return div(title)

})
```
