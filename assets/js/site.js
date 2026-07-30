/* Saturn Cheetah — dependency-free boutique interactions. */

const WHATSAPP_PHONE = "917780478506";
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const mobileNavigation = window.matchMedia("(max-width: 900px)");
const mobilePillViewport = window.matchMedia("(max-width: 767px)");

document.documentElement.classList.add("js-enabled");

const header = document.querySelector(".site-header");
const hero = document.querySelector(".hero");
const navToggle = document.querySelector(".nav-toggle");
const primaryNav = document.querySelector(".primary-nav");
const floatingWhatsapp = document.querySelector("#floating-whatsapp");
const productSelect = document.querySelector("#custom-product");
const customiseForm = document.querySelector("#customise");
const finalSelection = document.querySelector("#final-selection");

const productData = {
  "180": {
    value: "180 GSM Unisex Regular Fit",
    shortLabel: "180 GSM Regular Fit",
    spec: "180 GSM · Unisex · Cotton",
    name: "Regular Fit T-shirt",
    summary: "A familiar everyday silhouette with an easy, regular fit.",
    fit: "Regular and easy to wear",
    use: "Everyday wear, gifting and event tees",
    image: "assets/images/products/tshirt-180-regular-black-640.webp",
    srcset: "assets/images/products/tshirt-180-regular-black-640.webp 640w, assets/images/products/tshirt-180-regular-black-994.webp 994w",
    sizes: "(max-width: 767px) calc(100vw - 64px), (max-width: 900px) 460px, (max-width: 1200px) 42vw, 560px",
    alt: "Black 180 GSM unisex regular-fit T-shirt shown from front and back",
    width: "994",
    height: "1583"
  },
  "240": {
    value: "240 GSM Unisex Oversized",
    shortLabel: "240 GSM Oversized",
    spec: "240 GSM · Unisex · Heavyweight",
    name: "Oversized T-shirt",
    summary: "A heavier, relaxed silhouette with an oversized streetwear fit.",
    fit: "Relaxed and oversized",
    use: "Bold front, back and streetwear-style prints",
    image: "assets/images/products/tshirt-240-oversized-beige-640.webp",
    srcset: "assets/images/products/tshirt-240-oversized-beige-640.webp 640w, assets/images/products/tshirt-240-oversized-beige-994.webp 993w",
    sizes: "(max-width: 767px) calc(100vw - 64px), (max-width: 900px) 460px, (max-width: 1200px) 42vw, 560px",
    alt: "Beige 240 GSM unisex oversized T-shirt shown from front and back",
    width: "993",
    height: "1583"
  }
};

let selectedProductKey = "180";
let pillReady = false;
let pillDelayTimer;
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
  if (!floatingWhatsapp) return;

  const shouldShow = pillReady
    && mobilePillViewport.matches
    && visibleWhatsappZones.size === 0
    && !primaryNav?.classList.contains("is-open")
    && !document.body.classList.contains("modal-open");

  floatingWhatsapp.classList.toggle("is-visible", shouldShow);
  floatingWhatsapp.setAttribute("aria-hidden", String(!shouldShow));
  floatingWhatsapp.tabIndex = shouldShow ? 0 : -1;
}

function setNavigationOpen(isOpen, returnFocus = false) {
  if (!navToggle || !primaryNav) return;

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

function updateTeeProduct(productKey, announce = true) {
  const product = productData[productKey];
  const teeImage = document.querySelector("#tee-image");
  const teeVisual = document.querySelector(".tee-visual");

  if (!product || !teeImage) return;
  selectedProductKey = productKey;

  teeVisual?.classList.add("is-changing");

  const applyProduct = () => {
    if (selectedProductKey !== productKey) return;

    teeImage.src = product.image;
    teeImage.srcset = product.srcset;
    teeImage.sizes = product.sizes;
    teeImage.alt = product.alt;
    teeImage.width = Number(product.width);
    teeImage.height = Number(product.height);
    document.querySelector("#tee-spec").textContent = product.spec;
    document.querySelector("#tee-name").textContent = product.name;
    document.querySelector("#tee-summary").textContent = product.summary;
    document.querySelector("#tee-fit").textContent = product.fit;
    document.querySelector("#tee-use").textContent = product.use;

    if (productSelect) productSelect.value = product.value;
    if (finalSelection) finalSelection.textContent = `Currently showing: ${product.shortLabel}.`;
    if (announce) document.querySelector("#tee-status").textContent = `${product.shortLabel} selected.`;

    updateWhatsAppLinks();
    window.requestAnimationFrame(() => teeVisual?.classList.remove("is-changing"));
  };

  const preloadedImage = new Image();
  preloadedImage.srcset = product.srcset;
  preloadedImage.sizes = product.sizes;
  preloadedImage.src = product.image;

  if (preloadedImage.complete) {
    applyProduct();
  } else {
    preloadedImage.addEventListener("load", applyProduct, { once: true });
    preloadedImage.addEventListener("error", applyProduct, { once: true });
  }
}

function setupTeeSelector() {
  document.querySelectorAll("input[name='tee-option']").forEach(input => {
    input.addEventListener("change", () => {
      if (input.checked) updateTeeProduct(input.value);
    });
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
    ["Preferred colour", value("colour")],
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
  const quantity = String(formData.get("quantity") || "").trim();
  const designStatus = String(formData.get("designStatus") || "").trim();
  const opening = product === productData["180"].value
    ? "I’d like to customise an 180 GSM regular-fit T-shirt."
    : product === productData["240"].value
      ? "I’d like to customise a 240 GSM oversized T-shirt."
      : "I’d like to discuss a bulk custom-product order.";
  const designNextStep = designStatus === "I need design assistance"
    ? "I’d like help shaping the design direction."
    : "I will attach my design or reference in WhatsApp.";

  return [
    "Hello Saturn Cheetah Store,",
    "",
    opening,
    "",
    `Product: ${product}`,
    `Quantity: ${quantity}`,
    `Design status: ${designStatus}`,
    ...getOptionalFormLines(formData),
    "",
    designNextStep,
    "Please confirm feasibility, final price and timeline."
  ].join("\n");
}

function buildProductMessage(context) {
  const product = getCurrentProductValue();
  const productLabel = getProductLabel(product);
  const opening = context === "print"
    ? `I’d like to print my idea on a ${productLabel}.`
    : `I’d like to continue with a ${productLabel} enquiry.`;

  return [
    "Hello Saturn Cheetah Store,",
    "",
    opening,
    "",
    `Product: ${product}`,
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

function buildDesignMessage(designTitle) {
  return [
    "Hello Saturn Cheetah Store,",
    "",
    `I’m interested in the ${designTitle} design.`,
    "Please help me customise it on a T-shirt."
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
    `Printing / bulk embroidery: ${value("decoration")}`,
    `Branding position: ${value("position")}`,
    `Required date: ${value("requiredDate")}`,
    `Delivery city: ${value("city")}`,
    "",
    "I understand embroidery is available for bulk orders only.",
    "Please help me confirm suitable fabric, GSM, colours, final price and timeline."
  ].join("\n");
}

function updateWhatsAppLinks() {
  document.querySelectorAll("[data-whatsapp-action='print']").forEach(link => {
    link.href = whatsappUrl(buildProductMessage("print"));
  });

  document.querySelectorAll("[data-whatsapp-action='final'], [data-whatsapp-action='pill']").forEach(link => {
    link.href = whatsappUrl(buildProductMessage("final"));
  });

  document.querySelectorAll("[data-bulk-product]").forEach(link => {
    link.href = whatsappUrl(buildBulkMessage(link.dataset.bulkProduct));
  });

  document.querySelectorAll("[data-design-title]").forEach(link => {
    link.href = whatsappUrl(buildDesignMessage(link.dataset.designTitle));
  });
}

function setupWhatsAppFlow() {
  const requiredDate = document.querySelector("#custom-date");
  if (requiredDate) requiredDate.min = getLocalDateString();

  customiseForm?.addEventListener("submit", event => {
    event.preventDefault();
    if (!customiseForm.reportValidity()) return;
    window.location.assign(whatsappUrl(buildCustomMessage()));
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
    window.location.assign(whatsappUrl(buildBulkTeeMessage(panel)));
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
  const cards = [...document.querySelectorAll(".design-card")];
  const position = document.querySelector("#design-gallery-position");
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

  window.addEventListener("resize", updateState);
  updateState();
}

function setupFloatingPill() {
  if (!floatingWhatsapp || !hero || !("IntersectionObserver" in window)) return;

  const heroObserver = new IntersectionObserver(entries => {
    const entry = entries[0];
    const passedHero = !entry.isIntersecting && entry.boundingClientRect.bottom < 0;

    window.clearTimeout(pillDelayTimer);
    pillReady = false;
    refreshFloatingPill();

    if (passedHero) {
      pillDelayTimer = window.setTimeout(() => {
        pillReady = true;
        refreshFloatingPill();
      }, 700);
    }
  }, { threshold: 0 });

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

  heroObserver.observe(hero);
  document.querySelectorAll("[data-whatsapp-zone]").forEach(zone => zoneObserver.observe(zone));

  mobilePillViewport.addEventListener("change", refreshFloatingPill);
}

function setupGalleryModal() {
  const modal = document.querySelector("#design-modal");
  const modalImage = document.querySelector("#modal-image");
  const modalCaption = document.querySelector("#modal-caption");
  const modalCount = document.querySelector("#modal-count");
  const galleryItems = [...document.querySelectorAll("[data-gallery-index]")];
  let activeIndex = 0;
  let previousFocus;

  if (!modal || !modalImage || galleryItems.length === 0) return;

  function renderModal(index) {
    activeIndex = (index + galleryItems.length) % galleryItems.length;
    const sourceImage = galleryItems[activeIndex].querySelector("img");
    const caption = galleryItems[activeIndex].querySelector("h3")?.textContent || "Design preview";

    modalImage.src = sourceImage.src;
    modalImage.alt = sourceImage.alt;
    modalImage.width = Number(sourceImage.getAttribute("width"));
    modalImage.height = Number(sourceImage.getAttribute("height"));
    modalCaption.textContent = caption;
    modalCount.textContent = `${activeIndex + 1} of ${galleryItems.length}`;
  }

  function openModal(index, trigger) {
    previousFocus = trigger;
    renderModal(index);
    document.body.classList.add("modal-open");

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
      document.body.classList.remove("modal-open");
      previousFocus?.focus();
      refreshFloatingPill();
    }
  }

  galleryItems.forEach((item, index) => {
    const preview = item.querySelector("[data-gallery-open]");
    preview?.addEventListener("click", () => openModal(index, preview));
  });

  modal.querySelector(".modal-close")?.addEventListener("click", closeModal);
  modal.querySelector("[data-gallery-previous]")?.addEventListener("click", () => renderModal(activeIndex - 1));
  modal.querySelector("[data-gallery-next]")?.addEventListener("click", () => renderModal(activeIndex + 1));

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
    previousFocus?.focus();
    refreshFloatingPill();
  });
}

function setupSectionReveals() {
  const revealItems = document.querySelectorAll(
    ".section-heading, .tee-selector, .tab-module, .secondary-scroller, .faq-list, .final-cta-inner"
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

function setupFooterYear() {
  const year = document.querySelector("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());
}

function respectReducedMotion() {
  if (!reducedMotion.matches) return;
  document.querySelectorAll("video").forEach(video => video.pause());
}

setupNavigation();
setupActiveNavigation();
setupHeroEntrance();
setupTabs();
setupStorySwipe();
setupTeeSelector();
setupWhatsAppFlow();
setupBulkTeeFlow();
setupReviewCarousel();
setupDesignGallery();
setupFloatingPill();
setupGalleryModal();
setupSectionReveals();
setupFooterYear();
respectReducedMotion();
