# the-only-react-tooltip (you'll ever need)

![the-only-react-tooltip](https://raw.githubusercontent.com/KosGrillis/TheOnlyReactTooltip/master/README_example.png)

Why does every React tooltip package have to be so bloated and complex? Use `the-only-react-tooltip` when you:
* Just want a tooltip that acts like a tooltip
* Care about accessibility
* [Don't want the extra bloat](https://bundlephobia.com/result?p=the-only-react-tooltip)

Includes definitions for TypeScript.

### Notes on accessibility

Tooltips shouldn't break accessibility, but they often do. This package does it's best to be as accessible as possible:
* Tooltip appears on hover, on focus events (such as tab), and on touch events.
* Tooltip can be dismissed by pressing escape, or by touching anywhere on the page.
* Uses the HTML native title attribute when the tooltip can't be displayed (see [props](#props) below).
* Uses all relevant ARIA attributes (see [props](#props) below).

The developer should still be responsible! Try not to display anything more than basic text, and don't display tooltips on UI elements that can be interacted with in some other way, like a non-disabled button (mobile users won't have time to read the tooltip before the button action is executed).

See how this component adheres to the [ARIA design pattern for tooltips](https://www.w3.org/TR/wai-aria-practices/#tooltip).

## Installation

[![NPM](https://nodei.co/npm/the-only-react-tooltip.png?downloadRank=true&stars=true)](https://nodei.co/npm/the-only-react-tooltip/)

Via NPM or Yarn:
```sh
npm install the-only-react-tooltip
yarn add the-only-react-tooltip
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
`position`      | `"top"` \| `"bottom"` \| `"left"` \| `"right"`  | No        | -       | Override the default positioning algorithm and always show the tooltip on one side.
`title`         | `string`                                        | No        | -       | For accessibility - if the tooltip can't be shown, this will be added to `children` as the `title` attribute and shown instead.
`ariaEssential` | `boolean`                                       | No        | `false` | Sets the ARIA importance of the tooltip. `true` -> `aria-labelledBy` (implies essential information), `false` -> `aria-describedBy` (implies additional information). If you're setting this to true, rethink your use of a tooltip!

## Example / Local development

This package ships with a basic example served with `webpack-dev-server`. This can be used to test changes during development:

```sh
npm run dev
```

## License

MIT - see `license.md` for full details.

## Maintainers

[kgrillis](https://github.com/kgrillis)