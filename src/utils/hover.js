export default function attachHoverListener() {
  console.log("attachHoverListener called");
  const cardsEl = document.getElementById("cards");
  let animationFrameId;

  if (cardsEl) {
    cardsEl.onmousemove = (e) => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        for (const card of document.getElementsByClassName("card")) {
          const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

          card.style.setProperty("--mouse-x", `${x}px`);
          card.style.setProperty("--mouse-y", `${y}px`);
        }
      });
    };
  }
}
