const form=document.querySelector("[data-journey]");
if(form){
  const steps=[...form.querySelectorAll("[data-step]")];
  const back=form.querySelector("[data-back]");
  const next=form.querySelector("[data-next]");
  const counter=form.querySelector("[data-counter]");
  const summary=form.querySelector("[data-summary]");
  let active=0;
  const show=index=>{active=Math.max(0,Math.min(steps.length-1,index));steps.forEach((step,i)=>step.hidden=i!==active);back.hidden=active===0;next.textContent=active===steps.length-1?"Continue on WhatsApp":"Continue";counter.textContent=`Step ${active+1} of ${steps.length}`;summary.hidden=active!==steps.length-1;if(!summary.hidden)updateSummary()};
  const updateSummary=()=>{const data=new FormData(form);const parts=[];for(const [key,value] of data.entries())parts.push(`${key}: ${value}`);summary.textContent=parts.join(" · ")};
  back.addEventListener("click",()=>show(active-1));
  next.addEventListener("click",()=>{if(active<steps.length-1){show(active+1);return}if(!form.reportValidity())return;const data=new FormData(form);const lines=[form.dataset.message||"Saturn Cheetah enquiry",...Array.from(data.entries(),([key,value])=>`${key}: ${value}`)];window.open(`https://wa.me/917780478506?text=${encodeURIComponent(lines.join("\n"))}`,"_blank","noopener")});
  form.addEventListener("change",updateSummary);show(0);
}
