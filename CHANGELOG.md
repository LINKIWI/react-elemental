# Changelog

## v1.2.3

### Changed

* Forward compatibility with breaking changes introduced in React 17

## v1.2.2

### Added

* Support ref forwarding to the underlying native DOM element for `Button`, `Checkbox`, `Image`, `Link`, `TextArea`, `TextField`
* `durations` and `timing` as newly exported transition constants

### Changed

* `Modal` no longer shows a close icon when non-persistent (this is now abstracted out to the client)
* `SelectList` inherits parent width more naturally, and no longer requires an explicit numeric width be set
* `SelectList` supports `inverted` prop, to expand the selection options upwards rather than downwards
* `Tag` enables transitions, for consistency with other components
* Standardize transitions across all components with custom easing function
* Styles are now injected at bootstrap time, rather than at dependent component mount time

## v1.2.1

### Changed

* `Image` hides the alt text after the image has loaded
* `RadioGroup` button no longer becomes horizontally compressed for small widths
* `RadioGroup` no longer invokes the change callback for options that are already selected on click

## v1.2.0

### Added

* `Image` component for displaying external images
* `RadioGroup` component for radio controls

### Changed

* `Checkbox` is slightly smaller in size
* `RadioGroup` button is slightly larger in size
* Default `Button` type to `button`
* Respect semantic `disabled` attribute on `Button` when disabled
* `TextArea` defaults to the primary font style, instead of the secondary font style
* Support a secondary `TextArea` style
* Fixed secondary `TextField` missing `box-sizing` property
* Better secondary `TextField` adaptation to dark backgrounds
* Bumped `react` peer dependency version to `^16.4.0`

## v1.1.2

### Added

* Secondary style on `Tabs`
* New prop `fit` on `Tabs` to automatically size the widths of each tab item
* `Tabs` primary style now has a subtle hover effect

### Changed

* Fixed inconsistent border radius on `Tabs`
* Fixed inability to override padding on `Button`
* Secondary `TextField` now has a transparent background by default

## v1.1.1

### Added

* New `Elemental` component for a declarative abstraction over bootstrapping

### Changed

* `Button` no longer automatically blurs on `mouseleave` events
* Unnecessary explicit `Button` prop `onClick` removed
* `Button` applies click style for touch events
* `Button` now has a dedicated focus style, identical to the existing hover style
* Minor tweaks to the hover and active appearance of `Button`
* Fixed regression introduced in `Modal` where it would not expand to full height when the viewport height is too small
* `Checkbox` no longer uses a pointer hand when it is `disabled`
* `Link` has dedicated focus and active styles when using keyboard for navigation
* `Link` applies click style for touch events
* `Link` transition speed increased slightly

### Removed

* `react-elemental` no longer depends on `react-icons` and `radium`

## v1.1.0

### Added

* New `Spinner` component, which is now actually a spinner

### Changed

* `Spinner` is now renamed to `Pulsator`
* `Pulsator` takes prop `inactive` instead of `pulsate`; `inactive={true}` now has the same semantics as `pulsate={false}`
* `Toast` now adds inner spacing with `padding` rather than `margin`

## v1.0.1

### Changed

* `LoadingBar` default bounce delay increased by 25 ms
* `Modal` no longer automatically enforces padding on the modal contents

## v1.0.0

### Added

* `Label` component for text labels associated with input elements
* `LoadingBar` accepts new props `duration` and `delay` to override the animation duration and bounce delay, respectively
* `Tabs` component for segmenting option choices within the same semantic hierarchy

### Changed

* `Alert` no longer automatically adds a bottom margin, and delegates the responsibility of visibility (in the case of dismissible alerts) to the parent component
* `Button` secondary style is now sized identically to the primary style, and click outlines are removed
* `Checkbox` is now a controlled component; imperative APIs are deprecated
* `Link` now delegates the responsibility of styling to the parent component, and does not make any assumptions about font styling
* Fixed bug with `SelectList` where occasionally an option would not be selected despite clicking on it
* `SelectList` no longer fires `onChange` when clicking on the placeholder
* `Tag` now delegates the responsibility of visibility (in the case of dismissible tags) to the parent component
* Fixed nonexsitent hover/focus styles on `TextArea`

### Removed

* `LoadingBar`'s `width` and `position` props are deprecated in favor of passing them in directly as keys in a style override object
* `TextField`, `TextArea`, and `SelectList` no longer accept `label` and `sublabel`, in favor of the dedicated `Label` component
