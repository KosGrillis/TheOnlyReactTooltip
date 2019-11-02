# the-only-react-tooltip (you'll ever need)

Why does every React tooltip package have to be so bloated and complex? Use `the-only-react-tooltip` when you:
* Just want a tooltip that acts like a tooltip
* Care about accessibility
* [Don't want the extra bloat](https://bundlephobia.com/result?p=the-only-react-tooltip)

## Installation

```sh
npm install the-only-react-tooltip
```

## Usage
**Using NPM**

1 . Import `the-only-react-tooltip` after installation

```js
import Tooltip from 'the-only-react-tooltip'
```

2 . Wrap your DOM nodes or React components with `Tooltip` (They will be used as the hover target):
```jsx
<Tooltip body={"I'll be shown on hover of YourReactComponent"}>
  <YourReactComponent ... />
</Tooltip>
```

## Props

Name            | Type                                            | Required? | Default | Notes
|:---           |:---                                             |:---       |:---     |:--
`children`      | `ReactNode`                                     | Yes       | -       | The hover target to display the tooltip is added to `children`, and the `DOMRect` of `children ` is used to correctly position the tooltip.
`body`          | `ReactNode`                                     | Yes       | -       | Contents of the tooltip. It's suggested to use a plain string, but arbitrary `ReactNode`'s are allowed to permit for styled strings and component library string components.
`position`      | `"top"` \| `"bottom"` \| `"left"` \| `"right"`  | No        | -       | Override the default positioning algorithm and always show the string on one side.
`title`         | `string`                                        | No        | -       | For accessibility - if the tooltip can't be shown, this will be added to `children` as the `title` attribute and shown instead.
`ariaEssential` | `boolean`                                       | No        | `false` | Sets the ARIA importance of the tooltip. `true` -> `aria-labelledBy` (implies essential information), `false` -> `aria-describedBy` (implies additional information). If you're setting this to true, rethink your use of a tooltip!

## License

MIT

## Maintainers

[kgrillis](https://github.com/kgrillis)