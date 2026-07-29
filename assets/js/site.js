/* Saturn Cheetah — small, dependency-free site interactions. */

const WHATSAPP_PHONE = "917780478506";
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

document.documentElement.classList.add("js-enabled");

const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const primaryNav = document.querySelector(".primary-nav");
const orderSection = document.querySelector("#order");
const orderIntentSelect = document.querySelector("#order-intent");
const productSelect = document.querySelector("#product");
const orderForm = document.querySelector("#whatsapp-order-form");

function updateHeaderState() {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
}

function setNavigationOpen(isOpen, returnFocus = false) {
  if (!navToggle || !primaryNav) return;

  primaryNav.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");

  if (isOpen) {
    primaryNav.querySelector("a")?.focus();
  } else if (returnFocus) {
    navToggle.focus();
  }
}

function setupNavigation() {
  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  navToggle?.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") !== "true";
    setNavigationOpen(isOpen, !isOpen);
  });

  primaryNav?.addEventListener("click", event => {
    if (event.target.closest("a")) setNavigationOpen(false);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && primaryNav?.classList.contains("is-open")) {
      setNavigationOpen(false, true);
    }

    if (event.key !== "Tab" || !primaryNav?.classList.contains("is-open")) return;

    const focusableItems = [navToggle, ...primaryNav.querySelectorAll("a")];
    const firstItem = focusableItems[0];
    const lastItem = focusableItems.at(-1);

    if (event.shiftKey && document.activeElement === firstItem) {
      event.preventDefault();
      lastItem.focus();
    } else if (!event.shiftKey && document.activeElement === lastItem) {
      event.preventDefault();
      firstItem.focus();
    }
  });

  document.addEventListener("click", event => {
    if (!primaryNav?.classList.contains("is-open")) return;
    if (primaryNav.contains(event.target) || navToggle?.contains(event.target)) return;
    setNavigationOpen(false);
  });
}

function setupRevealMotion() {
  const revealItems = document.querySelectorAll(".reveal");

  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    revealItems.forEach(item => item.classList.add("is-visible"));
    return;
  }

  document.body.classList.add("motion-enabled");

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  }, {
    threshold: 0.08,
    rootMargin: "0px 0px -8% 0px"
  });

  revealItems.forEach(item => observer.observe(item));
}

function setupOrderShortcuts() {
  document.addEventListener("click", event => {
    const trigger = event.target.closest("[data-order-product], [data-order-intent]");
    if (!trigger) return;

    const selectedIntent = trigger.dataset.orderIntent;
    const selectedProduct = trigger.dataset.orderProduct;

    if (selectedIntent && orderIntentSelect) orderIntentSelect.value = selectedIntent;
    if (selectedProduct && productSelect) productSelect.value = selectedProduct;

    if (trigger.tagName === "BUTTON") {
      orderSection?.scrollIntoView({
        behavior: reducedMotion.matches ? "auto" : "smooth",
        block: "start"
      });
    }
  });

  orderIntentSelect?.addEventListener("change", () => {
    if (!productSelect) return;

    if (orderIntentSelect.value === "Bulk / Business / Event") {
      productSelect.value = "Bulk / Wider Range";
    } else if (productSelect.value === "Bulk / Wider Range") {
      productSelect.value = "180 GSM Unisex Regular Fit";
    }
  });

  productSelect?.addEventListener("change", () => {
    if (!orderIntentSelect) return;
    orderIntentSelect.value = productSelect.value === "Bulk / Wider Range"
      ? "Bulk / Business / Event"
      : "Personal / Small Quantity";
  });
}

function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function setupOrderForm() {
  const requiredDateInput = document.querySelector("#required-date");
  if (requiredDateInput) requiredDateInput.min = getLocalDateString();

  orderForm?.addEventListener("submit", event => {
    event.preventDefault();

    const formData = new FormData(orderForm);
    const value = name => String(formData.get(name) ?? "").trim();
    const includeOptionalDetails = document.querySelector(".order-details")?.open;
    const optionalLines = includeOptionalDetails
      ? [
          ["Customer name", value("customerName")],
          ["Size(s)", value("sizes")],
          ["Colour", value("colour")],
          ["Print placement", value("placement")],
          ["Required date", value("requiredDate")],
          ["Delivery city", value("city")],
          ["Notes", value("notes")]
        ].filter(([, fieldValue]) => fieldValue)
          .map(([label, fieldValue]) => `${label}: ${fieldValue}`)
      : [];

    const orderIntent = value("orderIntent");
    const isBulkOrder = orderIntent === "Bulk / Business / Event";
    const messageLines = isBulkOrder
      ? [
          "Hello Saturn Cheetah Store,",
          "",
          "I would like a bulk quote.",
          "",
          `Order type: ${orderIntent}`,
          `Product or range: ${value("product")}`,
          `Quantity: ${value("quantity")}`,
          `Design status: ${value("designStatus")}`,
          ...optionalLines,
          "",
          "Please confirm suitable options, feasibility, final price and timeline. I will attach my design/reference in WhatsApp."
        ]
      : [
          "Hello Saturn Cheetah Store,",
          "",
          "I would like to customise a T-shirt.",
          "",
          `Order type: ${orderIntent}`,
          `Product: ${value("product")}`,
          `Quantity: ${value("quantity")}`,
          `Design status: ${value("designStatus")}`,
          ...optionalLines,
          "",
          "Please confirm feasibility, final price and timeline. I will attach my design/reference in WhatsApp."
        ];

    const message = messageLines.join("\n");

    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
    window.location.assign(whatsappUrl);
  });
}

function setupFooterYear() {
  const year = document.querySelector("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());
}

function respectReducedMotion() {
  if (!reducedMotion.matches) return;
  document.querySelectorAll("video").forEach(video => video.pause());
}

setupNavigation();
setupRevealMotion();
setupOrderShortcuts();
setupOrderForm();
setupFooterYear();
respectReducedMotion();
