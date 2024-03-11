document.querySelectorAll("section").forEach((e) => {
  if (e.id != "home") {
    gsap.from(e, {
      scrollTrigger: {
        trigger: e,
        start: "top bottom",
      },
      opacity: 0,
      y: 100,
      duration: 1,
    });
  }
});

gsap.from("header", {
  opacity: 0,
  delay: 1,
  y: -100,
  duration: 1,
});

gsap.from(".title", {
  opacity: 0,
  duration: 1.5,
  ease: "power3.in",
});

gsap.from(".scroll", {
  opacity: 0,
  delay: 1.5,
  y: 100,
  duration: 1,
});
