/**
 * Generates required data for animation
 */
const updatePos = (ogCard, exCard) => {
  const { top, left, width, height } = ogCard.getBoundingClientRect();

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // Data required to position the element
  exCard.style.setProperty("--top", `${top}px`);
  exCard.style.setProperty("--left", `${left}px`);

  // Data required to scale the element
  exCard.style.setProperty("--screen-width", `${screenWidth}`);
  exCard.style.setProperty("--screen-height", `${screenHeight}`);
  exCard.style.setProperty("--width", `${width}`);
  exCard.style.setProperty("--height", `${height}`);
};

/**
 * onExpand adds the required data to extendableCard.
 */
const onExpand = (ogCard, exCard) => {
  updatePos(ogCard, exCard);

  requestAnimationFrame(() => {
    exCard.setAttribute("data-state", "expanded");
    ogCard.setAttribute("data-state", "hidden");
  });
};

/**
 * onShrink shrinks down the card and hides it.
 */
const onShrink = (ogCard, exCard) => {
  updatePos(ogCard, exCard);

  exCard.setAttribute("data-state", "shrink");

  setTimeout(() => {
    exCard.setAttribute("data-state", "hidden");
    ogCard.setAttribute("data-state", "visible");
  }, 300 + 1);
};

document.addEventListener('DOMContentLoaded', () => {
  const cardPairs = [
    { ogCardId: "card-jewellery", exCardId: "expandableCard-jewellery", closeId: "close-jewellery" },
    { ogCardId: "card-brands", exCardId: "expandableCard-brands", closeId: "close-brands" },
    { ogCardId: "card-magazines", exCardId: "expandableCard-magazines", closeId: "close-magazines" }
  ];

  cardPairs.forEach(({ ogCardId, exCardId, closeId }) => {
    const ogCard = document.getElementById(ogCardId);
    const exCard = document.getElementById(exCardId);
    const close = document.getElementById(closeId);

    if (ogCard && exCard && close) {
      ogCard.addEventListener("click", () => onExpand(ogCard, exCard));
      close.addEventListener("click", () => onShrink(ogCard, exCard));
    }
  });
});
