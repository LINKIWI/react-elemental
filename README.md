# react-elemental

[![npm version](https://badge.fury.io/js/react-elemental.svg)](https://badge.fury.io/js/react-elemental)
[![Build Status](https://travis-ci.org/LINKIWI/react-elemental.svg?branch=master)](https://travis-ci.org/LINKIWI/react-elemental)
[![Coverage Status](https://coveralls.io/repos/github/LINKIWI/react-elemental/badge.svg?branch=master)](https://coveralls.io/github/LINKIWI/react-elemental?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/LINKIWI/react-elemental.svg)](https://greenkeeper.io/)

Flat UI component library for React

## Demo and Documentation

See [linkiwi.github.io/react-elemental](https://linkiwi.github.io/react-elemental).

## Components

* `Alert`
* `Button`
* `Checkbox`
* `LoadingBar`
* `SelectList`
* `Spacing`
* `Tag`
* `TextArea`
* `TextField`
* `Text`

## Installation and Usage

```bash
$ npm install --save react-elemental
```

```javascript
import { bootstrap } from 'react-elemental';

// As early as possible in your client-side rendering path, invoke the bootstrapping function.
// This will inject some necessary global CSS into the document head and override default
// configuration parameters with those you specify.
bootstrap();

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
      label="Magical button"
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

bootstrap(colorOpts);
```

All respected override options are as follows:

#### `colorOpts`

|Key|Value|Example|
|-|-|-|
|`primary`|Hex color code string for the desired primary color.|`'#3eb8f0'`|
|`primaryLight`|Hex color code string for the desired primary light color.|`'#d6ecf5'`|
|`primaryDark`|Hex color code string for the desired primary dark color.|`'#036996'`|

## Guiding Principles

* Only inline styles, and no CSS (or at least as little CSS as possible)
* Minimalistic, simple design language

## Known Issues, Bugs, TODOs
* No consideration has been given to a11y.
