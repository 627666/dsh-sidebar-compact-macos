/**
 * Client half of the sidebar-compact plugin.
 *
 * DeepSeek Harness 0.2.2-rc.2 restructured the expanded sidebar: the panel list
 * and the workspace browser now live inside a `scrollRegion` / `scrollArea`
 * grid instead of being direct children of the sidebar column. This version
 * targets that layout:
 *
 *  - the brand mark is absolutely positioned in the 52 px title-bar strip, to
 *    the right of the native traffic lights and left of the collapse toggle;
 *  - the action row is rebuilt as a fixed 48 px grid row inside the sidebar's
 *    new scroll area: New session is absolutely overlaid on the first quarter,
 *    and the panel list is offset by that quarter and laid out as three equal
 *    buttons (Plugins, Scheduled tasks, More);
 *  - the workspace browser below keeps its own scroll container and only gets
 *    denser spacing.
 *
 * Every control keeps its original host element, handler, locale string and
 * accessibility wiring, so behavior cannot drift. Selectors use stable local
 * class-name suffixes (for example `_panelRow`) and the rc.2 workspace header's
 * data attribute; if a future host build renames those, the overrides stop
 * applying and the stock sidebar returns, which is a safe fallback.
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
/* Sidebar column keeps its flex flow; the brand row is lifted out of it. */
${SCOPE} {
  position: relative !important;
}

/* Brand back in the title-bar strip, right of the traffic lights, left of the
   collapse toggle. Absolute, so no row below moves. */
${SCOPE} > div[class*="_logoRow"] {
  display: flex !important;
  position: absolute !important;
  top: 0 !important;
  left: 84px !important;
  right: 50px !important;
  height: 52px !important;
  margin: 0 !important;
  padding: 0 !important;
  align-items: center !important;
  justify-content: flex-start !important;
  overflow: hidden !important;
  pointer-events: none !important;
  z-index: 2 !important;
}
${SCOPE} > div[class*="_logoRow"] > span[class*="_brand"] {
  display: inline-flex !important;
  flex: 0 0 auto !important;
  padding: 0 !important;
  cursor: default !important;
  transform: scale(0.78) !important;
  transform-origin: left center !important;
}

/* Action cell 1: New session, overlaid on the first quarter of the fixed action
   row (top 52 px = below the title-bar strip; width = one of four grid cells). */
${SCOPE} > button[class*="_newSession"] {
  position: absolute !important;
  top: 52px !important;
  left: 8px !important;
  width: calc((100% - 28px) / 4) !important;
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
  z-index: 3 !important;
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

/* The new rc.2 scrolling shell: give it exactly two rows — the 48 px action row
   and the browsing region — and keep the scrollbar for the workspace list. */
${SCOPE} > div[class*="_scrollRegion"] {
  margin-top: 0 !important;
  flex: 1 1 auto !important;
  min-height: 0 !important;
}
${SCOPE} div[class*="_scrollArea"] {
  grid-template-rows: 0 48px 0 minmax(0, 1fr) !important;
  align-content: stretch !important;
  overflow: hidden !important;
}
${SCOPE} div[class*="_scrollFade"] {
  display: none !important;
}

/* Action cells 2-4: the panel list is the remaining three quarters, as a row of
   three equal buttons (Plugins, Scheduled tasks, More). The left padding skips
   the quarter occupied by the absolutely positioned New session button. */
${SCOPE} nav[class*="_panelList"] {
  grid-area: 2 / 2 !important;
  display: flex !important;
  flex-direction: row !important;
  align-items: stretch !important;
  gap: 4px !important;
  box-sizing: border-box !important;
  height: 48px !important;
  min-width: 0 !important;
  margin: 0 !important;
  padding: 0 0 0 calc((100% - 12px) / 4 + 4px) !important;
}
${SCOPE} nav[class*="_panelList"] > div[class*="_panelEntry"],
${SCOPE} nav[class*="_panelList"] > span[class*="_moreAnchor"] {
  flex: 1 1 0 !important;
  min-width: 0 !important;
  height: 100% !important;
}
${SCOPE} nav[class*="_panelList"] div[class*="_panelEntry"] {
  display: flex !important;
  align-items: stretch !important;
  background: transparent !important;
  border: 0 !important;
}
${SCOPE} nav[class*="_panelList"] > span[class*="_moreAnchor"] {
  display: flex !important;
  flex-direction: column !important;
}
${SCOPE} nav[class*="_panelList"] button[class*="_panelRow"] {
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
${SCOPE} nav[class*="_panelList"] div[class*="_panelEntry"]:hover,
${SCOPE} nav[class*="_panelList"] div[class*="_panelEntry"]:hover > button[class*="_panelRow"] {
  background-color: transparent !important;
}
${SCOPE} nav[class*="_panelList"] div[class*="_panelEntry"]:hover > button[class*="_panelRow"],
${SCOPE} nav[class*="_panelList"] div[class*="_panelEntryActive"] > button[class*="_panelRow"],
${SCOPE} nav[class*="_panelList"] button[class*="_panelRow"][aria-expanded="true"],
${SCOPE} nav[class*="_panelList"] button[class*="_panelRow"][aria-current="page"] {
  background-color: var(--dsw-alias-interactive-bg-hover) !important;
}
${SCOPE} nav[class*="_panelList"] span[class*="_panelTitle"] {
  max-width: 100% !important;
  font-size: 11px !important;
  font-weight: 400 !important;
  line-height: 14px !important;
  text-align: center !important;
}
${SCOPE} nav[class*="_panelList"] button[class*="_panelUnpin"] {
  display: none !important;
}

/* The browsing region fills the last grid row and the workspace browser keeps
   its own internal scrollbar (as in rc.2), just with the docked buttons row.
   Match the browser root through its header instead of a class suffix: rc.2
   renders other _root_<hash> elements inside the browser (the workspace
   picker menu root), and a broad _root match would stretch those too. */
${SCOPE} div[class*="_regionArea"] {
  grid-area: 4 / 2 !important;
  min-height: 0 !important;
  overflow: hidden !important;
  padding-top: 2px !important;
  display: flex !important;
  flex-direction: column !important;
}
${SCOPE} div[class*="_regionArea"] div:has(> [data-sidebar-workspace-header]) {
  flex: 1 1 auto !important;
  max-height: none !important;
  min-height: 0 !important;
}

/* Denser workspace browser: shorter section header, workspace and session rows. */
${SCOPE} [data-sidebar-workspace-header] {
  height: 28px !important;
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
