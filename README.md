# react-elemental

[![npm version](https://badge.fury.io/js/react-elemental.svg)](https://badge.fury.io/js/react-elemental)
[![Build Status](https://travis-ci.org/LINKIWI/react-elemental.svg?branch=master)](https://travis-ci.org/LINKIWI/react-elemental)
[![Coverage Status](https://coveralls.io/repos/github/LINKIWI/react-elemental/badge.svg?branch=master)](https://coveralls.io/github/LINKIWI/react-elemental?branch=master)
[![Dependencies](https://david-dm.org/LINKIWI/react-elemental.svg)](https://david-dm.org/LINKIWI/react-elemental)

**React Elemental** is a modern, flat UI library built for React. It is built for maximum development velocity: there is no CSS to import and no additional parameters to add to your Webpack configuration. React Elemental has first-class support for ES6/JSX and works effortlessly with SSR.

See the [official documentation site](https://linkiwi.github.io/react-elemental-docs) for demos, examples, and detailed documentation for each available UI component.

## Installation

```bash
$ npm install --save react-elemental
```

Note that the Elemental fonts are not bundled directly with the component library. This cuts down
the size of `react-elemental` and allows you to inject fonts of your choosing into the library. To
use the standard Elemental fonts, see the installation instructions of
[`react-elemental-fonts`](https://www.npmjs.com/package/react-elemental-fonts).

## Usage

```javascript
import { bootstrap } from 'react-elemental';

// As early as possible in your client-side rendering path, invoke the bootstrapping function.
// This will inject some necessary global CSS into the document head and override default
// configuration parameters with those you specify.
bootstrap(...);

const App = () => {
  ...
};

export default App;
```

```javascript
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

You can optionally invoke the bootstrapping/initialization function with objects specifying
overrides for global constants used by `react-elemental`:

```javascript
import { bootstrap } from 'react-elemental';

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
