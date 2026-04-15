console.log("!!! TRANQUIL SCRIPT LOADED !!!");
(function () {
  "use strict";

  const BUTTON_ID = "zen-invisible-extra-button";

  function inject() {
    const toolbar = document.getElementById("zen-sidebar-foot-buttons");
    if (!toolbar || document.getElementById(BUTTON_ID)) return;

    const btn = document.createElementNS(
      "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",
      "toolbarbutton"
    );

    btn.id = BUTTON_ID;
    btn.setAttribute("class", "toolbarbutton-1 zen-sidebar-action-button");
    
    // Using opacity ensures it maintains its 'box' and pushes other elements
    btn.style.cssText = `
      opacity: 0 !important;
      pointer-events: none !important;
      width: 28px !important;
      min-width: 28px !important;
    `;

    toolbar.appendChild(btn);
  }

  // More robust than a retry loop: Observe the document for the toolbar
  const observer = new MutationObserver(() => {
    if (document.getElementById("zen-sidebar-foot-buttons")) {
      inject();
      // Optional: observer.disconnect(); // Keep it if you want to ensure it stays injected
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
  
  // Initial attempt
  inject();
})();// ==UserScript==
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
