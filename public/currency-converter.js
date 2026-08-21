/* Route-specific converter. Rates come only from the existing first-party
   endpoint; malformed or unavailable data fails closed. */
(function () {
  "use strict";
  var form = document.querySelector("form[data-currency-converter]");
  if (!form) return;
  var amount = form.querySelector("[data-converter-amount]");
  var from = form.querySelector("[data-converter-from]");
  var to = form.querySelector("[data-converter-to]");
  var swap = form.querySelector("[data-converter-swap]");
  var result = form.querySelector("[data-converter-result]");
  var meta = form.querySelector("[data-converter-meta]");
  if (!amount || !from || !to || !result) return;
  result.textContent = "Loading current reference rates…";

  function validCode(code) { return /^[A-Z]{3}$/.test(code); }
  function money(value, code) {
    try { return new Intl.NumberFormat(undefined, { style: "currency", currency: code, maximumFractionDigits: value % 1 === 0 ? 0 : 2 }).format(value); }
    catch (error) { return value.toFixed(2) + " " + code; }
  }
  function fail() {
    result.textContent = "Current reference rates are unavailable right now. Try again later and confirm the charge currency at checkout.";
  }
  fetch("/api/rates", { headers: { Accept: "application/json" } }).then(function (response) {
    if (!response.ok) throw new Error("rates unavailable");
    return response.json();
  }).then(function (payload) {
    var rates = {};
    Object.keys(payload && payload.rates || {}).forEach(function (rawCode) {
      var code = String(rawCode).trim().toUpperCase();
      var rate = Number(payload.rates[rawCode]);
      if (validCode(code) && Number.isFinite(rate) && rate > 0) rates[code] = rate;
    });
    var rateDate = /^\d{4}-\d{2}-\d{2}$/.test(String(payload && payload.date || "")) ? String(payload.date) : "";
    var codes = Object.keys(rates).sort();
    if (payload.ok !== true || codes.length < 2 || !rateDate) throw new Error("invalid rates");
    [from, to].forEach(function (select) {
      select.replaceChildren();
      codes.forEach(function (code) {
        var item = document.createElement("option");
        item.value = item.textContent = code;
        select.appendChild(item);
      });
      select.disabled = false;
    });
    var params = new URLSearchParams(window.location.search);
    from.value = codes.indexOf(String(params.get("from") || "").toUpperCase()) !== -1 ? String(params.get("from")).toUpperCase() : codes.indexOf("USD") !== -1 ? "USD" : codes[0];
    to.value = codes.indexOf(String(params.get("to") || "").toUpperCase()) !== -1 ? String(params.get("to")).toUpperCase() : codes.indexOf("GBP") !== -1 && from.value !== "GBP" ? "GBP" : codes.find(function (code) { return code !== from.value; });
    var requestedAmount = Number(String(params.get("amount") || "").replace(/,/g, ""));
    if (Number.isFinite(requestedAmount) && requestedAmount > 0) amount.value = String(requestedAmount);
    function update() {
      var entered = Number(String(amount.value || "").replace(/,/g, ""));
      if (!Number.isFinite(entered) || entered < 0) { result.textContent = "Enter an amount to convert."; return; }
      var unit = rates[to.value] / rates[from.value];
      result.textContent = money(entered, from.value) + " ≈ " + money(entered * unit, to.value);
      if (meta) meta.textContent = "1 " + from.value + " = " + unit.toFixed(4) + " " + to.value + " · European Central Bank daily reference rates for " + rateDate + ". Indicative only; your provider or card issuer sets the actual rate and fees.";
    }
    amount.addEventListener("input", update);
    from.addEventListener("change", update);
    to.addEventListener("change", update);
    if (swap) {
      swap.disabled = false;
      swap.addEventListener("click", function () { var previous = from.value; from.value = to.value; to.value = previous; update(); });
    }
    update();
  }).catch(fail);
})();
