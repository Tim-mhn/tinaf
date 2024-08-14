# T.I.N.A.F.

<a href="https://www.npmjs.com/package/tinaf"><img src="https://img.shields.io/npm/v/tinaf.svg?style=flat&colorA=18181B&colorB=28CF8D" alt="Version"></a>

<b>This Is Not A Framework</b>

<p>This project is a humble attempt to build a basic front-end library with <i>fine-grained reactivity</i> to better understand reactivity systems.

## Get started with the starter app

Run this command and follow the prompts
`npx create-tinaf` or `yarn create tinaf`

## How it works

This library is based on a custom JSX implementation, with strong inspiration from SolidJS.

Here is how to get started (if you don't want to follow the starter app `create-tinaf`)

### Hello World (with Vite)

```

// index.html
<head>
    <script type="module" src="./main.ts"></script>
</head>
<body>
    <div id="container" > </div>
</body>


// App.tsx
export const App = component(() => <div>Hello World</div>)

// main.ts
import { createApp } from "tinaf/render";
import { App } from './App'

const app = createApp(App)
app.render('container')
```

### Reactivity system

Reactive values are created with `reactive`. The system is based on [RxJS](https://github.com/ReactiveX/rxjs) and inspired from Vue's refs system.

```
import { reactive } from "tinaf/reactive";

const count = reactive(0);
count.update(2);
count.update(3);
console.log(count.value); // 3
```

Create computed values with `computed`.

```
const count = reactive(1);
const double = computed(() => count.value * 2)
```

### Component

Let's create a component that uses a reactive value

```
import { component } from "tinaf/component";
import { reactive } from "tinaf/reactive";
import { useInterval } from "tinaf/common-hooks";

const Counter = component(() => {
    const count = reactive(0);
    // increments the value by 1 every second
    useInterval(() => count.update(count.value + 1, 1000)
    return <div>{count}</div>
})
```

### Component props

```
// DemoCard.tsx
import { component } from "tinaf/component";

const Card = component<{ title: string; subtitle: string}>(( { title, subtitle}) => {
    return <div>
            <h1> {title} </h1>
            <h2> {subtitle} </h2>
        </div>
})


const DemoCard = component(() => {
    return <Card title="TINAF" subtitle="The new framework in town" />
})

```

### Control-flow (for-loop & if/else)

#### For loop

To render a list of components, use the `<For />` component

```
import { For } from 'tinaf/component';

const FruitsList = component(() => {
    const fruits = ['apple', 'pear', 'banana'];

    return <ul>
        <For each={fruits}>{ (fruit: string) => <li> {fruit} </li> } </For>
    </ul>
})
```

#### If/Else

To conditionnally render a component or a fallback, use the `<Show />` component (heaviliy inspired from Solid's [Show](https://docs.solidjs.com/concepts/control-flow/conditional-rendering)

```
import { component, Show } from "tinaf/component";
import { bool } from "tinaf/reactive";

export const ShowExample = component(() => {
    const [isHappy, toggleMood] = bool(true)

    return <div>
      <Show when={condition} fallback={<div> sad! </div>} >
        <div> happy ! </div>
      </Show>
      <button onClick={toggleMood} > click to toggle mood </button>
    </div>
})
```

### Styling

TODO: add examples with dynamic classes or styles

### Event Handling

Use the `on` method

```
const Example = component(() => {
    const handleClick = () => console.log('clicked !')
    return <button onClick={handleClick}> Click me ! </button>
})
```

## Routing

See more info [here](https://github.com/Tim-mhn/tinaf/blob/main/docs/routing.md)

## Inspirations

- <b>React & Solid</b> with JSX
- <b>Vue</b> and its Ref system
- <b>Angular</b> and its heavy use of RxJS
