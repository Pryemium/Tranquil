// ==UserScript==
// @name           Invisible Extra Toolbarbutton
// @description    Adds an invisible extra toolbarbutton to the Zen sidebar foot toolbar
// @author         You
// ==/UserScript==

(function () {
  "use strict";

  function injectButton() {
    const toolbar = document.querySelector(
      "toolbar#zen-sidebar-foot-buttons"
    );

    if (!toolbar) return;

    // Avoid duplicate injection
    if (document.getElementById("zen-invisible-extra-button")) return;

    const button = document.createElementNS(
      "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",
      "toolbarbutton"
    );

    button.id = "zen-invisible-extra-button";
    button.classList.add(
      "toolbarbutton-1",
      "zen-sidebar-action-button"
    );

    // Make it invisible but still present in the DOM/layout
    button.style.cssText = `
      visibility: hidden;
      pointer-events: none;
      width: 28px;
      height: 28px;
      min-width: 28px;
      min-height: 28px;
      flex-shrink: 0;
    `;

    toolbar.appendChild(button);
    console.log("[zen-invisible-button] Injected invisible toolbarbutton.");
  }

  // Wait for the toolbar to be available
  function tryInject(retries = 10, delay = 500) {
    injectButton();

    const toolbar = document.querySelector("toolbar#zen-sidebar-foot-buttons");
    if (!toolbar && retries > 0) {
      setTimeout(() => tryInject(retries - 1, delay), delay);
    }
  }

  if (document.readyState === "complete") {
    tryInject();
  } else {
    window.addEventListener("load", () => tryInject(), { once: true });
  }
})();
