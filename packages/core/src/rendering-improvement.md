### Rendering improvement notes

#### Observations

More and more custom logic

- forLoop render
- input (update value based on reactive value changes)

No clear separation between the **mounting and subscriptions creation** and the **"simple rendering"** (rendering the view based on the current state)

### Proposition

```
interface Component {


  mount(): void; // create the subscriptions
  render(parent?: HTMLElement): ??this?? ;
}

types of components

class HTMLComponent {

  render() {
    return this.renderFn();
  }

  mount() {
    this.sources.subscribe(() => {
        const index = [...parent.childNodes].findIndex((n) => n === node);
        parent.removeChild(node as HTMLElement);

        node = safeRenderHtml(renderFn);

        parent.insertBefore(node, [...parent.childNodes][index]);

    })
  }

  unmount() {
    this.subscriptions.delete()
  }
}

class SimpleVComponent {
    render() {
        return this.renderFn();
    }

    mount() {
        watchAllSources(sources).subscribe(() => {
            const index = [...parent.childNodes].findIndex((n) => n === html);
            parent.removeChild(html);
            html = safeRenderHtml(renderFn);
            parent.insertBefore(html, [...parent.childNodes][index]);
        });
    }

    unmount = this.subscriptions.delete()
}

class ForLoopComponent {

    mount() {
          watchList(items).subscribe((changes) => {
    const childrenToRemove = changes
      .filter(({ change }) => change === 'removed')
      .map(({ index, value }) => {
        console.debug('Removing child ', value);
        return parent.childNodes[index];
      });

    childrenToRemove.forEach((child) => parent.removeChild(child));

    const childrenToAdd = changes
      .filter(({ change }) => change === 'added')
      .sort((a, b) => b.index - a.index);

    childrenToAdd.forEach(({ value, index }) => {
      const child = safeRenderHtml(componentFn(value).renderFn);
      console.debug('Adding child ', value);
      parent.insertBefore(child, [...parent.childNodes][index]);
    });

    }

    render(parent) {
        const children = toValue(items).map((i) =>
        safeRenderHtml(componentFn(i).renderFn)
        parent.append(...children)
    );
    }
}





30/03/24 Prop

class SimpleVComponent


sources
renderFn
child
html
parent


init(parent) {
  this.parent = parent;
  this.child = renderOneLevelDeep(renderFn)

  if (isComponent(child)) {
    child.init(parent)
    this.html = renderToHtml(renderFn)
  } else {
    this.html = this.child;
  }

  watch(sources).subscribe(() => {
    const index = [...parent.childNodes].findIndex(n => n === html);
    parent.removeChild(html)
    this.html = renderToHtml(renderFn)
    parent.insertBefore(html, [...parent.childNodes][index])
  })

  return this.html

}

```
