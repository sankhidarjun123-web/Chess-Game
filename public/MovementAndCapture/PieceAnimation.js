function changePosition(piece, target) {
    const pieceRect = piece.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const dx =
        targetRect.left + targetRect.width / 2
      - (pieceRect.left + pieceRect.width / 2);

    const dy =
        targetRect.top + targetRect.height / 2
      - (pieceRect.top + pieceRect.height / 2);

    // Ensure correct positioning
    piece.style.transition = "transform 0.15s";

    // Force browser to apply initial position
    piece.getBoundingClientRect();

    // Animate
    piece.style.transform = `translate(${dx}px, ${dy}px)`;
}
export default changePosition;
