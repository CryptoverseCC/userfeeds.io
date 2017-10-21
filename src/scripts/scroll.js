import ScrollReveal from 'scrollreveal';

export default function initScrollReveal() {
  window.sr = ScrollReveal({ duration: 700, viewFactor: 0.4 });

  if (sr.isSupported()){
    document.documentElement.classList.add('sr');

    sr.reveal('.anim-fade', { distance: '0px', scale: 1, duration: 10000 });
    sr.reveal('.anim-fadeBottom', {origin: "bottom", scale:1, distance:'10px', easing: 'ease-in', duration:300});
    sr.reveal('.anim-fadeRight', { origin: "right" });
    sr.reveal('.anim-fadeLeft', { origin: "left" , scale: 1, distance:'20px', easing: 'cubic-bezier(0.6, 0.3, 0.1, 1)' });
    sr.reveal('.anim-fadeTop', { origin: "top" });
    sr.reveal('.anim-backToFront', { scale: 0.5 });
    sr.reveal('.anim-frontToBack', { scale: 1.2 });
  } else {
    document.documentElement.classList.remove('sr');
  }
}
