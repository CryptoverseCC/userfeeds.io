
export default function initNavOnMobile() {
  let $button = document.querySelector('.js-mobileMenu');

  $button.addEventListener('click', function(e) {
      e.preventDefault();

      let target = $button.getAttribute('data-target');

      if (target != undefined && target != "") {
        $button.classList.toggle('is-active');
        document.getElementById(target).classList.toggle('is-active');
      }
  });
}