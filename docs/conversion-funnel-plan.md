# Conversion Funnel Plan

## Primary objective

Move a mobile visitor from idea to a qualified WhatsApp conversation with the
least necessary friction. The website does not take payment. The personal path
starts from one piece; the bulk path offers a wider configurable range.

## Intent architecture

```text
Landing
  ├─ Personal / small quantity
  │    ├─ 180 GSM unisex regular fit
  │    └─ 240 GSM unisex oversized
  └─ Bulk / business / event
       └─ Wider range confirmed on WhatsApp

Choice → quantity → design status → WhatsApp message
       → attach design/reference in WhatsApp
       → confirm feasibility, price, timeline and payment directly
```

## Mobile journey

1. **Orient within five seconds**
   - Headline: custom T-shirts from one piece.
   - Supporting choice: 180 GSM regular or 240 GSM oversized.
   - Primary CTA: “Start my 1-piece custom tee.”
   - Secondary link: “I need a bulk quote.”

2. **Choose intent**
   - Personal is selected by default only after the user taps it.
   - Bulk opens a distinct, shorter request focused on quantity and use case.

3. **Choose product**
   - Regular: everyday 180 GSM cotton, unisex regular fit.
   - Oversized: heavyweight 240 GSM, unisex oversized fit.
   - Bulk: wider range; do not imply unconfirmed SKUs.

4. **Build the minimum useful enquiry**
   - Required: intent, product, quantity, design status.
   - Optional expansion: size, colour, placement, required date, city, notes.
   - Never require account creation or online payment.

5. **Open WhatsApp**
   - Send a readable, prefilled message to `+91 77804 78506`.
   - Tell the user before opening WhatsApp that they can attach artwork there.
   - Preserve their choices if they return to the page.

6. **Set expectations**
   - Feasibility, price, timeline, delivery, and payment are confirmed
     directly.
   - Avoid promises not backed by current business facts.

## Personal and bulk message templates

### Personal

```text
Hello Saturn Cheetah, I want to customise a T-shirt.
Product: [180 GSM regular / 240 GSM oversized]
Quantity: [n]
Design: [ready / reference / need help]
Optional details: [size, colour, placement, date, city]
I will attach my design/reference here. Please confirm feasibility, price and timeline.
```

### Bulk

```text
Hello Saturn Cheetah, I need a bulk quote.
Purpose: [business / team / event / other]
Quantity: [n]
Product or fit: [known / need guidance]
Branding: [print / embroidery / labels / not sure]
Required date and city: [details]
Please confirm suitable options, feasibility, price and timeline.
```

## Trust ladder

Use proof in this order:

1. One-piece availability and exact product specifications.
2. Four-step process.
3. Real printing video with explicit play.
4. Finished work with privacy-safe crops.
5. Current Instagram channel.
6. Genuine reviews only when supplied and permissioned.
7. Clear no-payment-gateway and confirmation process.

Do not use invented ratings, sales counts, testimonials, stock scarcity,
delivery promises, or “limited time” language.

## Hesitation reducers

| Concern | Ethical response |
| --- | --- |
| “Can I order only one?” | Yes, personal customization starts from one piece on the stated options. |
| “I do not have finished artwork.” | A reference or idea can start the WhatsApp discussion. |
| “Which tee should I choose?” | Explain regular 180 GSM versus oversized 240 GSM in one short comparison. |
| “Will my design work?” | Feasibility and placement are confirmed before proceeding. |
| “What will it cost?” | Final price is confirmed on WhatsApp; do not invent a price range. |
| “When will it arrive?” | Ask for required date and city; confirm timeline directly. |
| “How do I pay?” | No website gateway; payment method and terms are agreed directly. |
| “Can you do bulk?” | Yes; a wider configurable range is available for bulk requirements. |

## CTA system

| Context | CTA |
| --- | --- |
| Hero personal | Start my 1-piece custom tee |
| Hero bulk | Get a bulk quote |
| Regular product | Choose 180 GSM regular |
| Oversized product | Choose 240 GSM oversized |
| Inspiration tile | Send a design like this |
| Process proof | WhatsApp my idea |
| Persistent mobile bar | WhatsApp your idea |
| Final form | Continue on WhatsApp |

Every CTA should either set intent/product state or open WhatsApp with useful
context. Avoid multiple labels that perform the same action without explaining
the difference.

## Measurement plan

Without adding analytics in Phase 1, validate:

- CTA visibility at each requested viewport.
- Tap count from landing to populated WhatsApp message.
- Form completion with keyboard only.
- Message accuracy for personal, oversized, regular, and bulk paths.
- Back/return behavior without lost choices.

If analytics are later approved with a privacy notice, measure only:

- personal versus bulk intent selection;
- product choice;
- WhatsApp CTA initiation;
- optional-field expansion;
- errors preventing message generation.

Do not capture names, free-text notes, artwork, phone numbers, or WhatsApp
message content in analytics.

