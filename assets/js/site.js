/* Saturn Cheetah — dependency-free boutique interactions. */

const WHATSAPP_PHONE = "917780478506";
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const mobileNavigation = window.matchMedia("(max-width: 900px)");

document.documentElement.classList.add("js-enabled");

const header = document.querySelector(".site-header");
const hero = document.querySelector(".hero");
const navToggle = document.querySelector(".nav-toggle");
const primaryNav = document.querySelector(".primary-nav");
const whatsappWidget = document.querySelector("#whatsapp-widget");
const floatingWhatsapp = document.querySelector("#floating-whatsapp");
const whatsappEnquiryPanel = document.querySelector("#whatsapp-enquiry-panel");
const productSelect = document.querySelector("#custom-product");
const customiseForm = document.querySelector("#customise");
const afterDarkConfigurator = document.querySelector("#after-dark-configurator");
const finalSelection = document.querySelector("#final-selection");

const productData = {
  "180": {
    value: "180 GSM Unisex Regular Fit",
    shortLabel: "180 GSM Regular Fit",
    spec: "180 GSM · Unisex · Cotton",
    name: "Regular Fit T-shirt",
    customPrice: "₹799–₹999",
    readyDesignPrice: "₹799",
    summary: "A familiar everyday silhouette with an easy, regular fit.",
    fit: "Regular and easy to wear",
    use: "Everyday wear, gifting and event tees",
    sizes: "(max-width: 767px) calc(100vw - 64px), (max-width: 900px) 460px, (max-width: 1200px) 42vw, 560px",
    altFit: "regular-fit",
    defaultColour: "black",
    colours: [
      { slug: "black", label: "Black", swatch: "#111111", width: 994, height: 1583 },
      { slug: "white", label: "White", swatch: "#f7f7f4", width: 992, height: 1586 },
      { slug: "off-white", label: "Off-white", swatch: "#eee7d8", width: 992, height: 1586 },
      { slug: "blue", label: "Blue", swatch: "#0b50d2", width: 992, height: 1586 },
      { slug: "green", label: "Green", swatch: "#00843d", width: 992, height: 1586 },
      { slug: "gray", label: "Gray", swatch: "#b9b9b9", width: 992, height: 1586 },
      { slug: "red", label: "Red", swatch: "#d20a16", width: 992, height: 1586 },
      { slug: "yellow", label: "Yellow", swatch: "#f5d000", width: 992, height: 1586 },
      { slug: "pink", label: "Pink", swatch: "#e779a5", width: 992, height: 1586 },
      { slug: "orange", label: "Orange", swatch: "#f57c00", width: 992, height: 1586 },
      { slug: "navy-blue", label: "Navy Blue", swatch: "#111d48", width: 992, height: 1586 }
    ]
  },
  "240": {
    value: "240 GSM Unisex Oversized",
    shortLabel: "240 GSM Oversized",
    spec: "240 GSM · Unisex · Heavyweight",
    name: "Oversized T-shirt",
    customPrice: "₹899–₹1,199",
    readyDesignPrice: "₹999",
    summary: "A heavier, relaxed silhouette with an oversized streetwear fit.",
    fit: "Relaxed and oversized",
    use: "Bold front, back and streetwear-style prints",
    sizes: "(max-width: 767px) calc(100vw - 64px), (max-width: 900px) 460px, (max-width: 1200px) 42vw, 560px",
    altFit: "oversized",
    defaultColour: "off-white",
    colours: [
      { slug: "black", label: "Black", swatch: "#111111", width: 1024, height: 1536 },
      { slug: "white", label: "White", swatch: "#f7f7f4", width: 993, height: 1583 },
      { slug: "off-white", label: "Off-white", swatch: "#eee7d8", width: 993, height: 1583 }
    ]
  }
};

let selectedProductKey = "180";
const selectedColourByProduct = { "180": "black", "240": "off-white" };
let selectedSize = "";
let teeImageRequest = 0;
const visibleWhatsappZones = new Set();

function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getProductLabel(value) {
  if (value === productData["180"].value) return productData["180"].shortLabel;
  if (value === productData["240"].value) return productData["240"].shortLabel;
  return "Bulk / another custom product";
}

function getCurrentProductValue() {
  return productSelect?.value || productData[selectedProductKey].value;
}

function updateHeaderState() {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
}

function refreshFloatingPill() {
  if (!whatsappWidget || !floatingWhatsapp) return;

  const shouldShow = visibleWhatsappZones.size === 0
    && !primaryNav?.classList.contains("is-open")
    && !document.body.classList.contains("modal-open");

  whatsappWidget.classList.toggle("is-visible", shouldShow);
  whatsappWidget.toggleAttribute("inert", !shouldShow);
  floatingWhatsapp.tabIndex = shouldShow ? 0 : -1;
  if (!shouldShow) closeWhatsAppWidget(false);
}

function setNavigationOpen(isOpen, returnFocus = false) {
  if (!navToggle || !primaryNav) return;
  if (isOpen) closeWhatsAppWidget(false);

  primaryNav.classList.toggle("is-open", isOpen);
  header?.classList.toggle("is-menu-open", isOpen);
  document.body.classList.toggle("nav-open", isOpen && mobileNavigation.matches);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");

  if (isOpen) {
    primaryNav.querySelector("a")?.focus();
  } else if (returnFocus) {
    navToggle.focus();
  }

  refreshFloatingPill();
}

function setupNavigation() {
  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  navToggle?.addEventListener("click", () => {
    const willOpen = navToggle.getAttribute("aria-expanded") !== "true";
    setNavigationOpen(willOpen, !willOpen);
  });

  primaryNav?.addEventListener("click", event => {
    if (event.target.closest("a")) setNavigationOpen(false);
  });

  document.addEventListener("click", event => {
    if (!primaryNav?.classList.contains("is-open")) return;
    if (primaryNav.contains(event.target) || navToggle?.contains(event.target)) return;
    setNavigationOpen(false);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && primaryNav?.classList.contains("is-open")) {
      setNavigationOpen(false, true);
      return;
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

  mobileNavigation.addEventListener("change", event => {
    if (!event.matches) setNavigationOpen(false);
  });
}

function setupExperienceOrder() {
  const teeSection = document.querySelector("#tees");
  const afterDarkSection = document.querySelector("#after-dark");
  const directionSection = document.querySelector("#direction");
  const processSection = document.querySelector("#process");

  if (teeSection && afterDarkSection) teeSection.after(afterDarkSection);
  if (directionSection && processSection) processSection.before(directionSection);
}

function setupActiveNavigation() {
  if (!("IntersectionObserver" in window)) return;

  const navLinks = [...document.querySelectorAll("[data-nav-section]")];
  const sections = navLinks
    .map(link => document.querySelector(`#${link.dataset.navSection}`))
    .filter(Boolean);

  const observer = new IntersectionObserver(entries => {
    const visibleEntry = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visibleEntry) return;

    navLinks.forEach(link => {
      if (link.dataset.navSection === visibleEntry.target.id) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }, {
    rootMargin: "-25% 0px -55% 0px",
    threshold: [0.05, 0.2, 0.5]
  });

  sections.forEach(section => observer.observe(section));
}

function setupHeroEntrance() {
  if (!hero) return;

  if (reducedMotion.matches) {
    hero.classList.add("is-ready");
    return;
  }

  window.requestAnimationFrame(() => hero.classList.add("is-ready"));
}

function activateTab(module, target, focusTab = false) {
  if (!module || !target) return;

  const tabs = [...module.querySelectorAll("[role='tab']")];
  const panels = [...module.querySelectorAll("[data-tab-panel]")];
  const activeTab = tabs.find(tab => tab.dataset.tabTarget === target);

  tabs.forEach(tab => {
    const selected = tab === activeTab;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });

  panels.forEach(panel => {
    panel.hidden = panel.dataset.tabPanel !== target;
    if (panel.hidden) panel.querySelectorAll("video").forEach(video => video.pause());
  });

  if (focusTab) activeTab?.focus();
  refreshFloatingPill();
}

function setupTabs() {
  document.querySelectorAll("[data-tabs]").forEach(module => {
    const tabs = [...module.querySelectorAll("[role='tab']")];

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activateTab(module, tab.dataset.tabTarget));

      tab.addEventListener("keydown", event => {
        let nextIndex;

        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          nextIndex = (index + 1) % tabs.length;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          nextIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = tabs.length - 1;
        } else {
          return;
        }

        event.preventDefault();
        activateTab(module, tabs[nextIndex].dataset.tabTarget, true);
      });
    });
  });

  document.addEventListener("click", event => {
    const trigger = event.target.closest("[data-open-tab]");
    if (!trigger) return;

    const target = trigger.dataset.openTab;
    const tab = document.querySelector(`[data-tab-target="${target}"]`);
    const module = tab?.closest("[data-tabs]");
    activateTab(module, target);

    if (trigger.dataset.scrollTarget) {
      document.querySelector(`#${trigger.dataset.scrollTarget}`)?.scrollIntoView({
        behavior: reducedMotion.matches ? "auto" : "smooth",
        block: "start"
      });
    }
  });
}

function setupStorySwipe() {
  const stage = document.querySelector("[data-story-swipe]");
  const module = stage?.closest("[data-tabs]");
  let startX = null;
  let startY = null;

  if (!stage || !module) return;

  function resetSwipe() {
    startX = null;
    startY = null;
  }

  stage.addEventListener("pointerdown", event => {
    if (!event.isPrimary || event.target.closest("video, button, a, input, select, textarea, summary")) return;
    startX = event.clientX;
    startY = event.clientY;
  });

  stage.addEventListener("pointerup", event => {
    if (startX === null || startY === null) return;

    const horizontalTravel = event.clientX - startX;
    const verticalTravel = event.clientY - startY;
    resetSwipe();

    if (Math.abs(horizontalTravel) < 48 || Math.abs(horizontalTravel) <= Math.abs(verticalTravel)) return;

    const tabs = [...module.querySelectorAll("[role='tab']")];
    const activeIndex = tabs.findIndex(tab => tab.getAttribute("aria-selected") === "true");
    const nextIndex = horizontalTravel < 0 ? activeIndex + 1 : activeIndex - 1;

    if (nextIndex < 0 || nextIndex >= tabs.length) return;
    activateTab(module, tabs[nextIndex].dataset.tabTarget);
  });

  stage.addEventListener("pointercancel", resetSwipe);
}

function enforceMutedProcessVideo() {
  document.querySelectorAll("video[data-always-muted]").forEach(video => {
    video.defaultMuted = true;
    video.muted = true;
    video.addEventListener("volumechange", () => {
      if (!video.muted || video.volume !== 0) {
        video.muted = true;
        video.volume = 0;
      }
    });
  });
}

function getSelectedColour(productKey = selectedProductKey) {
  const product = productData[productKey];
  const selectedSlug = selectedColourByProduct[productKey] || product.defaultColour;
  return product.colours.find(colour => colour.slug === selectedSlug)
    || product.colours.find(colour => colour.slug === product.defaultColour);
}

function getProductImage(productKey, colour) {
  const basePath = `assets/images/products/${productKey}/tshirt-${productKey}-${colour.slug}`;
  return {
    src: `${basePath}-640.webp`,
    srcset: `${basePath}-640.webp 640w, ${basePath}-${colour.width}.webp ${colour.width}w`,
    width: colour.width,
    height: colour.height
  };
}

function updateColourButtonStates() {
  const selectedSlug = selectedColourByProduct[selectedProductKey];
  document.querySelectorAll("[data-tee-colour]").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.teeColour === selectedSlug));
  });
}

function renderColourOptions(productKey) {
  const colourOptions = document.querySelector("#tee-colour-options");
  const colourLabel = document.querySelector("#tee-colour-label");
  const selectedColour = getSelectedColour(productKey);

  if (!colourOptions || !selectedColour) return;
  colourOptions.replaceChildren();

  productData[productKey].colours.forEach(colour => {
    const button = document.createElement("button");
    const indicator = document.createElement("span");
    const label = document.createElement("span");

    button.type = "button";
    button.dataset.teeColour = colour.slug;
    button.setAttribute("aria-pressed", String(colour.slug === selectedColour.slug));
    button.style.setProperty("--swatch-colour", colour.swatch);
    indicator.className = "tee-colour-indicator";
    indicator.setAttribute("aria-hidden", "true");
    label.textContent = colour.label;
    button.append(indicator, label);
    colourOptions.append(button);
  });

  if (colourLabel) colourLabel.textContent = selectedColour.label;
}

function setSelectedSize(size) {
  selectedSize = size;
  document.querySelectorAll("[data-tee-size]").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.teeSize === size));
  });

  const sizeInput = document.querySelector("#custom-selected-size");
  const sizePrompt = document.querySelector("#tee-size-prompt");
  if (sizeInput) sizeInput.value = size;
  if (sizePrompt) sizePrompt.hidden = true;
  updateWhatsAppLinks();
}

function updateTeeSizeAvailability(productKey) {
  const xsButton = document.querySelector("[data-tee-size='XS']");
  if (!xsButton) return;
  xsButton.hidden = false;
  xsButton.disabled = false;
}

function requireTeeSize() {
  if (selectedSize) return true;

  const sizePrompt = document.querySelector("#tee-size-prompt");
  if (sizePrompt) sizePrompt.hidden = false;
  document.querySelector("[data-tee-size]")?.focus();
  return false;
}

function updateTeeProduct(productKey, announce = true) {
  const product = productData[productKey];
  const colour = product ? getSelectedColour(productKey) : null;
  const teeImage = document.querySelector("#tee-image");
  const teeVisual = document.querySelector(".tee-visual");

  if (!product || !colour || !teeImage) return;
  selectedProductKey = productKey;
  updateTeeSizeAvailability(productKey);
  const image = getProductImage(productKey, colour);
  const requestId = ++teeImageRequest;

  teeVisual?.classList.add("is-changing");
  renderColourOptions(productKey);

  const applyProduct = () => {
    if (requestId !== teeImageRequest || selectedProductKey !== productKey) return;

    teeImage.src = image.src;
    teeImage.srcset = image.srcset;
    teeImage.sizes = product.sizes;
    teeImage.alt = `${colour.label} ${productKey} GSM unisex ${product.altFit} T-shirt shown from front and back`;
    teeImage.width = image.width;
    teeImage.height = image.height;
    document.querySelector("#tee-spec").textContent = product.spec;
    document.querySelector("#tee-name").textContent = product.name;
    const teePrice = document.querySelector("#tee-price");
    if (teePrice) teePrice.innerHTML = `<strong>Custom: ${product.customPrice}</strong><span>Our ready designs: ${product.readyDesignPrice}</span>`;
    document.querySelector("#tee-summary").textContent = product.summary;
    document.querySelector("#tee-fit").textContent = product.fit;
    document.querySelector("#tee-use").textContent = product.use;

    if (productSelect) productSelect.value = product.value;
    const colourInput = document.querySelector("#custom-selected-colour");
    if (colourInput) colourInput.value = colour.label;
    if (finalSelection) finalSelection.textContent = `Currently showing: ${colour.label} ${product.shortLabel}.`;
    if (announce) document.querySelector("#tee-status").textContent = `${product.shortLabel}, ${colour.label} selected.`;

    updateWhatsAppLinks();
    window.requestAnimationFrame(() => teeVisual?.classList.remove("is-changing"));
  };

  const preloadedImage = new Image();
  preloadedImage.srcset = image.srcset;
  preloadedImage.sizes = product.sizes;
  preloadedImage.src = image.src;

  if (preloadedImage.complete) {
    applyProduct();
  } else {
    preloadedImage.addEventListener("load", applyProduct, { once: true });
    preloadedImage.addEventListener("error", applyProduct, { once: true });
  }
}

function setupTeeSelector() {
  const colourOptions = document.querySelector("#tee-colour-options");
  const sizeOptions = document.querySelector("#tee-size-options");
  const customiseButton = document.querySelector("#tee-customise-button");

  document.querySelectorAll("input[name='tee-option']").forEach(input => {
    input.addEventListener("change", () => {
      if (input.checked) updateTeeProduct(input.value);
    });
  });

  colourOptions?.addEventListener("click", event => {
    const button = event.target.closest("[data-tee-colour]");
    if (!button || button.getAttribute("aria-pressed") === "true") return;

    selectedColourByProduct[selectedProductKey] = button.dataset.teeColour;
    updateColourButtonStates();
    updateTeeProduct(selectedProductKey);
  });

  sizeOptions?.addEventListener("click", event => {
    const button = event.target.closest("[data-tee-size]");
    if (button) setSelectedSize(button.dataset.teeSize);
  });

  customiseButton?.addEventListener("click", event => {
    if (requireTeeSize()) return;
    event.preventDefault();
    event.stopPropagation();
  });

  productSelect?.addEventListener("change", () => {
    const matchingKey = Object.keys(productData).find(key => productData[key].value === productSelect.value);

    if (matchingKey) {
      const radio = document.querySelector(`input[name="tee-option"][value="${matchingKey}"]`);
      if (radio) radio.checked = true;
      updateTeeProduct(matchingKey);
      return;
    }

    if (finalSelection) finalSelection.textContent = "Currently preparing: a bulk custom-product enquiry.";
    updateWhatsAppLinks();
  });

  updateTeeProduct(selectedProductKey, false);
}

function getOptionalFormLines(formData) {
  if (!document.querySelector(".optional-details")?.open) return [];

  const value = name => String(formData.get(name) || "").trim();

  return [
    ["Name", value("customerName")],
    ["Print placement", value("placement")],
    ["Required date", value("requiredDate")],
    ["City", value("city")],
    ["Notes", value("notes")]
  ]
    .filter(([, fieldValue]) => fieldValue)
    .map(([label, fieldValue]) => `${label}: ${fieldValue}`);
}

function buildCustomMessage() {
  const formData = new FormData(customiseForm);
  const product = String(formData.get("product") || "").trim();
  const isPersonalTee = product === productData["180"].value || product === productData["240"].value;
  const selectedProduct = Object.values(productData).find(item => item.value === product);
  const colour = String(formData.get("selectedColour") || "").trim();
  const size = String(formData.get("selectedSize") || "").trim();
  const quantity = String(formData.get("quantity") || "").trim();
  const designStatus = String(formData.get("designStatus") || "").trim();
  const storeDesign = String(formData.get("storeDesign") || "").trim();
  const designInstructions = String(formData.get("designInstructions") || "").trim();
  const opening = isPersonalTee
    ? "I’d like to customise a T-shirt."
    : "I’d like to discuss a bulk custom-product order.";
  const designNextStep = designStatus === "Help me create it"
        ? "I’d like your help creating or finalising my artwork or idea."
        : "I’d like to continue with the selected Saturn Cheetah design.";
  const productLines = isPersonalTee
    ? [`Fit: ${selectedProduct.shortLabel}`, `Colour: ${colour}`, `Size: ${size}`]
    : [`Product: ${product}`];

  return [
    "Hello Saturn Cheetah Store,",
    "",
    opening,
    "",
    ...productLines,
    `Quantity: ${quantity}`,
    `Design status: ${designStatus}`,
    ...(storeDesign ? [`Selected Saturn Cheetah design: ${storeDesign}`] : []),
    ...(designInstructions ? [`Design instructions: ${designInstructions}`] : []),
    ...getOptionalFormLines(formData),
    "",
    designNextStep,
    isPersonalTee
      ? "Please help me confirm availability, final price and timeline."
      : "Please confirm feasibility, final price and timeline."
  ].join("\n");
}

function buildProductMessage(context) {
  const product = getCurrentProductValue();
  const productLabel = getProductLabel(product);
  const isPersonalTee = product === productData["180"].value || product === productData["240"].value;
  const colour = getSelectedColour();
  const opening = context === "print"
    ? `I’d like to print my idea on a ${productLabel}.`
    : `I’d like to continue with a ${productLabel} enquiry.`;
  const selectionLines = isPersonalTee
    ? [`Fit: ${productData[selectedProductKey].shortLabel}`, `Colour: ${colour.label}`, `Size: ${selectedSize || "To be confirmed"}`]
    : [`Product: ${product}`];

  return [
    "Hello Saturn Cheetah Store,",
    "",
    opening,
    "",
    ...selectionLines,
    "Design status: I will share my design, reference or idea in WhatsApp.",
    "",
    "Please confirm feasibility, final price and timeline."
  ].join("\n");
}

function buildBulkMessage(product) {
  return [
    "Hello Saturn Cheetah Store,",
    "",
    "I’d like to discuss a bulk custom order.",
    "",
    `Product: ${product}`,
    "Purpose: Team, event or brand merchandise",
    "Design status: I will share the details in WhatsApp.",
    "",
    "Please help me confirm suitable options, quantity, final price and timeline."
  ].join("\n");
}

function buildPortraitMessage(size = "", price = "") {
  return [
    "Hello Saturn Cheetah Store,",
    "",
    "I would like to order one custom portrait.",
    "",
    widgetField("Selected size", size || "Please help me choose"),
    widgetField("Price", price || "Please confirm"),
    "Finish: HP",
    "Quantity: 1",
    "",
    "I will share the photo and personalisation details here."
  ].join("\n");
}

function buildDesignMessage(designTitle) {
  return [
    "Hello Saturn Cheetah Store,",
    "",
    `I’m interested in the ${designTitle} design.`,
    "Please help me choose the fit, colour and size."
  ].join("\n");
}

function buildBulkTeeMessage(form) {
  const formData = new FormData(form);
  const value = name => String(formData.get(name) || "").trim();

  return [
    "Hello Saturn Cheetah Store,",
    "",
    "I’d like a quote for a bulk T-shirt order.",
    "",
    `Organisation / purpose: ${value("purpose")}`,
    `Product type: ${value("productType")}`,
    `Quantity: ${value("quantity")}`,
    `Preferred colours: ${value("colours")}`,
    `Size breakup: ${value("sizes")}`,
    "Kids’ sizes are available for bulk orders.",
    `Printing / bulk embroidery: ${value("decoration")}`,
    `Branding position: ${value("position")}`,
    `Required date: ${value("requiredDate")}`,
    `Delivery city: ${value("city")}`,
    "",
    "I understand embroidery is available for bulk orders only.",
    "Please help me confirm suitable fabric, GSM, colours, final price and timeline."
  ].join("\n");
}

function widgetField(label, value = "") {
  return `${label}: ${String(value || "").trim()}`;
}

function buildWidgetCustomTeeMessage() {
  const colour = getSelectedColour();
  const quantity = document.querySelector("#custom-quantity")?.value || "";
  const designStatus = document.querySelector("#custom-design-status")?.value || "";
  const storeDesign = document.querySelector("input[name='storeDesign']:checked")?.value || "";

  return [
    "Hello Saturn Cheetah Store,",
    "",
    "I would like to customise a T-shirt.",
    "",
    widgetField("GSM / fit", productData[selectedProductKey].shortLabel),
    widgetField("Colour", colour?.label),
    widgetField("Size", selectedSize || "To be confirmed"),
    widgetField("Quantity", quantity),
    widgetField("Design status", designStatus),
    ...(storeDesign ? [widgetField("Selected Saturn Cheetah design", storeDesign)] : []),
    "",
    "Please help me with availability, pricing and the next steps."
  ].join("\n");
}

function buildWidgetDesignMessage() {
  const colour = getSelectedColour();
  const quantity = document.querySelector("#custom-quantity")?.value || "";
  const designTitle = document.querySelector(".design-card.is-active h3")?.textContent || "";

  return [
    "Hello Saturn Cheetah Store,",
    "",
    "I would like to customise one of your existing T-shirt designs.",
    "",
    widgetField("Design name", designTitle),
    widgetField("GSM / fit", productData[selectedProductKey].shortLabel),
    widgetField("Colour", colour?.label),
    widgetField("Size", selectedSize || "To be confirmed"),
    widgetField("Quantity", quantity),
    "",
    "Please help me continue with this order."
  ].join("\n");
}

function buildWidgetBulkMessage() {
  const form = document.querySelector("#bulk-options-panel");
  const formData = form ? new FormData(form) : new FormData();
  const value = name => String(formData.get(name) || "").trim();

  return [
    "Hello Saturn Cheetah Store,",
    "",
    "I am interested in a bulk apparel order.",
    "",
    widgetField("Organisation / purpose", value("purpose")),
    widgetField("Product style", value("productType")),
    widgetField("Quantity", value("quantity")),
    widgetField("Colours", value("colours")),
    widgetField("Adult size breakup", value("sizes")),
    "Kids size breakup, if required:",
    widgetField("Branding", value("position")),
    widgetField("Printing / bulk embroidery / both", value("decoration")),
    widgetField("Required date", value("requiredDate")),
    widgetField("Delivery city", value("city")),
    "",
    "Please share suitable options and a quotation."
  ].join("\n");
}

function buildWidgetSecondaryMessage() {
  return [
    "Hello Saturn Cheetah Store,",
    "",
    "I am interested in custom products for a bulk requirement.",
    "",
    "Product:",
    "Caps / mugs / coasters / tote bags / bottles / other",
    "",
    "Quantity:",
    "Artwork or logo ready:",
    "Required date:",
    "Delivery city:",
    "",
    "Please share available options and pricing."
  ].join("\n");
}

function buildWidgetGeneralMessage() {
  return [
    "Hello Saturn Cheetah Store,",
    "",
    "I have a customisation enquiry.",
    "",
    "Please help me with the available options."
  ].join("\n");
}

function buildAfterDarkMessage() {
  const formData = new FormData(afterDarkConfigurator);
  const details = formData.getAll("afterDarkDetails").map(value => String(value).trim()).filter(Boolean);

  return [
    "Hello Saturn Cheetah Store,",
    "",
    "I want a Saturn After Dark custom piece.",
    "",
    widgetField("Style", formData.get("afterDarkStyle")),
    widgetField("Details", details.length ? details.join(", ") : "None"),
    widgetField("Acid spray", formData.has("afterDarkAcidSpray") ? "Yes" : "No"),
    widgetField("Size", formData.get("afterDarkSize")),
    widgetField("Quantity", formData.get("afterDarkQuantity")),
    "",
    "Please help me continue with this piece."
  ].join("\n");
}

function getAfterDarkSelection() {
  if (!afterDarkConfigurator) return null;
  const formData = new FormData(afterDarkConfigurator);
  return {
    style: String(formData.get("afterDarkStyle") || "").trim(),
    details: formData.getAll("afterDarkDetails").map(value => String(value).trim()).filter(Boolean),
    acidSpray: formData.has("afterDarkAcidSpray") ? "Yes" : "No",
    size: String(formData.get("afterDarkSize") || "").trim(),
    quantity: String(formData.get("afterDarkQuantity") || "").trim()
  };
}

function setupAfterDarkConfigurator() {
  if (!afterDarkConfigurator) return;
  const quantityInput = document.querySelector("#after-dark-quantity");
  const quantityButtons = [...afterDarkConfigurator.querySelectorAll("[data-after-dark-quantity-step]")];
  const summary = document.querySelector("#after-dark-selection-summary");
  const steps = [...afterDarkConfigurator.querySelectorAll("[data-after-dark-step]")];
  const stepBack = afterDarkConfigurator.querySelector("[data-after-dark-step-back]");
  const stepNext = afterDarkConfigurator.querySelector("[data-after-dark-step-next]");
  const stepCurrent = document.querySelector("#after-dark-step-current");
  const stepLabel = document.querySelector("#after-dark-step-label");
  const stepLabels = ["Style", "Details", "Finish", "Size", "Quantity"];
  let activeStep = 0;
  let summaryMotionTimer = 0;

  const updateAfterDarkSizeAvailability = () => {
    const xsInput = afterDarkConfigurator.querySelector("input[name='afterDarkSize'][value='XS']");
    const xsLabel = xsInput?.closest("label");
    if (!xsInput || !xsLabel) return;
    xsLabel.hidden = false;
    xsInput.disabled = false;
  };

  const showStep = nextStep => {
    if (!steps.length) return;
    activeStep = Math.max(0, Math.min(steps.length - 1, nextStep));
    steps.forEach((step, index) => {
      const isActive = index === activeStep;
      step.hidden = !isActive;
      step.setAttribute("aria-hidden", String(!isActive));
    });
    if (stepCurrent) stepCurrent.textContent = String(activeStep + 1);
    if (stepLabel) stepLabel.textContent = stepLabels[activeStep] || "Selection";
    if (stepBack) stepBack.hidden = activeStep === 0;
    if (stepNext) stepNext.hidden = activeStep === steps.length - 1;
    afterDarkConfigurator.classList.toggle("is-final-step", activeStep === steps.length - 1);
  };

  const showSelectionMotion = target => {
    if (reducedMotion.matches) return;
    const choice = target.closest("label")?.querySelector(":scope > span");
    if (!choice) return;
    choice.classList.remove("is-just-selected");
    requestAnimationFrame(() => choice.classList.add("is-just-selected"));
    window.setTimeout(() => choice.classList.remove("is-just-selected"), 460);
  };

  const updateSummary = (animate = false) => {
    const selection = getAfterDarkSelection();
    if (!selection || !summary) return;
    summary.textContent = [
      selection.style,
      selection.details.length ? selection.details.join(", ") : "No added details",
      `Acid spray: ${selection.acidSpray}`,
      `Size ${selection.size}`,
      `Qty ${selection.quantity}`
    ].join(" · ");
    if (animate && !reducedMotion.matches) {
      summary.classList.remove("is-updating");
      requestAnimationFrame(() => summary.classList.add("is-updating"));
      window.clearTimeout(summaryMotionTimer);
      summaryMotionTimer = window.setTimeout(() => summary.classList.remove("is-updating"), 420);
    }
  };

  afterDarkConfigurator.addEventListener("change", event => {
    if (event.target.name === "afterDarkStyle") updateAfterDarkSizeAvailability();
    showSelectionMotion(event.target);
    updateSummary(true);
  });

  afterDarkConfigurator.addEventListener("input", event => {
    if (event.target.matches("input[type='number']")) updateSummary(true);
  });

  quantityInput?.addEventListener("blur", () => {
    if (!quantityInput.checkValidity()) quantityInput.value = "1";
    updateSummary(true);
  });

  quantityButtons.forEach(button => {
    button.addEventListener("click", () => {
      if (!quantityInput) return;
      const step = Number(button.dataset.afterDarkQuantityStep);
      const current = Number.parseInt(quantityInput.value, 10) || 1;
      const minimum = Number(quantityInput.min) || 1;
      const maximum = Number(quantityInput.max) || 500;
      quantityInput.value = String(Math.max(minimum, Math.min(maximum, current + step)));
      updateSummary(true);
    });
  });

  stepBack?.addEventListener("click", () => showStep(activeStep - 1));
  stepNext?.addEventListener("click", () => showStep(activeStep + 1));

  afterDarkConfigurator.addEventListener("submit", event => {
    event.preventDefault();
    if (!afterDarkConfigurator.reportValidity()) return;
    window.open(whatsappUrl(buildAfterDarkMessage()), "_blank", "noopener");
  });

  showStep(0);
  updateAfterDarkSizeAvailability();
  updateSummary();
}

function setupAutoMovingStrip(scroller, originals, duration = 32000) {
  if (!scroller || originals.length < 2) return;

  const pauseReasons = new Set(["viewport"]);
  const track = document.createElement("div");
  track.className = "motion-track";
  originals.forEach(original => track.append(original));
  scroller.append(track);

  if (reducedMotion.matches) return;

  let previousTime = 0;
  let travel = 0;
  let dragging = false;
  let dragStartX = 0;
  let dragStartScroll = 0;
  let committingScroll = false;
  let scrollTimer = 0;
  let frameEventTime = 0;
  const resumeTimers = new Map();
  let loopWidth = 0;

  originals.forEach(original => {
    const clone = original.cloneNode(true);
    clone.dataset.motionClone = "";
    clone.removeAttribute("data-gallery-index");
    clone.setAttribute("aria-hidden", "true");
    clone.setAttribute("inert", "");
    clone.querySelectorAll("[id], [data-gallery-open], [data-after-dark-preview], [data-design-title]").forEach(item => {
      item.removeAttribute("id");
      item.removeAttribute("data-gallery-open");
      item.removeAttribute("data-after-dark-preview");
      item.removeAttribute("data-design-title");
    });
    clone.querySelectorAll("a, button, input").forEach(item => item.tabIndex = -1);
    track.append(clone);
  });

  const measure = () => {
    const firstClone = track.querySelector("[data-motion-clone]");
    loopWidth = firstClone ? firstClone.offsetLeft - originals[0].offsetLeft : 0;
    if (loopWidth > 0) travel %= loopWidth;
    track.style.transform = `translate3d(${-travel}px, 0, 0)`;
  };

  const pause = reason => {
    window.clearTimeout(resumeTimers.get(reason));
    pauseReasons.add(reason);
    scroller.classList.remove("is-auto-moving");
  };

  const resume = (reason, delay = 700) => {
    window.clearTimeout(resumeTimers.get(reason));
    resumeTimers.set(reason, window.setTimeout(() => {
      pauseReasons.delete(reason);
      resumeTimers.delete(reason);
    }, delay));
  };

  const tick = time => {
    if (!pauseReasons.size && loopWidth > 0) {
      const elapsed = previousTime ? Math.min(time - previousTime, 48) : 0;
      scroller.classList.add("is-auto-moving");
      travel = (travel + (loopWidth / duration) * elapsed) % loopWidth;
      track.style.transform = `translate3d(${-travel}px, 0, 0)`;
      if (time - frameEventTime > 160) {
        scroller.dispatchEvent(new CustomEvent("auto-motion-frame"));
        frameEventTime = time;
      }
    } else {
      scroller.classList.remove("is-auto-moving");
    }
    previousTime = time;
    window.requestAnimationFrame(tick);
  };

  const commitManualScroll = () => {
    if (!scroller.scrollLeft || loopWidth <= 0) return;
    committingScroll = true;
    travel = (travel + scroller.scrollLeft) % loopWidth;
    scroller.scrollLeft = 0;
    track.style.transform = `translate3d(${-travel}px, 0, 0)`;
    window.requestAnimationFrame(() => {
      committingScroll = false;
    });
  };

  scroller.addEventListener("pointerenter", event => {
    if (event.pointerType === "mouse") pause("hover");
  });
  scroller.addEventListener("pointerleave", event => {
    if (event.pointerType === "mouse") resume("hover");
  });
  scroller.addEventListener("pointerdown", event => {
    pause("pointer");
    if (event.pointerType !== "mouse" || event.target.closest("button, a, input")) return;
    dragging = true;
    dragStartX = event.clientX;
    dragStartScroll = scroller.scrollLeft;
    scroller.classList.add("is-dragging");
    scroller.setPointerCapture(event.pointerId);
  });
  scroller.addEventListener("pointermove", event => {
    if (!dragging) return;
    scroller.scrollLeft = dragStartScroll + dragStartX - event.clientX;
    event.preventDefault();
  });
  const endPointerInteraction = event => {
    if (dragging) {
      dragging = false;
      scroller.classList.remove("is-dragging");
      if (scroller.hasPointerCapture(event.pointerId)) scroller.releasePointerCapture(event.pointerId);
    }
    window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(commitManualScroll, 180);
    resume("pointer", 1600);
  };
  scroller.addEventListener("pointerup", endPointerInteraction);
  scroller.addEventListener("pointercancel", endPointerInteraction);
  scroller.addEventListener("scroll", () => {
    if (committingScroll) return;
    pause("manual-scroll");
    window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(() => {
      commitManualScroll();
      resume("manual-scroll", 1200);
    }, 180);
  }, { passive: true });
  scroller.addEventListener("wheel", () => {
    pause("wheel");
    resume("wheel", 1600);
  }, { passive: true });
  scroller.addEventListener("focusin", () => pause("focus"));
  scroller.addEventListener("focusout", event => {
    if (!scroller.contains(event.relatedTarget)) resume("focus", 900);
  });
  scroller.addEventListener("keydown", () => {
    pause("keyboard");
    resume("keyboard", 1600);
  });
  scroller.addEventListener("auto-motion-pause", () => pause("modal"));
  scroller.addEventListener("auto-motion-resume", () => resume("modal", 1200));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) resume("viewport", 300);
      else pause("viewport");
    }, { threshold: 0.08 });
    observer.observe(scroller);
  } else {
    pauseReasons.delete("viewport");
  }

  window.addEventListener("resize", measure);
  measure();
  window.requestAnimationFrame(tick);
}

function setupAfterDarkGallery() {
  const gallery = document.querySelector(".after-dark-gallery");
  if (!gallery) return;
  const cards = [...gallery.querySelectorAll(":scope > .after-dark-gallery-card")];
  cards.forEach((card, index) => card.dataset.motionSource = String(index));
  setupAutoMovingStrip(gallery, cards, 34000);
  gallery.addEventListener("keydown", event => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    gallery.scrollBy({ left: direction * gallery.clientWidth * 0.78, behavior: "smooth" });
  });

  const modal = document.querySelector("#after-dark-modal");
  const modalImage = document.querySelector("#after-dark-modal-image");
  const modalCaption = document.querySelector("#after-dark-modal-caption");
  let previousFocus;

  if (!modal || !modalImage || !modalCaption) return;

  const openPreview = (image, trigger) => {
    const optionName = trigger.closest(".after-dark-option")?.querySelector("b")?.textContent
      || trigger.closest("label")?.querySelector("b")?.textContent
      || "Saturn After Dark option";
    previousFocus = trigger;
    hydrateDeferredMedia(image);
    modalImage.src = image.currentSrc || image.src;
    modalImage.srcset = image.srcset || "";
    modalImage.sizes = "min(88vw, 900px)";
    modalImage.alt = image.alt || `Preview of ${optionName}`;
    modalImage.width = Number(image.getAttribute("width")) || image.naturalWidth;
    modalImage.height = Number(image.getAttribute("height")) || image.naturalHeight;
    modalCaption.textContent = image.alt || optionName;
    document.body.classList.add("modal-open", "after-dark-modal-open");
    gallery.dispatchEvent(new CustomEvent("auto-motion-pause"));
    if (window.history.state?.saturnModal !== "after-dark") {
      window.history.pushState({ ...window.history.state, saturnModal: "after-dark" }, "");
    }
    if (typeof modal.showModal === "function") modal.showModal();
    else modal.setAttribute("open", "");
    modal.querySelector(".after-dark-modal-close")?.focus();
    refreshFloatingPill();
  };

  const closePreview = () => {
    if (typeof modal.close === "function") modal.close();
    else {
      modal.removeAttribute("open");
      modal.dispatchEvent(new Event("close"));
    }
  };

  const dismissPreview = () => {
    if (window.history.state?.saturnModal === "after-dark") {
      window.history.back();
      return;
    }
    closePreview();
  };

  gallery.querySelectorAll("[data-after-dark-preview]").forEach(button => {
    button.addEventListener("click", () => openPreview(button.querySelector("img"), button));
  });

  document.querySelectorAll(".after-dark-option-preview").forEach(button => {
    const option = button.closest(".after-dark-option");
    const image = option?.querySelector("img");
    const optionName = option?.querySelector("b")?.textContent || "Saturn After Dark option";
    if (!image) return;
    button.setAttribute("aria-label", `View ${optionName} detail`);
    button.addEventListener("click", event => {
      event.stopPropagation();
      openPreview(image, button);
    });
  });

  modal.querySelector(".after-dark-modal-close")?.addEventListener("click", dismissPreview);
  modal.addEventListener("click", event => {
    if (event.target === modal) dismissPreview();
  });
  modal.addEventListener("cancel", event => {
    event.preventDefault();
    dismissPreview();
  });
  modal.addEventListener("close", () => {
    document.body.classList.remove("modal-open", "after-dark-modal-open");
    gallery.dispatchEvent(new CustomEvent("auto-motion-resume"));
    previousFocus?.focus();
    refreshFloatingPill();
  });

  window.addEventListener("popstate", () => {
    if (modal.open || modal.hasAttribute("open")) closePreview();
  });
}

function updateWidgetEnquiryLinks() {
  const builders = {
    "custom-tee": buildWidgetCustomTeeMessage,
    design: buildWidgetDesignMessage,
    "bulk-tee": buildWidgetBulkMessage,
    secondary: buildWidgetSecondaryMessage,
    "after-dark": buildAfterDarkMessage,
    general: buildWidgetGeneralMessage
  };

  document.querySelectorAll("[data-widget-enquiry]").forEach(link => {
    const buildMessage = builders[link.dataset.widgetEnquiry];
    if (buildMessage) link.href = whatsappUrl(buildMessage());
  });
}

function closeWhatsAppWidget(returnFocus = true) {
  if (!floatingWhatsapp || !whatsappEnquiryPanel || whatsappEnquiryPanel.hidden) return;
  whatsappEnquiryPanel.hidden = true;
  floatingWhatsapp.setAttribute("aria-expanded", "false");
  document.body.classList.remove("whatsapp-widget-open");
  if (returnFocus) floatingWhatsapp.focus();
}

function openWhatsAppWidget() {
  if (!floatingWhatsapp || !whatsappEnquiryPanel) return;
  setNavigationOpen(false);
  updateWidgetEnquiryLinks();
  whatsappEnquiryPanel.hidden = false;
  floatingWhatsapp.setAttribute("aria-expanded", "true");
  document.body.classList.add("whatsapp-widget-open");
  whatsappEnquiryPanel.querySelector(".whatsapp-enquiry-close")?.focus();
}

function setupWhatsAppWidget() {
  if (!floatingWhatsapp || !whatsappEnquiryPanel) return;

  floatingWhatsapp.addEventListener("click", () => {
    if (floatingWhatsapp.getAttribute("aria-expanded") === "true") {
      closeWhatsAppWidget();
    } else {
      openWhatsAppWidget();
    }
  });

  whatsappEnquiryPanel.querySelector(".whatsapp-enquiry-close")?.addEventListener("click", () => {
    closeWhatsAppWidget();
  });

  whatsappEnquiryPanel.addEventListener("click", event => {
    if (event.target.closest("[data-widget-enquiry]")) closeWhatsAppWidget(false);
  });

  document.addEventListener("click", event => {
    if (whatsappEnquiryPanel.hidden || whatsappWidget?.contains(event.target)) return;
    closeWhatsAppWidget();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !whatsappEnquiryPanel.hidden) {
      event.preventDefault();
      closeWhatsAppWidget();
    }
  });
}

function updateWhatsAppLinks() {
  document.querySelectorAll("[data-whatsapp-action='print']").forEach(link => {
    link.href = whatsappUrl(buildProductMessage("print"));
  });

  document.querySelectorAll("[data-whatsapp-action='final'], [data-whatsapp-action='pill']").forEach(link => {
    link.href = whatsappUrl(buildProductMessage("final"));
  });

  document.querySelectorAll("[data-whatsapp-action='general']").forEach(link => {
    link.href = whatsappUrl(buildWidgetGeneralMessage());
  });

  document.querySelectorAll("[data-bulk-product]").forEach(link => {
    link.href = whatsappUrl(buildBulkMessage(link.dataset.bulkProduct));
  });

  document.querySelectorAll("[data-portrait-enquiry]").forEach(link => {
    link.href = whatsappUrl(buildPortraitMessage());
  });

  document.querySelectorAll("[data-design-title]").forEach(link => {
    link.href = whatsappUrl(buildDesignMessage(link.dataset.designTitle));
  });

}

function setupPortraitOrder() {
  const form = document.querySelector("#portrait-order-form");
  if (!form) return;

  form.addEventListener("submit", event => {
    event.preventDefault();
    const selection = form.querySelector("input[name='portraitSize']:checked");
    if (!selection) return;
    window.open(whatsappUrl(buildPortraitMessage(selection.value, selection.dataset.price)), "_blank", "noopener");
  });
}

function setupWhatsAppFlow() {
  const requiredDate = document.querySelector("#custom-date");
  const designStatus = document.querySelector("#custom-design-status");
  const designInstructions = document.querySelector("#custom-design-instructions");
  const ownArtworkFields = [...document.querySelectorAll("[data-own-artwork-field]")];
  const storeDesignPicker = document.querySelector("[data-store-design-picker]");
  const storeDesignInputs = [...document.querySelectorAll("input[name='storeDesign']")];
  const priceEstimate = document.querySelector("#custom-price-estimate");
  if (requiredDate) requiredDate.min = getLocalDateString();

  const updateStoreDesignPicker = () => {
    const shouldChooseStoreDesign = designStatus?.value === "I want a Saturn Cheetah store design";
    const shouldCreateOwn = !shouldChooseStoreDesign;
    if (storeDesignPicker) storeDesignPicker.hidden = !shouldChooseStoreDesign;
    ownArtworkFields.forEach(field => { field.hidden = !shouldCreateOwn; });
    if (designInstructions) designInstructions.disabled = !shouldCreateOwn;
    storeDesignInputs.forEach((input, index) => {
      input.disabled = !shouldChooseStoreDesign;
      input.required = shouldChooseStoreDesign && index === 0;
    });
    const selectedProduct = Object.values(productData).find(item => item.value === productSelect?.value);
    if (priceEstimate) {
      priceEstimate.textContent = selectedProduct
        ? (shouldChooseStoreDesign ? selectedProduct.readyDesignPrice : selectedProduct.customPrice)
        : "Quote required";
    }
  };

  designStatus?.addEventListener("change", updateStoreDesignPicker);
  productSelect?.addEventListener("change", updateStoreDesignPicker);
  updateStoreDesignPicker();

  customiseForm?.addEventListener("submit", event => {
    event.preventDefault();
    if (!customiseForm.reportValidity()) return;
    const product = productSelect?.value;
    const isPersonalTee = product === productData["180"].value || product === productData["240"].value;
    if (isPersonalTee && !requireTeeSize()) {
      document.querySelector("#tees")?.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth" });
      return;
    }
    window.open(whatsappUrl(buildCustomMessage()), "_blank", "noopener");
  });

  updateWhatsAppLinks();
}

function setupBulkTeeFlow() {
  const toggle = document.querySelector(".bulk-options-toggle");
  const panel = document.querySelector("#bulk-options-panel");
  const requiredDate = document.querySelector("#bulk-date");

  if (!toggle || !panel) return;
  if (requiredDate) requiredDate.min = getLocalDateString();

  toggle.addEventListener("click", () => {
    const willExpand = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(willExpand));
    toggle.textContent = willExpand ? "Hide bulk options" : "View bulk options";
    panel.hidden = !willExpand;
  });

  panel.addEventListener("submit", event => {
    event.preventDefault();
    if (!panel.reportValidity()) return;
    window.open(whatsappUrl(buildBulkTeeMessage(panel)), "_blank", "noopener");
  });
}

function setupReviewCarousel() {
  const scroller = document.querySelector(".reviews-scroller");
  const cards = [...document.querySelectorAll(".review-card")];
  const previous = document.querySelector("[data-review-previous]");
  const next = document.querySelector("[data-review-next]");
  const position = document.querySelector("#review-position");
  let scrollFrame;

  if (!scroller || cards.length === 0 || !position) return;

  const cardOffset = card => {
    const scrollInset = Number.parseFloat(getComputedStyle(scroller).scrollPaddingLeft) || 0;
    return card.getBoundingClientRect().left
      - scroller.getBoundingClientRect().left
      + scroller.scrollLeft
      - scrollInset;
  };

  const activeIndex = () => {
    const current = scroller.scrollLeft;
    return cards.reduce((nearest, card, index) => (
      Math.abs(cardOffset(card) - current) < Math.abs(cardOffset(cards[nearest]) - current)
        ? index
        : nearest
    ), 0);
  };

  const updateState = () => {
    const index = activeIndex();
    const atStart = scroller.scrollLeft <= 2;
    const atEnd = scroller.scrollLeft >= scroller.scrollWidth - scroller.clientWidth - 2;

    position.textContent = `${index + 1} of ${cards.length}`;
    if (previous) previous.disabled = atStart;
    if (next) next.disabled = atEnd;
  };

  const showCard = index => {
    const target = cards[Math.max(0, Math.min(index, cards.length - 1))];
    scroller.scrollTo({
      left: cardOffset(target),
      behavior: reducedMotion.matches ? "auto" : "smooth"
    });
  };

  previous?.addEventListener("click", () => showCard(activeIndex() - 1));
  next?.addEventListener("click", () => showCard(activeIndex() + 1));

  scroller.addEventListener("keydown", event => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    showCard(activeIndex() + (event.key === "ArrowRight" ? 1 : -1));
  });

  scroller.addEventListener("scroll", () => {
    window.cancelAnimationFrame(scrollFrame);
    scrollFrame = window.requestAnimationFrame(updateState);
  }, { passive: true });

  window.addEventListener("resize", updateState);
  updateState();
}

function setupDesignGallery() {
  const scroller = document.querySelector(".design-gallery");
  const cards = [...scroller?.querySelectorAll(":scope > .design-card") || []];
  const position = document.querySelector("#design-gallery-position");
  let scrollFrame;

  if (!scroller || cards.length === 0 || !position) return;
  cards.forEach((card, index) => card.dataset.motionSource = String(index));
  setupAutoMovingStrip(scroller, cards, 30000);

  const cardOffset = card => {
    const scrollInset = Number.parseFloat(getComputedStyle(scroller).scrollPaddingLeft) || 0;
    return card.getBoundingClientRect().left
      - scroller.getBoundingClientRect().left
      + scroller.scrollLeft
      - scrollInset;
  };

  const activeIndex = () => {
    const galleryLeft = scroller.getBoundingClientRect().left;
    const visibleCards = [...scroller.querySelectorAll(".motion-track > .design-card")];
    const nearest = visibleCards.reduce((closest, card) => {
      const distance = Math.abs(card.getBoundingClientRect().left - galleryLeft);
      return distance < closest.distance ? { card, distance } : closest;
    }, { card: cards[0], distance: Number.POSITIVE_INFINITY }).card;
    return Number(nearest.dataset.motionSource) || 0;
  };

  const updateState = () => {
    const index = activeIndex();
    const total = String(cards.length).padStart(2, "0");

    position.textContent = `${String(index + 1).padStart(2, "0")} / ${total}`;
    position.setAttribute("aria-label", `Design ${index + 1} of ${cards.length}`);
    cards.forEach((card, cardIndex) => card.classList.toggle("is-active", cardIndex === index));
  };

  const showCard = index => {
    const target = cards[Math.max(0, Math.min(index, cards.length - 1))];
    scroller.scrollTo({
      left: cardOffset(target),
      behavior: reducedMotion.matches ? "auto" : "smooth"
    });
  };

  scroller.addEventListener("keydown", event => {
    if (event.target !== scroller || (event.key !== "ArrowLeft" && event.key !== "ArrowRight")) return;
    event.preventDefault();
    showCard(activeIndex() + (event.key === "ArrowRight" ? 1 : -1));
  });

  scroller.addEventListener("scroll", () => {
    window.cancelAnimationFrame(scrollFrame);
    scrollFrame = window.requestAnimationFrame(updateState);
  }, { passive: true });
  scroller.addEventListener("auto-motion-frame", updateState);

  window.addEventListener("resize", updateState);

  scroller.addEventListener("click", event => {
    const preview = event.target.closest("[data-gallery-open]");
    const card = preview?.closest(".design-card");
    if (!preview || !card || !window.matchMedia("(hover: none)").matches) return;
    if (card.classList.contains("is-overlay-open")) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    cards.forEach(item => item.classList.toggle("is-overlay-open", item === card));
    scroller.dispatchEvent(new CustomEvent("auto-motion-pause"));
  }, true);

  document.addEventListener("click", event => {
    if (scroller.contains(event.target)) return;
    cards.forEach(card => {
      card.classList.remove("is-overlay-open");
    });
    scroller.dispatchEvent(new CustomEvent("auto-motion-resume"));
  });

  updateState();
}

function setupFloatingPill() {
  if (!floatingWhatsapp || !("IntersectionObserver" in window)) {
    whatsappWidget?.classList.add("is-visible");
    return;
  }

  const zoneObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        visibleWhatsappZones.add(entry.target);
      } else {
        visibleWhatsappZones.delete(entry.target);
      }
    });
    refreshFloatingPill();
  }, { threshold: 0.08 });

  document.querySelectorAll("[data-whatsapp-zone], .tee-selector").forEach(zone => zoneObserver.observe(zone));

  refreshFloatingPill();
}

function setupGalleryModal() {
  const modal = document.querySelector("#design-modal");
  const designGallery = document.querySelector(".design-gallery");
  const modalImage = document.querySelector("#modal-image");
  const modalCaption = document.querySelector("#modal-caption");
  const modalCount = document.querySelector("#modal-count");
  const viewOptions = document.querySelector("#modal-view-options");
  const viewButtons = [...viewOptions?.querySelectorAll("[data-modal-view]") || []];
  const galleryItems = [...document.querySelectorAll("[data-gallery-index]")];
  let activeIndex = 0;
  let activeView = "editorial";
  let previousFocus;

  if (!modal || !modalImage || galleryItems.length === 0) return;

  function renderView() {
    const item = galleryItems[activeIndex];
    const sourceImage = item.querySelector("img");
    const showDetail = activeView === "detail" && item.dataset.detailSrc;

    hydrateDeferredMedia(sourceImage);
    modalImage.src = showDetail ? item.dataset.detailSrc : (sourceImage.currentSrc || sourceImage.src);
    modalImage.alt = showDetail ? item.dataset.detailAlt : sourceImage.alt;
    modalImage.width = showDetail ? 720 : Number(sourceImage.getAttribute("width"));
    modalImage.height = showDetail ? 720 : Number(sourceImage.getAttribute("height"));
    viewButtons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.modalView === activeView)));
  }

  function renderModal(index) {
    activeIndex = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[activeIndex];
    const caption = item.querySelector("h3")?.textContent || "Design preview";

    activeView = "editorial";
    viewOptions.hidden = !item.dataset.detailSrc;
    renderView();
    modalCaption.textContent = caption;
    modalCount.textContent = `${activeIndex + 1} of ${galleryItems.length}`;
  }

  function openModal(index, trigger) {
    previousFocus = trigger;
    renderModal(index);
    document.querySelectorAll(".design-card.is-overlay-open").forEach(card => card.classList.remove("is-overlay-open"));
    document.body.classList.add("modal-open");
    designGallery?.dispatchEvent(new CustomEvent("auto-motion-pause"));

    if (typeof modal.showModal === "function") {
      modal.showModal();
    } else {
      modal.setAttribute("open", "");
    }

    modal.querySelector(".modal-close")?.focus();
    refreshFloatingPill();
  }

  function closeModal() {
    if (typeof modal.close === "function") {
      modal.close();
    } else {
      modal.removeAttribute("open");
      modal.dispatchEvent(new Event("close"));
    }
  }

  galleryItems.forEach((item, index) => {
    const preview = item.querySelector("[data-gallery-open]");
    preview?.addEventListener("click", () => openModal(index, preview));
  });

  modal.querySelector(".modal-close")?.addEventListener("click", closeModal);
  modal.querySelector("[data-gallery-previous]")?.addEventListener("click", () => renderModal(activeIndex - 1));
  modal.querySelector("[data-gallery-next]")?.addEventListener("click", () => renderModal(activeIndex + 1));
  viewButtons.forEach(button => button.addEventListener("click", () => {
    activeView = button.dataset.modalView;
    renderView();
  }));

  modal.addEventListener("click", event => {
    if (event.target === modal) closeModal();
  });

  modal.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      renderModal(activeIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      renderModal(activeIndex + 1);
    }
  });

  modal.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
    designGallery?.dispatchEvent(new CustomEvent("auto-motion-resume"));
    previousFocus?.focus();
    refreshFloatingPill();
  });
}

function setupSectionReveals() {
  const revealItems = document.querySelectorAll(
    ".section-heading, .tee-selector, .tab-module, .after-dark-intro, .after-dark-media, .after-dark-configurator, .secondary-scroller, .faq-list, .final-cta-inner"
  );

  revealItems.forEach(item => item.classList.add("reveal-item"));

  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    revealItems.forEach(item => item.classList.add("is-visible"));
    return;
  }

  document.body.classList.add("motion-enabled");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.08,
    rootMargin: "0px 0px -8% 0px"
  });

  revealItems.forEach(item => observer.observe(item));
}

function setupStoreJourney() {
  const chapters = [
    { element: document.querySelector(".hero"), mood: "boutique" },
    { element: document.querySelector("#tees"), mood: "studio" },
    { element: document.querySelector("#direction"), mood: "lookbook" },
    { element: document.querySelector("#after-dark"), mood: "after-dark" }
  ].filter(chapter => chapter.element);

  if (!chapters.length || reducedMotion.matches) return;

  document.documentElement.classList.add("store-journey-enabled");
  let frame = 0;

  const updateJourney = () => {
    frame = 0;
    const viewportHeight = window.innerHeight;
    const focusLine = viewportHeight * 0.48;
    let activeChapter = chapters[0];
    let closestDistance = Number.POSITIVE_INFINITY;

    chapters.forEach(chapter => {
      const bounds = chapter.element.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (viewportHeight - bounds.top) / (viewportHeight + bounds.height)));
      chapter.element.style.setProperty("--journey-progress", progress.toFixed(4));

      if (chapter.element.matches(".hero")) {
        const heroExitProgress = Math.max(0, Math.min(1, -bounds.top / Math.max(bounds.height, 1)));
        chapter.element.style.setProperty("--hero-exit-progress", heroExitProgress.toFixed(4));
        chapter.element.style.setProperty("--hero-image-lift", `${(heroExitProgress * -34).toFixed(2)}px`);
        chapter.element.style.setProperty("--hero-image-scale", (1 + heroExitProgress * 0.035).toFixed(4));
      }

      chapter.element.style.setProperty("--journey-shift", `${((progress - 0.5) * 18).toFixed(2)}px`);
      chapter.element.style.setProperty("--journey-lift", `${((0.5 - progress) * 18).toFixed(2)}px`);
      chapter.element.style.setProperty("--journey-parallax", `${(progress * 18).toFixed(2)}px`);
      chapter.element.style.setProperty("--journey-scale", (1 + progress * 0.018).toFixed(4));
      chapter.element.style.setProperty("--journey-opacity", (0.3 + progress * 0.7).toFixed(3));
      chapter.element.style.setProperty("--journey-sweep", `${(progress * 82).toFixed(2)}%`);
      chapter.element.style.setProperty("--journey-glow-x", `${(18 + progress * 48).toFixed(2)}%`);
      chapter.element.style.setProperty("--journey-dark-glow-x", `${(88 - progress * 38).toFixed(2)}%`);
      const chapterCenter = bounds.top + bounds.height / 2;
      const distance = Math.abs(chapterCenter - focusLine);
      if (distance < closestDistance) {
        closestDistance = distance;
        activeChapter = chapter;
      }
    });

    document.documentElement.dataset.storeMood = activeChapter.mood;
  };

  const requestJourneyUpdate = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(updateJourney);
  };

  window.addEventListener("scroll", requestJourneyUpdate, { passive: true });
  window.addEventListener("resize", requestJourneyUpdate);
  updateJourney();
}

function setupAfterDarkPowerSwitch() {
  const section = document.querySelector("#after-dark");
  const powerSwitch = section?.querySelector(".after-dark-power-switch");
  if (!section || !powerSwitch) return;

  const playSwitchClick = poweredOn => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const start = context.currentTime;

    const clickLength = Math.floor(context.sampleRate * 0.042);
    const clickBuffer = context.createBuffer(1, clickLength, context.sampleRate);
    const clickData = clickBuffer.getChannelData(0);
    for (let index = 0; index < clickLength; index += 1) {
      const decay = 1 - index / clickLength;
      clickData[index] = (Math.random() * 2 - 1) * decay * decay;
    }

    const click = context.createBufferSource();
    const clickFilter = context.createBiquadFilter();
    const clickGain = context.createGain();
    click.buffer = clickBuffer;
    clickFilter.type = "bandpass";
    clickFilter.frequency.value = poweredOn ? 2150 : 1650;
    clickFilter.Q.value = 0.75;
    clickGain.gain.setValueAtTime(0.19, start);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.045);
    click.connect(clickFilter).connect(clickGain).connect(context.destination);

    const relay = context.createOscillator();
    const relayGain = context.createGain();
    relay.type = "sine";
    relay.frequency.setValueAtTime(poweredOn ? 72 : 58, start);
    relay.frequency.exponentialRampToValueAtTime(38, start + 0.072);
    relayGain.gain.setValueAtTime(0.0001, start);
    relayGain.gain.exponentialRampToValueAtTime(0.055, start + 0.008);
    relayGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.085);
    relay.connect(relayGain).connect(context.destination);

    const airLength = Math.floor(context.sampleRate * 0.14);
    const airBuffer = context.createBuffer(1, airLength, context.sampleRate);
    const airData = airBuffer.getChannelData(0);
    for (let index = 0; index < airLength; index += 1) {
      const decay = 1 - index / airLength;
      airData[index] = (Math.random() * 2 - 1) * decay * decay * decay;
    }
    const air = context.createBufferSource();
    const airFilter = context.createBiquadFilter();
    const airGain = context.createGain();
    air.buffer = airBuffer;
    airFilter.type = "highpass";
    airFilter.frequency.value = 3200;
    airGain.gain.setValueAtTime(0.0001, start + 0.018);
    airGain.gain.exponentialRampToValueAtTime(poweredOn ? 0.024 : 0.014, start + 0.035);
    airGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.145);
    air.connect(airFilter).connect(airGain).connect(context.destination);

    click.start(start);
    relay.start(start);
    air.start(start + 0.018);
    relay.stop(start + 0.09);
    window.setTimeout(() => context.close(), 220);
  };

  powerSwitch.addEventListener("click", () => {
    const poweredOn = !section.classList.contains("is-powered");
    section.classList.toggle("is-powered", poweredOn);
    powerSwitch.setAttribute("aria-pressed", String(poweredOn));
    powerSwitch.setAttribute("aria-label", poweredOn ? "Leave Saturn After Dark" : "Enter Saturn After Dark");
    powerSwitch.querySelector("strong").textContent = poweredOn ? "After Dark is open" : "Enter After Dark";
    playSwitchClick(poweredOn);
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => section.classList.toggle("is-in-view", entry.isIntersecting));
    }, { threshold: 0.3 });
    observer.observe(section);
  }
}

function setupFooterYear() {
  const year = document.querySelector("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());
}

function setupFAQAssistant() {
  const assistant = document.querySelector("[data-faq-assistant]");
  if (!assistant) return;

  const questions = [...assistant.querySelectorAll("details")];
  questions.forEach(question => {
    question.addEventListener("toggle", () => {
      if (!question.open) return;
      questions.forEach(otherQuestion => {
        if (otherQuestion !== question) otherQuestion.open = false;
      });
    });
  });
}

function setupPlainTeeOffer() {
  const shop = document.querySelector(".plain-tee-shop");
  if (!shop) return;

  const toggles = [...shop.querySelectorAll("[data-plain-tee-toggle]")];
  const panels = [...shop.querySelectorAll("[data-plain-tee-panel]")];
  const colourSlugs = { Black: "black", White: "white", "Off-white": "off-white", Blue: "blue", Green: "green", Gray: "gray", Red: "red", Yellow: "yellow", Pink: "pink", Orange: "orange", "Navy Blue": "navy-blue" };

  const setOpenPanel = key => {
    const panel = panels.find(item => item.dataset.plainTeePanel === key);
    const willOpen = panel?.hidden ?? false;
    panels.forEach(item => { item.hidden = !willOpen || item !== panel; });
    toggles.forEach(toggle => {
      const isOpen = willOpen && toggle.dataset.plainTeeToggle === key;
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.querySelector("span").textContent = isOpen ? "↑" : "↓";
    });
    if (willOpen && panel && !reducedMotion.matches) panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  toggles.forEach(toggle => toggle.addEventListener("click", () => setOpenPanel(toggle.dataset.plainTeeToggle)));

  shop.querySelectorAll("[data-plain-item]").forEach(item => {
    const select = item.querySelector("select[name*='Colour']");
    const preview = item.querySelector("[data-plain-preview]");
    select?.addEventListener("change", () => {
      if (!preview || !select.value) return;
      const product = item.dataset.plainItem;
      const slug = colourSlugs[select.value];
      const largeWidth = product === "180" ? (slug === "black" ? 994 : 992) : (slug === "black" ? 1024 : 993);
      preview.src = `assets/images/products/${product}/tshirt-${product}-${slug}-640.webp`;
      preview.srcset = `assets/images/products/${product}/tshirt-${product}-${slug}-640.webp 640w, assets/images/products/${product}/tshirt-${product}-${slug}-${largeWidth}.webp ${largeWidth}w`;
      preview.alt = `${select.value} ${product} GSM ${product === "180" ? "regular-fit" : "oversized"} T-shirt`;
    });
  });

  panels.forEach(form => form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const isRegular = form.dataset.plainTeePanel === "regular";
    const message = isRegular
      ? ["Hello Saturn Cheetah Store,", "", "I’m interested in the 3 plain 180 GSM regular-fit T-shirts offer for ₹1,199.", "", ...[1, 2, 3].map(number => `T-shirt ${number}: ${data.get(`plainTeeColour${number}`)}, size ${data.get(`plainTeeSize${number}`)}`), "", "Please help me confirm availability and the next steps."].join("\n")
      : ["Hello Saturn Cheetah Store,", "", "I’m interested in the plain 240 GSM oversized T-shirt for ₹799 per piece.", "", `Colour: ${data.get("plainOversizedColour")}`, `Size: ${data.get("plainOversizedSize")}`, `Quantity: ${data.get("plainOversizedQuantity")}`, "", "Please help me confirm availability and the next steps."].join("\n");

    window.open(whatsappUrl(message), "_blank", "noopener");
  }));
}

function respectReducedMotion() {
  if (!reducedMotion.matches) return;
  document.querySelectorAll("video").forEach(video => video.pause());
}

function hydrateDeferredMedia(media) {
  if (!media) return;

  media.closest("picture")?.querySelectorAll("source[data-deferred-srcset]").forEach(source => {
    source.srcset = source.dataset.deferredSrcset;
    source.removeAttribute("data-deferred-srcset");
  });

  if (media.dataset.deferredSrcset) {
    media.srcset = media.dataset.deferredSrcset;
    media.removeAttribute("data-deferred-srcset");
  }

  if (media.dataset.deferredSrc) {
    media.src = media.dataset.deferredSrc;
    media.removeAttribute("data-deferred-src");
  }

  if (media.dataset.deferredPoster) {
    media.poster = media.dataset.deferredPoster;
    media.removeAttribute("data-deferred-poster");
  }
}

function setupDeferredMedia() {
  const mediaItems = [...document.querySelectorAll("[data-deferred-src], [data-deferred-poster]")];
  if (!mediaItems.length) return;

  if (!("IntersectionObserver" in window)) {
    mediaItems.forEach(hydrateDeferredMedia);
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      hydrateDeferredMedia(entry.target);
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "240px 0px", threshold: 0.01 });

  mediaItems.forEach(media => observer.observe(media));
}

function setupBackgroundVideos() {
  const videos = document.querySelectorAll("[data-background-video]");
  if (!videos.length || reducedMotion.matches) return;

  const loadVideo = video => {
    if (video.dataset.loaded === "true") return;
    video.querySelectorAll("source[data-src]").forEach(source => {
      source.src = source.dataset.src;
      source.removeAttribute("data-src");
    });
    video.dataset.loaded = "true";
    video.load();
  };

  if (!("IntersectionObserver" in window)) {
    videos.forEach(video => {
      loadVideo(video);
      video.play().catch(() => {});
    });
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting) {
        loadVideo(video);
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { rootMargin: "30% 0px", threshold: 0.01 });

  videos.forEach(video => observer.observe(video));
}

function setupFloatingGallery() {
  const gallery = document.querySelector("[data-floating-gallery]");
  if (!gallery) return;

  const desktopGallery = window.matchMedia("(min-width: 1100px)");
  const allImageIndices = Array.from({ length: 69 }, (_, index) => index + 1).filter(index => index !== 25);
  const roundImages = new Set([6, 8, 9, 10, 12, 17, 27, 39, 44]);
  const collagePools = {
    lead: [
      { index: 68, alt: "Customer wearing a vivid Saturn Cheetah graphic T-shirt outdoors at night", focus: "50% 35%" },
      { index: 3, alt: "Family wearing personalised Saturn Cheetah T-shirts", focus: "50% 45%" },
      { index: 15, alt: "Customer wearing a black Saturn Cheetah graphic T-shirt", focus: "50% 38%" },
      { index: 34, alt: "Young customer wearing a Saturn Cheetah graphic T-shirt by the sea", focus: "50% 36%" },
      { index: 50, alt: "Customer wearing a Saturn Cheetah T-shirt outdoors", focus: "50% 38%" },
      { index: 61, alt: "Young customer wearing a Saturn Cheetah graphic T-shirt", focus: "50% 34%" },
      { index: 47, alt: "Customer wearing a bright portrait-print T-shirt at night", focus: "50% 36%" },
      { index: 40, alt: "Customer wearing a Saturn Cheetah skull-print T-shirt", focus: "50% 34%" }
    ],
    mid: [
      { index: 13, alt: "Group of customers celebrating in custom white T-shirts", focus: "50% 48%" },
      { index: 63, alt: "Group wearing matching Saturn Cheetah T-shirts", focus: "50% 50%" },
      { index: 1, alt: "Friends showing coordinated Saturn Cheetah back prints", focus: "50% 46%" },
      { index: 5, alt: "Three customers showing personalised back prints", focus: "50% 44%" },
      { index: 20, alt: "Family group wearing custom T-shirts outdoors", focus: "50% 48%" },
      { index: 26, alt: "Two customers wearing coordinated Saturn Cheetah T-shirts", focus: "50% 45%" },
      { index: 41, alt: "Family wearing matching Saturn Cheetah T-shirts", focus: "50% 46%" },
      { index: 46, alt: "Team wearing matching custom T-shirts", focus: "50% 50%" }
    ],
    accent: [
      { index: 2, alt: "Two customers showing colourful Saturn Cheetah back prints", focus: "50% 42%" },
      { index: 29, alt: "Two customers showing custom graphic T-shirt prints", focus: "50% 45%" },
      { index: 6, alt: "Customer wearing a Saturn Cheetah T-shirt in purple event lighting", focus: "50% 48%" },
      { index: 18, alt: "Customer wearing a personalised portrait T-shirt outdoors", focus: "50% 40%" },
      { index: 21, alt: "Customers wearing personalised Saturn Cheetah designs", focus: "50% 42%" },
      { index: 24, alt: "Customer wearing a colourful Saturn Cheetah graphic T-shirt", focus: "50% 38%" },
      { index: 53, alt: "Two young customers wearing colourful graphic T-shirts", focus: "50% 38%" },
      { index: 58, alt: "Young customer wearing a colourful Saturn Cheetah T-shirt", focus: "50% 36%" }
    ]
  };
  const visibleCollageImages = [
    { ...collagePools.lead[1], role: "lead" },
    { ...collagePools.mid[0], role: "mid" },
    { ...collagePools.accent[0], role: "accent" }
  ];
  const staticCollageImages = [
    ...visibleCollageImages,
    { ...collagePools.lead[2], role: "static" },
    { ...collagePools.accent[2], role: "static" }
  ];
  const collageRotationRoles = ["accent", "mid", "lead"];
  const collagePoolCursors = { lead: 2, mid: 1, accent: 1 };
  const slayingSection = gallery.closest(".slaying-section");
  let collageRotationTimer = 0;
  let collageRotationGroup = 0;
  let collageInView = false;

  const collageSource = index => `assets/images/customer-gallery/experience-${String(index).padStart(2, "0")}.jpg`;

  const collageDimensions = role => role === "mid" ? { width: 620, height: 620 } : { width: 520, height: 650 };

  const nextCollageImage = (role, visibleIndices) => {
    const pool = collagePools[role];
    for (let attempt = 0; attempt < pool.length; attempt += 1) {
      const cursor = collagePoolCursors[role] % pool.length;
      collagePoolCursors[role] += 1;
      const item = pool[cursor];
      if (visibleIndices.has(item.index)) continue;
      visibleIndices.add(item.index);
      return item;
    }
    return null;
  };

  const rotateCollage = () => {
    if (gallery.dataset.galleryMode !== "collage" || reducedMotion.matches || document.hidden) return;
    const memories = [...gallery.querySelectorAll('.slaying-memory.is-collage[data-collage-rotates="true"]')];
    const visibleIndices = new Set(memories.map(memory => Number(memory.dataset.imageIndex)));
    const role = collageRotationRoles[collageRotationGroup % collageRotationRoles.length];
    collageRotationGroup += 1;
    const memory = gallery.querySelector(`[data-collage-role="${role}"]`);
    const image = memory?.querySelector("img");
    if (!memory || !image) return;
    const item = nextCollageImage(role, visibleIndices);
    if (!item) return;
    const previousImageIndex = memory.dataset.imageIndex;
    memory.dataset.imageIndex = String(item.index);

    const source = collageSource(item.index);
    const dimensions = collageDimensions(role);
    const nextImage = new Image();
    nextImage.className = "slaying-memory-next";
    nextImage.src = source;
    nextImage.alt = item.alt;
    nextImage.width = dimensions.width;
    nextImage.height = dimensions.height;
    nextImage.loading = "eager";
    nextImage.decoding = "async";
    nextImage.style.objectPosition = item.focus;
    const ready = typeof nextImage.decode === "function" ? nextImage.decode() : Promise.resolve();

    ready.then(() => {
      if (!memory.isConnected || gallery.dataset.galleryMode !== "collage") return;
      memory.append(nextImage);
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
        memory.classList.add("is-changing");
        nextImage.classList.add("is-active");
        window.setTimeout(() => {
          if (!memory.isConnected || gallery.dataset.galleryMode !== "collage") return;
          image.remove();
          nextImage.classList.remove("slaying-memory-next", "is-active");
          memory.classList.remove("is-changing");
        }, 900);
      }));
    }).catch(() => {
      memory.dataset.imageIndex = previousImageIndex;
    });
  };

  const stopCollageRotation = () => {
    window.clearInterval(collageRotationTimer);
    collageRotationTimer = 0;
  };

  const updateCollageRotation = () => {
    const shouldRotate = desktopGallery.matches && collageInView && !reducedMotion.matches && !document.hidden && gallery.dataset.galleryMode === "collage";
    if (!shouldRotate) {
      stopCollageRotation();
      return;
    }
    if (!collageRotationTimer) collageRotationTimer = window.setInterval(rotateCollage, 3000);
  };

  const buildCollage = staticMode => {
    const fragment = document.createDocumentFragment();
    const collageItems = staticMode ? staticCollageImages : visibleCollageImages;

    collageItems.forEach((item, position) => {
      const memory = document.createElement("figure");
      const image = document.createElement("img");
      const dimensions = collageDimensions(item.role);

      memory.className = `slaying-memory is-collage is-${item.role}`;
      memory.dataset.collageSlot = String(position + 1);
      memory.dataset.collageRole = item.role;
      memory.dataset.collageRotates = String(position < 3);
      memory.dataset.imageIndex = String(item.index);
      memory.style.setProperty("--collage-delay", `${80 + position * 55}ms`);
      memory.style.setProperty("--ring-drift-delay", `${-position * 9}s`);

      image.src = collageSource(item.index);
      image.alt = item.alt;
      image.width = dimensions.width;
      image.height = dimensions.height;
      image.loading = "eager";
      image.decoding = "async";
      image.style.objectPosition = item.focus;
      memory.append(image);
      fragment.append(memory);
    });

    gallery.append(fragment);
  };

  const buildFloatingField = () => {
    const fragment = document.createDocumentFragment();

    allImageIndices.forEach((imageIndex, position) => {
      const memory = document.createElement("figure");
      const image = document.createElement("img");
      const seed = position;
      const column = seed % 10;
      const row = Math.floor(seed / 10);
      const direction = column < 5 ? -1 : 1;
      const memoryX = 9 + column * 9.1;
      let memoryY = 10 + row * 12.5 + (column % 2) * 2.5;

      // Preserve a compact window around Saturn without pushing memories to the edges.
      if (memoryX > 36 && memoryX < 64 && memoryY > 32 && memoryY < 70) {
        memoryY = row % 2 === 0 ? 25 + (seed % 4) : 76 - (seed % 4);
      }

      memory.className = `slaying-memory ${roundImages.has(imageIndex) ? "is-round" : "is-square"}`;
      memory.style.setProperty("--memory-x", `${memoryX}%`);
      memory.style.setProperty("--memory-y", `${memoryY}%`);
      memory.style.setProperty("--memory-size", `${72 + (seed * 17) % 48}px`);
      memory.style.setProperty("--memory-drift-x", `${direction * (18 + (seed * 19) % 34)}px`);
      memory.style.setProperty("--memory-drift-y", `${-16 - (seed * 13) % 28}px`);
      memory.style.setProperty("--memory-delay", `${-((seed * 13) % 43)}s`);
      memory.style.setProperty("--memory-duration", `${38 + (seed * 7) % 11}s`);
      memory.style.setProperty("--memory-tilt", `${-7 + (seed * 5) % 15}deg`);

      image.src = `assets/images/customer-gallery/experience-${String(imageIndex).padStart(2, "0")}.jpg`;
      image.alt = `Saturn Cheetah customer experience ${position + 1}`;
      image.width = 520;
      image.height = 520;
      image.loading = "lazy";
      image.decoding = "async";
      memory.append(image);
      fragment.append(memory);
    });

    gallery.append(fragment);
  };

  const buildGallery = () => {
    const mode = desktopGallery.matches ? (reducedMotion.matches ? "collage-static" : "collage") : "floating";
    if (gallery.dataset.galleryMode === mode) return;

    stopCollageRotation();
    gallery.replaceChildren();
    gallery.dataset.galleryReady = "true";
    gallery.dataset.galleryMode = mode;
    collageRotationGroup = 0;
    if (desktopGallery.matches) buildCollage(mode === "collage-static");
    else buildFloatingField();
    updateCollageRotation();
  };

  desktopGallery.addEventListener("change", () => {
    if (gallery.dataset.galleryReady === "true") buildGallery();
  });
  reducedMotion.addEventListener("change", () => {
    if (gallery.dataset.galleryReady === "true") buildGallery();
    else updateCollageRotation();
  });
  document.addEventListener("visibilitychange", updateCollageRotation);

  if ("IntersectionObserver" in window && slayingSection) {
    const rotationObserver = new IntersectionObserver(entries => {
      collageInView = entries.some(entry => entry.isIntersecting);
      updateCollageRotation();
    }, { threshold: 0.12 });
    rotationObserver.observe(slayingSection);
  } else {
    collageInView = true;
  }

  if (!("IntersectionObserver" in window)) {
    buildGallery();
    return;
  }

  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    buildGallery();
    observer.disconnect();
  }, { rootMargin: "600px 0px", threshold: 0.01 });

  observer.observe(gallery);
}

setupExperienceOrder();
setupNavigation();
setupActiveNavigation();
setupHeroEntrance();
setupTabs();
setupStorySwipe();
enforceMutedProcessVideo();
setupTeeSelector();
setupWhatsAppFlow();
setupPortraitOrder();
setupWhatsAppWidget();
setupBulkTeeFlow();
setupAfterDarkConfigurator();
setupAfterDarkGallery();
setupReviewCarousel();
setupDesignGallery();
setupDeferredMedia();
setupFloatingPill();
setupGalleryModal();
setupSectionReveals();
setupStoreJourney();
setupAfterDarkPowerSwitch();
setupFAQAssistant();
setupPlainTeeOffer();
setupFooterYear();
setupFloatingGallery();
setupBackgroundVideos();
respectReducedMotion();
