# Issues to fix

## Bug
- **script.js throws on every page except projects.html** — [script.js:76-88](script.js#L76-L88) calls
  `document.getElementById("lightbox-close").addEventListener(...)` (and same for `lightbox-next`/`lightbox-prev`)
  unconditionally. The `#lightbox` markup only exists on [projects.html](projects.html#L435-L451), so on
  `index.html`, `about.html`, and `contact.html` this throws `Cannot read properties of null` and kills the
  rest of the script on those pages. Fix: guard with `if (lightboxClose) {...}` or bail out early if
  `#lightbox` isn't found on the page.

## Accessibility
- **Project cards aren't keyboard-operable** — `.project-card` elements ([projects.html:51](projects.html#L51))
  only get a `click` listener ([script.js:69-73](script.js#L69-L73)). No `tabindex`, `role="button"`, or
  `keydown` handler, so keyboard users can't open the lightbox gallery at all.
- **Lightbox has no Escape key or click-outside to close** — only the small X button and arrow buttons work
  once `#lightbox` is open ([projects.html:435-451](projects.html#L435-L451)).

## Minor
- **Empty `src` on lightbox image** — [projects.html:440](projects.html#L440):
  `<img id="lightbox-img" src="" ...>`. Empty `src=""` can cause a spurious request to the current page URL
  in some browsers. Drop the attribute and only set it via JS.
- **Dead CSS** — [global.css:654-662](global.css#L654-L662) references `.contact-block address` and
  `.contact-value`, which don't exist in any HTML file (contact.html uses `.contact-card` instead), and sets
  `grid-template-columns` on `.contact-details`, which is `display: flex` so the declaration has no effect.
  Leftover from an earlier markup version — safe to remove.
- **Inconsistent `<title>` conventions** — `about.html` → "About - Architecture" (hyphen), `projects.html` →
  "Projects — Architecture" (em dash), while `index.html` and `contact.html` are both just "Architecture"
  (contact page title doesn't reflect it's the contact page).

## To confirm (design decision, not necessarily a bug)
- **No hero CTA buttons on desktop** — `index.html` hero's Projects/Contact buttons (`.btn-wrapper`) are
  `display: none` by default and only shown below 768px ([global.css:153-155](global.css#L153-L155),
  [global.css:620-624](global.css#L620-L624)). Confirm this is intentional — desktop visitors currently get
  no call-to-action in the hero.
