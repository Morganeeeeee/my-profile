// One reusable function controls each photo album.
function initializeAlbum(name) {
  const track = document.querySelector("#" + name + "-album");
  const previous = document.querySelector("#" + name + "-previous");
  const next = document.querySelector("#" + name + "-next");
  const counter = document.querySelector("#" + name + "-counter");

  if (!track || !previous || !next || !counter) {
    return;
  }

  function updateAlbum() {
    // The 16px gap matches the gap in gallery.css.
    const step = track.clientWidth + 16;
    const total = track.children.length;
    const current = Math.min(total - 1, Math.max(0, Math.round(track.scrollLeft / step)));
    const label = (current + 1) + " / " + total;

    if (counter.textContent !== label) {
      counter.textContent = label;
    }

    previous.disabled = current === 0;
    next.disabled = current === total - 1;
  }

  function moveAlbum(direction) {
    const step = track.clientWidth + 16;
    // Smooth movement is set in CSS, with a reduced-motion alternative.
    track.scrollBy({ left: direction * step });
  }

  previous.addEventListener("click", function() {
    moveAlbum(-1);
  });

  next.addEventListener("click", function() {
    moveAlbum(1);
  });

  track.addEventListener("keydown", function(event) {
    // Keep keyboard navigation on the album itself; picture links still open normally.
    if (event.target !== track) {
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveAlbum(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveAlbum(-1);
    } else if (event.key === "Home") {
      event.preventDefault();
      track.scrollTo({ left: 0 });
    } else if (event.key === "End") {
      event.preventDefault();
      track.scrollTo({ left: track.scrollWidth });
    }
  });

  track.addEventListener("scroll", updateAlbum);
  window.addEventListener("resize", updateAlbum);
  updateAlbum();
}

initializeAlbum("food");
initializeAlbum("companions");
initializeAlbum("projects");
