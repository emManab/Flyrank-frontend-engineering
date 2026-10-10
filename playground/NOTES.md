# Notes: custom ARIA components vs shadcn/ui

I installed the `shadcn` CLI and added readable Dialog and Tabs component source under `src/components/ui/`. The shadcn-style wrappers compose Radix UI primitives; they are intentionally open code rather than black-box imports. This playground keeps the hand-written versions alongside them so the differences can be reviewed.

## Concrete gaps I found in my hand-written versions

1. **Modal focus lifecycle is easy to get subtly wrong.** My custom dialog has a small focus trap and restores focus, but it does not implement Radix's full dialog lifecycle, nested-dialog behavior, or robust handling for dynamically inserted/removed focusable elements. Radix also provides a portal and overlay primitive, which helps avoid stacking-context and clipping problems in complex layouts.
2. **Background interaction and accessibility isolation need more than a backdrop.** The custom dialog prevents body scrolling and traps Tab, but it does not fully isolate outside content from screen readers or pointer interaction, nor does it provide Radix's outside-interaction hooks and dismissal edge-case handling.
3. **Tabs keyboard behavior has more edge cases than a simple key handler.** My custom tabs implement Left/Right, Home/End, roving tabIndex, and automatic activation, but do not support vertical orientation (Up/Down), RTL direction nuances, or configurable manual activation. Radix handles orientation and direction as part of its primitive API.
4. **Generated wrappers standardize composition and typing.** The shadcn-style files use `forwardRef`, inherit primitive prop types with `ComponentPropsWithoutRef`, and provide consistent primitive composition. My custom components expose narrower purpose-built props, which are easier to understand but less composable.

## Keyboard test checklist

- **Dialog:** open using the trigger; Tab and Shift+Tab remain inside; Escape closes; close button works; focus returns to the trigger.
- **Tabs:** Tab enters the active tab; Left/Right moves and activates tabs; Home/End jumps to first/last; Tab moves into the active panel.
- **Disclosure:** Tab reaches the heading button; Enter/Space toggles; `aria-expanded` updates and `aria-controls` points to the panel.

## Review caveat

The custom dialog and tabs implement the core APG interactions for this exercise, not every edge case of a production accessibility primitive. Test with real keyboard navigation and a screen reader before reusing them in production.
