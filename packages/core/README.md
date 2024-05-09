# TINAF

<a href="https://www.npmjs.com/package/tinaf"><img src="https://img.shields.io/npm/v/tinaf.svg?style=flat&colorA=18181B&colorB=28CF8D" alt="Version"></a>

<b>This Is Not A Framework. Not even a library. Do not try to use it :)</b>

<p>This project is a humble attempt to build a basic front-end library with <i>somewhat fine-grained reactivity</i> to better understand reactivity systems.

## Get started

This is fully JS/TS based. Here is how it works.

### Hello world

```

// index.html
<head>
    <script type="module" src="./main.ts"></script>
</head>
<body>
    <div id="app" > </div>
</body>

// main.ts
import { renderApp } from "tinaf/render";
import { div } from "tinaf/dom";

const App = div('Hello world')

renderApp('app', App())
```

### Reactivity system

Reactive values are created with `reactive`. The system is based on the great [RxJS](https://github.com/ReactiveX/rxjs)

```
import { reactive } from "tinaf/reactive";

const count = reactive(0);
count.update(2);
count.update(3);
console.log(count.value); // 3
```

Create computed values with `computed`. You have to pass the array of reactive values it depends on.

```
const count = reactive(1);
const double = computed(() => count.value * 2, [count])
```

### Component

Let's create a component that uses a reactive value

```
import { component } from "tinaf/component";
import { reactive } from "tinaf/reactive";

const Counter = component(() => {
    const count = reactive(0);
    // updates the value by 1 every second
    setInterval(() => count.update(count.value + 1), 1000)

    return div(count)
})
```

### Component props

**NB: this is not availale since the rewrite of the reactivity system**

Use the `componentWithProps` function

```
import { componentWithProps } from "tinaf/component";

const Card = component<{ title: string; subtitle: string}>(( { title, subtitle}) => {
    return div(
        div(title),
        div(subtitle)
    )
})


const MyCard = component(() => {
    return Card({ title: "Hello world", subtitle: "How are you ?"})
})

```

### Control-flow (conditional rendering)

Traditional _if/else_ syntax does not work, like it would in React or Solid :(
To achieve this, use the `show` function

```
import { when } from 'tinaf/component';

const ShowWhenExample = component(() => {
    // 'bool' is a helper around 'reactive' similar to React's useState
    const [show, toggleShow] = bool(true);

    return when(show).render(div('hello'))
})

const ExampleWithFallback = component(() => {
    const [show, toggleShow] = bool(true);

    const hello = div('hello')
    const fallback = div('this is a fallback')

    return when(show).render(hello).else(fallback))
})
```

### Styling

Add (dynamic) classes using `addClasses`

```
const Example = component(() => {

   const [active, _] = bool(true);

   const backgroundClass = computed(() => active.value ? 'bg-blue-300' : 'bg-red-300', [active])

   return div('Hello').addClasses([backgroundClass, 'text-sm', 'border', 'border-slate-300'])
})
```

Add (dynamic) styles using `addStyles`

```
const Example = component(() => {

   const [active, _] = bool(true);

   const backgroundColor = computed(() => active.value ? 'blue' : 'red', [active])

   return div('Hello').addStyles({
      background: backgroundColor,
      border: '1px solid black'
   })
})
```

### Event Handling

Use the `on` method

```

const Example = button('Click to log').on({
    click: console.log
})
```

### Wrapping-up

```
import { component, componentWithProps } from "tinaf/component";
import { div, button } from "tinaf/dom";
import { reactive, computed, bool } from "tinaf/reactive";

const Card = component<{ title: string; subtitle: string}>(({ title, subtitle}) => {

    return div(
        div(title).addClasses('text-lg font-bold'),
        div(subtitle).addClasses('text-md font-light')
    ).addClasses('flex flex-col gap-2 border border-slate-300 rounded-lg')
})

const Button = component(() => {
  const [active, toggleActive] = bool(true);

   const buttonText = computed(() => active.value ? 'Deactivate' : 'Activate', [active]);
   const buttonClasses = computed(() => active.value ? 'bg-green-300 border-green-300' : 'bg-slate-300 border-slate-400')

   return button(buttonText)
       .addClasses(['border', 'rounded-sm', buttonClasses])
       .on({
          click: toggleActive
       })
})

const Example = component(() => {
   return div(
      Card({ title: 'Hello', subtitle: 'How are you ?'}),
      Button(),
   ).addClasses('flex gap-4')

})

```

## Inspirations

- <b>React</b> with JSX, even though this is just JS/TS and not JSX/TSX
- <b>Vue</b> and its Ref system
- <b>Angular</b> and its heavy use of RxJS
