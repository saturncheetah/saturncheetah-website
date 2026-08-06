const form=document.querySelector("[data-journey]");
if(form){
  const steps=[...form.querySelectorAll("[data-step]")];
  const back=form.querySelector("[data-back]");
  const next=form.querySelector("[data-next]");
  const counter=form.querySelector("[data-counter]");
  const summary=form.querySelector("[data-summary]");
  const colourChoices=form.querySelector("[data-colour-choices]");
  const colourSets={
    "180":[["black","Black"],["blue","Blue"],["gray","Grey"],["green","Green"],["navy-blue","Navy blue"],["off-white","Off-white"],["orange","Orange"],["pink","Pink"],["red","Red"],["white","White"],["yellow","Yellow"]],
    "240":[["black","Black"],["off-white","Off-white"],["white","White"]]
  };
  let active=0;
  const show=index=>{active=Math.max(0,Math.min(steps.length-1,index));steps.forEach((step,i)=>step.hidden=i!==active);back.hidden=active===0;next.textContent=active===steps.length-1?"Continue on WhatsApp":"Continue";counter.textContent=`Step ${active+1} of ${steps.length}`;summary.hidden=active!==steps.length-1;if(!summary.hidden)updateSummary()};
  const updateSummary=()=>{const data=new FormData(form);const parts=[];for(const [key,value] of data.entries())parts.push(`${key}: ${value}`);summary.textContent=parts.join(" · ")};
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
  next.addEventListener("click",()=>{if(active<steps.length-1){show(active+1);return}if(!form.reportValidity())return;const data=new FormData(form);const lines=[form.dataset.message||"Saturn Cheetah enquiry",...Array.from(data.entries(),([key,value])=>`${key}: ${value}`)];window.open(`https://wa.me/917780478506?text=${encodeURIComponent(lines.join("\n"))}`,"_blank","noopener")});
  form.addEventListener("change",event=>{
    if(event.target.matches("[data-product-key]"))renderColours(event.target.dataset.productKey);
    updateSummary();
  });
  const selectedProduct=form.querySelector("[data-product-key]:checked");
  if(selectedProduct)renderColours(selectedProduct.dataset.productKey);
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
