# react-elemental

[![npm version](https://badge.fury.io/js/react-elemental.svg)](https://badge.fury.io/js/react-elemental)
[![Build Status](https://travis-ci.org/LINKIWI/react-elemental.svg?branch=master)](https://travis-ci.org/LINKIWI/react-elemental)
[![Coverage Status](https://coveralls.io/repos/github/LINKIWI/react-elemental/badge.svg?branch=master)](https://coveralls.io/github/LINKIWI/react-elemental?branch=master)
[![Size](http://img.badgesize.io/LINKIWI/react-elemental/gh-pages/react-elemental.js.svg)](https://github.com/LINKIWI/react-elemental/blob/gh-pages/react-elemental.js)
[![Gzip Size](http://img.badgesize.io/LINKIWI/react-elemental/gh-pages/react-elemental.js.svg?compression=gzip)](https://github.com/LINKIWI/react-elemental/blob/gh-pages/react-elemental.js)
[![Dependencies](https://david-dm.org/LINKIWI/react-elemental.svg)](https://david-dm.org/LINKIWI/react-elemental)

Flat UI component library for React

## Demo and Documentation

See [linkiwi.github.io/react-elemental](https://linkiwi.github.io/react-elemental).

## Components

#### `Alert`

Alerts are used to educate the user about the current state of the application.

![Info alert](https://linkiwi.github.io/react-elemental/images/alert/info.png)

![Success alert](https://linkiwi.github.io/react-elemental/images/alert/success.png)

![Warn alert](https://linkiwi.github.io/react-elemental/images/alert/warn.png)

![Error alert](https://linkiwi.github.io/react-elemental/images/alert/error.png)

#### `Button`

Buttons convey user actionability.

![Button](https://linkiwi.github.io/react-elemental/images/button/beta.png)

#### `Checkbox`

Checkboxes denote opt-in choices controlled by the user.

![Unchecked](https://linkiwi.github.io/react-elemental/images/checkbox/unchecked.png)

![Checked](https://linkiwi.github.io/react-elemental/images/checkbox/checked.png)

#### `Link`

Links are textual prompts for navigation events.

![Primary](https://linkiwi.github.io/react-elemental/images/link/primary.png)

#### `LoadingBar`

Animated component to indicate indeterminate progress.

#### `Modal`

Modals are used to present temporarily-relevant UI elements in a overlayed dialog.

![Beta](https://linkiwi.github.io/react-elemental/images/modal/beta.png)

#### `SelectList`

Select lists are used to allow users to choose one item from a dropdown menu of items.

![Idle](https://linkiwi.github.io/react-elemental/images/select-list/idle.png)

![Error](https://linkiwi.github.io/react-elemental/images/select-list/error.png)

#### `Spacing`

Spacing elements are used as containers to add margins and padding.

#### `Tag`

Tags serve as simple, textual status indicators.

![Primary](https://linkiwi.github.io/react-elemental/images/tag/primary.png)

![Red](https://linkiwi.github.io/react-elemental/images/tag/red.png)

![Green](https://linkiwi.github.io/react-elemental/images/tag/green.png)

![Dismissable](https://linkiwi.github.io/react-elemental/images/tag/dismissable.png)

#### `Text`

Text elements automatically apply font styles and sizes. The Elemental typeface is Karla (primary),
and Source Code Pro (secondary).

![Primary](https://linkiwi.github.io/react-elemental/images/text/primary.png)

![Secondary](https://linkiwi.github.io/react-elemental/images/text/secondary.png)

#### `TextArea`

Allow the user to enter an arbitrary-length text blob.

![Idle](https://linkiwi.github.io/react-elemental/images/text-area/idle.png)

#### `TextField`

Text fields are used for accepting user text input.

![Idle](https://linkiwi.github.io/react-elemental/images/text-field/idle.png)

#### `Toast`

Toasts are used to present temporary notification alerts.

![Idle](https://linkiwi.github.io/react-elemental/images/toast/idle.png)

#### `Tooltip`

Tooltips are used to provide contextual information on specific elements for purposes of user
education.

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

## Guiding Principles

* Only inline styles, and no CSS (or at least as little CSS as possible)
* Minimalistic, simple design language
