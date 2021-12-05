![react-elemental](https://static.kevinlin.info/blog/react-elemental/banner.png)

**React Elemental** is a modern, flat UI library built for React. It is built for maximum development velocity: there is no CSS to import and no additional parameters to add to your Webpack configuration. React Elemental has first-class support for ES6/JSX and works effortlessly with SSR.

See the [official documentation site](https://react-elemental-docs.static.kevinlin.info) for demos, examples, and detailed documentation for each available UI component.

![React Elemental](https://static.kevinlin.info/blog/react-elemental/hero.png)

## Installation

```bash
$ npm install --save https://lib.kevinlin.info/react-elemental/<commit hash>/release.tgz
```

## Usage

React Elemental exports UI components that you can use directly in your `render` function. However, you must first bootstrap (initialize) the library in order to set configuration globals. You can do this either *declaratively* using the provided `Elemental` React component (recommended) or *imperatively* by invoking the exported `bootstrap` function.

#### Using the `Elemental` component

At the top level of your application, instantiate an `Elemental` component and pass the rest of your application as its children. Configuration parameters are specified as props (available options are defined below).

```javascript
import React from 'react';
import { Elemental } from 'react-elemental';

const App = () => (
  <Elemental {...configOpts}>
    application children
  </Elemental>
);

export default App;
```

#### Using `bootstrap` directly

As early as possible in your client-side rendering path, invoke the bootstrapping function (available options are defined below).

```javascript
import React from 'react';
import { bootstrap } from 'react-elemental';

bootstrap(...);

const App = () => {
  ...
};

export default App;
```

#### Using exported Elemental UI components

```javascript
import React from 'react';
import { Button, Spacing, Text } from 'react-elemental';

const MyComponent = ({ onClick }) => (
  <Spacing bottom>
    <Text size="epsilon" bold>
      Hello world!
    </Text>
    <Button
      text="Click me"
      onClick={onClick}
    />
  </Spacing>
);

export default MyComponent;
```

## Options

To optionally specify overrides for global constants, you can pass props to the `Elemental` top-level component, or invoke the bootstrapping function with parameters:

```javascript
import React from 'react';
import { bootstrap } from 'react-elemental';

// Declarative
<Elemental fontOpts={fontOpts} colorOpts={colorOpts}>
  children
</Elemental>

// Imperative
bootstrap(fontOpts, colorOpts);
```

All respected override options are as follows:

#### `fontOpts`

|Key|Value|Example|
|-|-|-|
|`primary.regular`|URL to the primary regular font.|`'url(data:application/x-font-ttf;base64,...)'`|
|`primary.bold`|URL to the primary bold font.|`'url(data:application/x-font-ttf;base64,...)'`|
|`secondary.regular`|URL to the secondary regular font.|`'url(data:application/x-font-ttf;base64,...)'`|
|`secondary.regular`|URL to the secondary bold font.|`'url(data:application/x-font-ttf;base64,...)'`|

#### `colorOpts`

|Key|Value|Example|
|-|-|-|
|`primary`|Hex color code string for the desired primary color.|`'#3eb8f0'`|
|`primaryLight`|Hex color code string for the desired primary light color.|`'#d6ecf5'`|
|`primaryDark`|Hex color code string for the desired primary dark color.|`'#036996'`|

## Babel plugin

You may **optionally** include [`babel-plugin-react-elemental`](https://github.com/LINKIWI/babel-plugin-react-elemental) with your project to automatically transform imports so that only the components used by your application are bundled. This reduces the final application bundle size by reducing the library footprint.

## Development

It is easiest to symbolically link the sample project's `react-elemental` dependency to the root project. Then, auto-transpile on source changes and auto-rebuild the sample project on dependency changes.

```bash
$ npm install
$ npm run build:watch &
$ cd sample
$ npm install
$ rm -rf node_modules/react-elemental
$ ln -s ../.. node_modules/react-elemental
$ npm run start
```
