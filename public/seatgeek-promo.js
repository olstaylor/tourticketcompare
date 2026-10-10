/* SeatGeek promo-code pop-up. A plain left click on any SeatGeek provider CTA
   opens a dialog with the promo code (copied to the clipboard on the way in)
   and a "Continue to SeatGeek" link. The redirect itself is untouched: the
   Continue link carries the CTA's own /api/out href, target and rel, and the
   visitor's own click on it is the navigation /api/out receives, so the
   click ID, Impact tracking and the Sec-Fetch-User receipt gate all behave as
   before. Without JavaScript, or a browser with no <dialog>, the CTA is an
   ordinary link. The analytics click handlers in app.js and shell.js call
   shouldIntercept()/open(), so provider_click is still recorded once.

   To change the code, edit SEATGEEK_PROMO. To turn the pop-up off, set
   enabled: false; nothing else needs to change. */
(function () {
  "use strict";

  var SEATGEEK_PROMO = {
    enabled: true,
    code: "BEYONCECAPITAL",
    headline: "Your SeatGeek promo code",
    offer: "$20 off your tickets!",
    terms: "SeatGeek sets the code's terms, such as first-order or minimum-spend limits. Check the discount shows in your total before you pay."
  };

  var dialog = null;
  var continueLink = null;
  var copyButton = null;
  var status = null;
  var returnFocus = null;

  function copyCode() {
    var value = SEATGEEK_PROMO.code;
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      return navigator.clipboard.writeText(value);
    }
    return new Promise(function (resolve, reject) {
      var field = document.createElement("textarea");
      field.value = value;
      field.setAttribute("readonly", "");
      field.className = "sg-promo-offscreen";
      dialog.appendChild(field);
      field.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (error) {}
      field.remove();
      if (ok) resolve(); else reject(new Error("copy_failed"));
    });
  }

  function showCopyResult(promise) {
    promise.then(function () {
      status.textContent = "Code copied. Paste it at SeatGeek's checkout.";
      copyButton.textContent = "Copied";
    }).catch(function () {
      status.textContent = "Copy the code above and paste it at SeatGeek's checkout.";
      copyButton.textContent = "Copy code";
    });
  }

  function el(tag, className, textValue) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (textValue) node.textContent = textValue;
    return node;
  }

  function build() {
    dialog = el("dialog", "sg-promo");
    dialog.setAttribute("aria-labelledby", "sg-promo-title");
    dialog.setAttribute("aria-describedby", "sg-promo-offer");

    var close = el("button", "sg-promo-close");
    close.type = "button";
    close.setAttribute("aria-label", "Close");
    close.textContent = "\u00d7";
    close.addEventListener("click", function () { dialog.close(); });

    var title = el("h2", "sg-promo-title", SEATGEEK_PROMO.headline);
    title.id = "sg-promo-title";

    var offer = el("p", "sg-promo-offer");
    offer.id = "sg-promo-offer";
    offer.append("Use promo code ");
    offer.appendChild(el("strong", "", "\u201c" + SEATGEEK_PROMO.code + "\u201d"));
    offer.append(" at checkout for " + SEATGEEK_PROMO.offer);

    var codeRow = el("div", "sg-promo-code-row");
    codeRow.appendChild(el("code", "sg-promo-code", SEATGEEK_PROMO.code));
    copyButton = el("button", "button button-secondary sg-promo-copy", "Copy code");
    copyButton.type = "button";
    copyButton.addEventListener("click", function () { showCopyResult(copyCode()); });
    codeRow.appendChild(copyButton);

    status = el("p", "sg-promo-status");
    status.setAttribute("role", "status");

    continueLink = el("a", "button button-primary sg-promo-continue", "Continue to SeatGeek");
    // The new tab has opened by the time the click finishes; close the dialog
    // so the visitor comes back to the page they left.
    continueLink.addEventListener("click", function () {
      window.setTimeout(function () { if (dialog.open) dialog.close(); }, 0);
    });

    var terms = el("p", "sg-promo-terms", SEATGEEK_PROMO.terms);

    dialog.append(close, title, offer, codeRow, status, continueLink, terms);
    // A click on the backdrop lands on the <dialog> element itself.
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", function () {
      // Drop the activation href so a later click cannot reuse its intent ID.
      continueLink.removeAttribute("href");
      if (returnFocus && document.contains(returnFocus)) returnFocus.focus();
      returnFocus = null;
    });
    document.body.appendChild(dialog);
  }

  // Only a plain, trusted left click on a SeatGeek CTA is intercepted.
  // Modified clicks (new tab, new window, download) keep the native link.
  function shouldIntercept(cta, event) {
    if (!SEATGEEK_PROMO.enabled || !SEATGEEK_PROMO.code) return false;
    if (!cta || String(cta.dataset.ctaProvider || "").trim() !== "seatgeek") return false;
    if (!event || !event.isTrusted || event.defaultPrevented || event.button !== 0) return false;
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return false;
    if (typeof window.HTMLDialogElement !== "function" || typeof window.HTMLDialogElement.prototype.showModal !== "function") return false;
    return Boolean(cta.getAttribute("href"));
  }

  // href is the CTA's href at the moment of the click, including any
  // browserIntentId the analytics handler attached for this activation.
  function open(cta, href) {
    if (!dialog) build();
    if (dialog.open) return;
    continueLink.setAttribute("href", href);
    var target = cta.getAttribute("target");
    var rel = cta.getAttribute("rel");
    if (target) continueLink.setAttribute("target", target); else continueLink.removeAttribute("target");
    if (rel) continueLink.setAttribute("rel", rel); else continueLink.removeAttribute("rel");
    status.textContent = "";
    copyButton.textContent = "Copy code";
    returnFocus = cta;
    dialog.showModal();
    continueLink.focus();
    // Still inside the CTA click's user activation, so the clipboard write is
    // allowed. A refusal just leaves the Copy button for the visitor.
    showCopyResult(copyCode());
  }

  window.ttcSeatGeekPromo = Object.freeze({ shouldIntercept: shouldIntercept, open: open });
})();
