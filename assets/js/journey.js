const form=document.querySelector("[data-journey]");
if(form){
  const isAfterDark=(form.dataset.message||"").includes("After Dark");
  if(isAfterDark){
    const sizeField=[...form.querySelectorAll("fieldset")].find(fieldset=>fieldset.querySelector('input[name="Size"]'));
    const sizeNote=document.createElement("p");
    sizeNote.className="path-note";
    sizeNote.textContent="Everything is unisex. Choose one size smaller for a closer fit. XS is available.";
    sizeField?.querySelector("legend")?.after(sizeNote);
  }
  const steps=[...form.querySelectorAll("[data-step]")];
  const back=form.querySelector("[data-back]");
  const next=form.querySelector("[data-next]");
  const counter=form.querySelector("[data-counter]");
  const summary=form.querySelector("[data-summary]");
  const colourChoices=form.querySelector("[data-colour-choices]");
  const artworkStepTitle=form.querySelector("[data-artwork-step-title]");
  const helpPath=form.querySelector('[data-artwork-path="help"]');
  const storePath=form.querySelector('[data-artwork-path="store"]');
  const designInstructions=form.querySelector('textarea[name="Design instructions"]');
  const storeDesignInputs=[...form.querySelectorAll('input[name="Store design"]')];
  if(isAfterDark){
    const priceText="Estimated price: ₹899–₹1,499";
    const heroPrice=document.createElement("p");
    heroPrice.innerHTML=`<strong>${priceText}</strong><br><small>Final price depends on the selected style and details.</small>`;
    document.querySelector(".journey-copy")?.append(heroPrice);
    const builderPrice=document.createElement("p");
    builderPrice.innerHTML=`<strong>${priceText}</strong>`;
    form.querySelector(".builder-head")?.append(builderPrice);
  }
  const colourSets={
    "180":[["black","Black"],["blue","Blue"],["gray","Grey"],["green","Green"],["navy-blue","Navy blue"],["off-white","Off-white"],["orange","Orange"],["pink","Pink"],["red","Red"],["white","White"],["yellow","Yellow"]],
    "240":[["black","Black"],["off-white","Off-white"],["white","White"]]
  };
  const pricing={
    "180":{custom:"₹799–₹999",store:"₹799"},
    "240":{custom:"₹899–₹1,199",store:"₹999"}
  };
  const syncXsAvailability=()=>{
    const xsInput=form.querySelector('input[name="Size"][value="XS"]');
    const xsLabel=xsInput?.closest("label");
    if(!xsInput||!xsLabel)return;
    xsLabel.hidden=false;
    xsInput.disabled=false;
  };
  let active=0;
  const updateNextLabel=()=>{next.textContent=active===steps.length-1?"Continue on WhatsApp":"Continue"};
  const show=index=>{active=Math.max(0,Math.min(steps.length-1,index));steps.forEach((step,i)=>step.hidden=i!==active);back.hidden=active===0;updateNextLabel();counter.textContent=`Step ${active+1} of ${steps.length}`;summary.hidden=active!==steps.length-1;if(!summary.hidden)updateSummary()};
  const displayValue=value=>value instanceof File?(value.name||"No file selected"):value;
  const getPrice=()=>{if(form.dataset.priceMode!=="tee")return"";const productKey=form.querySelector("[data-product-key]:checked")?.dataset.productKey||"180";const useStore=form.querySelector('input[name="Design"]:checked')?.value==="Choose a store design";return pricing[productKey]?.[useStore?"store":"custom"]||"Quote required"};
  const updateSummary=()=>{const data=new FormData(form);const parts=[];for(const [key,value] of data.entries()){const shown=displayValue(value);if(shown&&shown!=="No file selected")parts.push(`${key}: ${shown}`)}const price=getPrice();if(price)parts.push(`Estimated T-shirt price: ${price}`);if(isAfterDark)parts.push("Estimated price: ₹899–₹1,499");summary.textContent=parts.join(" · ")};
  const updateDesignPath=()=>{
    const useStore=form.querySelector('input[name="Design"]:checked')?.value==="Choose a store design";
    if(helpPath)helpPath.hidden=useStore;
    if(storePath)storePath.hidden=!useStore;
    if(artworkStepTitle)artworkStepTitle.textContent=useStore?"Choose your store design":"Share your artwork or idea";
    if(designInstructions)designInstructions.disabled=useStore;
    storeDesignInputs.forEach((input,index)=>{input.disabled=!useStore;input.required=useStore&&index===0});
  };
  const renderColours=productKey=>{
    if(!colourChoices||!colourSets[productKey])return;
    colourChoices.replaceChildren(...colourSets[productKey].map(([slug,label],index)=>{
      const choice=document.createElement("label");
      choice.className="choice choice-visual";
      choice.innerHTML=`<input type="radio" name="Colour" value="${label}" ${index===0?"checked":""}><span><img src="assets/images/products/${productKey}/tshirt-${productKey}-${slug}-640.webp" alt="${label} ${productKey} GSM T-shirt reference"><b>${label}</b></span>`;
      return choice;
    }));
    updateSummary();
  };
  back.addEventListener("click",()=>show(active-1));
  next.addEventListener("click",()=>{if(active<steps.length-1){const invalid=steps[active].querySelector(":invalid");if(invalid){invalid.reportValidity();return}show(active+1);return}if(!form.reportValidity())return;const data=new FormData(form);const lines=[form.dataset.message||"Saturn Cheetah enquiry",...Array.from(data.entries(),([key,value])=>`${key}: ${displayValue(value)}`)];if(data.get("Design")==="Help me create it")lines.push("I will share a reference image here.");window.open(`https://wa.me/917780478506?text=${encodeURIComponent(lines.join("\n"))}`,"_blank","noopener")});
  form.addEventListener("change",event=>{
    if(event.target.matches("[data-product-key]"))renderColours(event.target.dataset.productKey);
    if(event.target.name==="Design")updateDesignPath();
    if(event.target.matches("[data-product-key]")||event.target.name==="Style")syncXsAvailability();
    updateNextLabel();
    updateSummary();
  });
  const selectedProduct=form.querySelector("[data-product-key]:checked");
  if(selectedProduct)renderColours(selectedProduct.dataset.productKey);
  updateDesignPath();
  syncXsAvailability();
  show(0);
}

const afterDarkForm=document.querySelector('form[data-message*="After Dark"]');
if(afterDarkForm){
  const modal=document.createElement("dialog");
  modal.className="journey-image-modal";
  modal.innerHTML='<button type="button" aria-label="Close image preview">×</button><img alt="">';
  document.body.append(modal);
  const modalImage=modal.querySelector("img");
  const close=()=>modal.close();
  modal.querySelector("button").addEventListener("click",close);
  modal.addEventListener("click",event=>{if(event.target===modal)close()});
  afterDarkForm.querySelectorAll(".choice-visual img").forEach(image=>{
    image.tabIndex=0;
    image.setAttribute("role","button");
    image.setAttribute("aria-label",`Enlarge ${image.alt}`);
    const open=event=>{
      event.preventDefault();
      event.stopPropagation();
      modalImage.src=image.src;
      modalImage.alt=image.alt;
      modal.showModal();
    };
    image.addEventListener("click",open);
    image.addEventListener("keydown",event=>{if(event.key==="Enter"||event.key===" ")open(event)});
  });
}
