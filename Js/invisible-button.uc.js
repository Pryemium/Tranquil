console.log("YO GANG IM HERE");

(function () {
  function injectButton() {
    const footer = document.getElementById("zen-sidebar-foot-buttons");
    if (!footer) return false;

    // Avoid duplicates
    if (footer.querySelector("#my-invisible-button")) return true;

    const btn = document.createElement("toolbarbutton");
    btn.id = "my-invisible-button";

    // Match Zen button styling
    btn.className = "toolbarbutton-1 chromeclass-toolbar-additional";

    // Invisible but still interactive
    btn.style.opacity = "0";
    btn.style.width = "32px";
    btn.style.height = "32px";
    btn.style.pointerEvents = "auto";

    // Prevent flex stretching
    btn.setAttribute("flex", "0");

    // Click handler
    btn.addEventListener("click", () => {
      console.log("Invisible button clicked");
    });

    // Insert before "Create New" button if possible
    const createBtn = document.getElementById("zen-create-new-button");

    if (createBtn) {
      footer.insertBefore(btn, createBtn);
    } else {
      footer.appendChild(btn);
    }

    console.log("Injected invisible sidebar button");
    return true;
  }

  function init() {
    if (injectButton()) return;

    const observer = new MutationObserver(() => {
      if (injectButton()) {
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init);
  }
})();
