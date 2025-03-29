export function shareApp() {
  if (navigator.share) {
    navigator.share({
      title: "Ludon",
      text: "Play Ludo on your phone without downloading any app! Enjoy Pass & Play with friends or challenge the computer for a fun Ludo experience.",
      url: window.location.origin,
    });
  } else {
    alert("Share button not supported on your browser. Please copy the link and share it manually.");
  }
}
