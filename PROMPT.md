# 09. Flashcard Learning App — Recall Orbit

**स्थिति:** केवल prompt; app अभी build नहीं हुई है।

**Source:** आपकी screenshots की original list  
**Future app folder:** `mini-projects/09-flashcard-learning-app/`  
**Visual palette:** Deep violet #100C23, purple #A78BFA, blue #38BDF8 और pink #F472B6

## Build prompt — उद्देश्य

Flashcards create करने, organise करने और revision करने का complete study app बनाओ। Unique working mini app बनाओ, polished screenshot-only mockup नहीं। पहले [shared Build Standards](../BUILD-STANDARDS.md) पढ़ो और लागू करो। Implementation शुरू करने की अनुमति मिलने पर इस specification से build करना; अभी यह planning document है।

## Layout और UX

Deck sidebar, selected deck summary, large flip card और study controls; mobile पर deck selector drawer और full-width card।

## ज़रूरी working features

- Deck create/rename/delete; cards में question, answer, optional hint और tags; edit, duplicate और search/filter implement करो।
- Study mode में flip, next/previous, shuffle, progress और Again / Hard / Good / Easy rating; keyboard shortcuts readable legend के साथ।
- Simple documented spaced-repetition intervals और due-today count; restart session में cards lose न हों।
- Quiz-like self-review summary में attempts, reviewed count और rating distribution; correctness user self-rating पर आधारित स्पष्ट हो।
- JSON import/export with schema checks, localStorage persistence और a small optional starter deck; study content text की तरह render हो।

## Logic और data behavior

Separate deck/card/review entities, stable IDs और review timestamps; rating से nextReviewAt deterministic तरीके से निकले और easy cards repeatedly ना आएँ।

## Animation और visual personality

3D flip restrained perspective में, next-card slide और progress ring; reduced-motion में instant reveal। Default dark theme, readable typography और restrained pink/purple/blue/red accent system रखो; बाकी projects से अलग central layout हो।

## Empty, loading और error states

Empty deck, all cards reviewed, no due cards, import failure और delete confirmation states।

## Completion checks

Create/edit card, flip via keyboard, persist ratings, due-day boundaries, shuffle no duplicates और backup restore verify करो। Shared checklist के responsive, keyboard, reduced-motion, data-safety और actual upload-size checks भी pass हों।

## बाद की delivery

इस numbered folder को independent runnable app में बदलना। Root `index.html`, local styles/scripts/assets, concise README और honest setup/browser-limit notes शामिल करना। Working preview verify होने के बाद ही Mini Projects में upload/scheduling का अगला चरण होगा; अभी न build, न upload, न deployment।
