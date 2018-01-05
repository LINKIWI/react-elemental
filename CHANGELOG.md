# Changelog

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
