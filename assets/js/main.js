function esconderTudo() {
  $(".overlay").removeClass("ativo");
  $(".modal-box").removeClass("ativo");
  $(".linguas_wrap ul").removeClass("ativo");
  $("body").removeClass("overflow");
}

$("a.fechar, .overlay").click(function() {
  esconderTudo();
});

function modalTrigger(nomeId) {
  $("#" + nomeId).addClass("ativo");
  $(".overlay").addClass("ativo");
  $("body").addClass("overflow");
}
$("a.modal-trigger").click(function() {
  var nomeId = $(this).data("id");
  modalTrigger(nomeId);
});

$(window).scroll(function() {
  if ($(this).scrollTop() > 50) {
    $("header").addClass("header_fixo");
  } else {
    $("header").removeClass("header_fixo");
  }
});

jQuery(document).ready(function($) {
  $(".owl-depoimentos").owlCarousel({
    loop: true,
    margin: 50,
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      450: {
        items: 1
      },
      600: {
        items: 2
      },
      1400: {
        items: 2
      },
      1600: {
        items: 3
      }
    }
  });
  $(".owl-slide").owlCarousel({
    loop: true,
    margin: 50,
    nav: true,
    mouseDrag: false,
    animateOut: "fadeOut",
    animateIn: "fadeIn",
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1
      },
      450: {
        items: 1
      }
    }
  });
});

(window.sr = ScrollReveal()),
  sr.reveal(".foo", {
    duration: 900,
    origin: "bottom",
    reset: !0,
    viewFactor: 0.4
  });
