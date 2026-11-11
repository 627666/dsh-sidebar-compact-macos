/**
 * Client half of the sidebar-compact plugin.
 *
 * The shipped sidebar stacks a brand row, a New Session row and the global panel
 * rows above the workspace/session browser. This client half keeps the native
 * window-chrome strip (it owns the collapse toggle), drops the brand row, and
 * re-lays the existing New Session / Plugins / Scheduled tasks / More controls
 * into ONE horizontal row of four equal bordered buttons. It also tightens the
 * workspace section header, workspace rows, session rows and their gaps so the
 * sidebar fits more conversations.
 *
 * It is intentionally CSS-only: every button keeps its original element,
 * handler, locale string and accessibility wiring, so behavior cannot drift.
 * Selectors use the stable local-name suffix of the host's CSS-module class
 * names (for example `_panelRow`); if a future host build renames those local
 * names the overrides stop applying and the stock sidebar returns, which is a
 * safe fallback.
 *
 * Scope: the expanded sidebar of the macOS desktop window (`data-platform` is
 * set by the desktop preload). A browser tab has no `data-platform` marker and
 * is left untouched.
 */
window.__ModuleLoader__.load({
  id: 'dsh-sidebar-compact-macos',
  factory() {
    const SCOPE =
      'html[data-platform="darwin"] div[class*="_root"]:not([class*="_collapsed"]):has(> div[class*="_topStrip"])'
    const CSS = `
/* Grid rows: title-bar strip | four-button row | workspace region | footer. */
${SCOPE} {
  display: grid !important;
  grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
  grid-template-rows: auto auto minmax(0, 1fr) auto !important;
  column-gap: 4px !important;
  row-gap: 0 !important;
}

/* Keep the drag / collapse strip; remove the DeepSeek Harness brand row. */
${SCOPE} > div[class*="_topStrip"] {
  grid-row: 1 !important;
  grid-column: 1 / -1 !important;
}
${SCOPE} > div[class*="_logoRow"] {
  display: none !important;
}

/* Cell 1: New session, as a compact bordered button with icon above label. */
${SCOPE} > button[class*="_newSession"] {
  grid-row: 2 !important;
  grid-column: 1 !important;
  box-sizing: border-box !important;
  width: 100% !important;
  height: 48px !important;
  min-height: 0 !important;
  margin: 0 !important;
  padding: 2px 4px !important;
  border: 0.5px solid var(--dsw-alias-border-l3) !important;
  border-radius: var(--dsw-radius-md) !important;
  background: transparent !important;
  box-shadow: none !important;
  color: var(--dsw-alias-label-primary) !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  align-items: center !important;
  gap: 2px !important;
  overflow: hidden !important;
}
${SCOPE} > button[class*="_newSession"] > span[class*="_newSessionLabelMask"] {
  flex: 0 0 auto !important;
  width: 100% !important;
  min-width: 0 !important;
}
${SCOPE} > button[class*="_newSession"] span[class*="_newSessionContent"] {
  width: 100% !important;
  flex-direction: column !important;
  justify-content: center !important;
  align-items: center !important;
  gap: 2px !important;
}
${SCOPE} > button[class*="_newSession"] span[class*="_newSessionContent"] > svg {
  width: 16px !important;
  height: 16px !important;
}
${SCOPE} > button[class*="_newSession"] span[class*="_newSessionLabel"] {
  max-width: 100% !important;
  font-size: 11px !important;
  font-weight: 500 !important;
  line-height: 14px !important;
}
${SCOPE} > button[class*="_newSession"] span[class*="_newSessionShortcut"] {
  display: none !important;
}
${SCOPE} > button[class*="_newSession"]:hover {
  background: var(--dsw-alias-interactive-bg-hover) !important;
}

/* Cells 2-4: Plugins, Scheduled tasks and the More launcher as equal thirds. */
${SCOPE} > nav[class*="_panelList"] {
  grid-row: 2 !important;
  grid-column: 2 / -1 !important;
  display: grid !important;
  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  align-items: stretch !important;
  gap: 4px !important;
  height: 48px !important;
  min-width: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
}
${SCOPE} > nav[class*="_panelList"] > button[class*="_panelRow"],
${SCOPE} > nav[class*="_panelList"] > span[class*="_moreAnchor"] {
  min-width: 0 !important;
  height: 100% !important;
}
${SCOPE} > nav[class*="_panelList"] > span[class*="_moreAnchor"] {
  display: flex !important;
  flex-direction: column !important;
}
${SCOPE} > nav[class*="_panelList"] button[class*="_panelRow"] {
  box-sizing: border-box !important;
  width: 100% !important;
  height: 100% !important;
  min-height: 0 !important;
  margin: 0 !important;
  padding: 2px !important;
  border: 0.5px solid var(--dsw-alias-border-l3) !important;
  border-radius: var(--dsw-radius-md) !important;
  background: transparent !important;
  color: var(--dsw-alias-label-primary) !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  align-items: center !important;
  gap: 2px !important;
  line-height: 14px !important;
  text-align: center !important;
}
${SCOPE} > nav[class*="_panelList"] button[class*="_panelRow"]:hover,
${SCOPE} > nav[class*="_panelList"] button[class*="_panelRow"][class*="_panelActive"],
${SCOPE} > nav[class*="_panelList"] button[class*="_panelRow"][aria-expanded="true"] {
  background: var(--dsw-alias-interactive-bg-hover) !important;
}
${SCOPE} > nav[class*="_panelList"] span[class*="_panelTitle"] {
  max-width: 100% !important;
  font-size: 11px !important;
  font-weight: 400 !important;
  line-height: 14px !important;
  text-align: center !important;
}

/* The browsing region and the footer take the remaining grid rows. */
${SCOPE} > div[class*="_regionArea"] {
  grid-row: 3 !important;
  grid-column: 1 / -1 !important;
  min-height: 0 !important;
  padding-top: 2px !important;
}
${SCOPE} > div[class*="_footArea"] {
  grid-row: 4 !important;
  grid-column: 1 / -1 !important;
}

/* Denser workspace browser: shorter section header, workspace and session rows. */
${SCOPE} [class*="_sectionHeader"] {
  height: auto !important;
  min-height: 28px !important;
  margin-top: 0 !important;
  margin-bottom: 2px !important;
}
${SCOPE} [class*="_sectionLabel"] {
  line-height: 18px !important;
}
${SCOPE} [class*="_projectRow"] {
  height: 30px !important;
}
${SCOPE} [class*="_sessionRow"] {
  height: 28px !important;
}
${SCOPE} [class*="_flatList"] > * + *,
${SCOPE} [class*="_groupSection"] > * + * {
  margin-top: 1px !important;
}
${SCOPE} [class*="_groupSection"] + [class*="_groupSection"] {
  margin-top: 2px !important;
}
`
    return {
      inject: [],
      apply(ctx) {
        ctx.effect(() => {
          const existing = document.querySelector('style[data-plugin-css="' + 'dsh-sidebar-compact-macos/sidebar-compact.css' + '"]')
          if (existing !== null) existing.remove()
          const style = document.createElement('style')
          style.dataset.plugin = 'dsh-sidebar-compact-macos'
          style.dataset.pluginCss = 'dsh-sidebar-compact-macos/sidebar-compact.css'
          style.textContent = CSS
          document.head.appendChild(style)
          return () => {
            style.remove()
          }
        }, 'sidebar-compact-macos: layout overrides')
      },
    }
  },
})
