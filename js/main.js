$(() => {
  const $mobileNavigationToggler = $('#mobileNavigationToggler');
  const $navigation = $('[data-navigation]');

  $mobileNavigationToggler.on('click', function (e) {
    e.preventDefault();

    $navigation.toggleClass('main-navigation--open')
    $mobileNavigationToggler.toggleClass('header__mobile-toggler--open');
  });

  const className = '.main-navigation__sub-navigation';
  const toggleClassName = `${className}--open`;
  const targetAttribute = 'data-navigation-target';
  const targetSelector = `[${targetAttribute}]`;

  let previous$subNavigation = null;

  const toggleNavigation = ($subNavigation, forceShow = false) => {
    if (!forceShow && $subNavigation.is(previous$subNavigation)) {
      $subNavigation.removeClass(toggleClassName.substring(1));
      previous$subNavigation = null;
    } else {

      if (previous$subNavigation) {
        previous$subNavigation.removeClass(toggleClassName.substring(1));
      }

      $subNavigation.addClass(toggleClassName.substring(1));

      previous$subNavigation = $subNavigation;
    }
  }

  $navigation
    .on('mouseenter', '> .main-navigation__link-wrapper', (e) => {
      const $target = $(e.target);
      const target = $target.attr(targetAttribute) || $target.parents(targetSelector).attr(targetAttribute);

      if (target) {
        const $subNavigation = $(className, target);

        toggleNavigation($subNavigation, true);
      }
    })
    .on('touchstart', '.main-navigation__link-toggler', (e) => {
      const $target = $(e.target);
      const target = $target.attr(targetAttribute) || $target.parents(targetSelector).attr(targetAttribute);


      if (target) {
        const $subNavigation = $(className, target);

        toggleNavigation($subNavigation);
      }
    })
    .on('mouseleave', '> .main-navigation__link-wrapper', (e) => {
      const $target = $(e.target);
      const target = $target.attr(targetAttribute) || $target.parents(targetSelector).attr(targetAttribute);
      if (target) {
        const $subNavigation = $(className, target);
        toggleNavigation($subNavigation);
      }
    })
    .on('focusout', (e) => {
      if (previous$subNavigation) {
        previous$subNavigation.removeClass(toggleClassName.substring(1));
      }
    })
    .on('focus', '.main-navigation__link', (e) => {
      e.preventDefault();
      const $target = $(e.target);
      const target = $target.attr(targetAttribute);

      if (!target) {
        if (previous$subNavigation) {
          previous$subNavigation.removeClass(toggleClassName.substring(1));
        }
        return;
      }

      const $subNavigation = $(className, target);

      toggleNavigation($subNavigation);
    })
    .on('focus', '.main-navigation__sub-navigation', (e) => {
      const $container = $(e.target).parents('.main-navigation__sub-navigation-container');
      const id$container = $container.attr('id');

      const $trigger = $(`[${targetAttribute}='#${id$container}']`);

      if ($trigger.length > 0) {
        toggleNavigation($container.find('.main-navigation__sub-navigation'), true);
      }
    });


  //*******************
  $.fn.carousel.Constructor.TRANSITION_DURATION = 1500;
  $('#hero-slider').carousel();

  //*******************
  const $addressDetailsContainer = $('.addresses__details-container');
  const $addressLinksContainer = $('.addresses__link-container');

  $('.addresses__link-container').on('click', '.addresses__link', function (e) {
    e.preventDefault();

    const $target = $(e.target);

    const $details = $addressDetailsContainer.find($(e.target).attr('href'));

    $addressLinksContainer.find('.addresses__link--active').removeClass('addresses__link--active')
    $target.addClass('addresses__link--active')

    $addressDetailsContainer.find('.addresses__details--active').removeClass('addresses__details--active');
    $details.addClass('addresses__details--active')
  });

  //*******************
  $('select').niceSelect();

  //*******************
  var substringMatcher = function (strs) {
    return function findMatches(q, cb) {
      var matches, substrRegex;

      // an array that will be populated with substring matches
      matches = [];

      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, 'i');

      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(strs, function (i, str) {
        if (substrRegex.test(str)) {
          matches.push(str);
        }
      });

      cb(matches);
    };
  };

  var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
    'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
    'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  $('input.typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
  }, { name: 'states', source: substringMatcher(states) });

  //********************
  $('.navigation-contact__languages-link').on('click', (e) => {
    e.stopPropagation();
  });

  $('[href="#change-language"], .navigation-contact__languages li a:first').on('click', (e) => {
    e.preventDefault();

    $('.navigation-contact__languages').toggleClass('navigation-contact__languages--active');

    setTimeout(() => {
      $(window).one('click', () => {
        $('.navigation-contact__languages').toggleClass('navigation-contact__languages--active');
      })
    }, 50);
  });


  /***************** */
  try {
    if (!!google) {
      google.maps.event.addDomListener(window, 'load', () => {
        const position = new google.maps.LatLng(55.6846946, 12.5905152);
        const map = new google.maps.Map(document.getElementById('map-canvas'), {
          zoom: 16,
          center: position,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: [{'featureType':'administrative','elementType':'labels.text.fill','stylers':[{'color':'#444444'}]},{'featureType':'landscape','elementType':'all','stylers':[{'color':'#f2f2f2'}]},{'featureType':'poi','elementType':'all','stylers':[{'visibility':'off'}]},{'featureType':'road','elementType':'all','stylers':[{'saturation':-100},{'lightness':45}]},{'featureType':'road.highway','elementType':'all','stylers':[{'visibility':'simplified'}]},{'featureType':'road.highway','elementType':'geometry.fill','stylers':[{'color':'#ffffff'}]},{'featureType':'road.arterial','elementType':'labels.icon','stylers':[{'visibility':'off'}]},{'featureType':'transit','elementType':'all','stylers':[{'visibility':'off'}]},{'featureType':'water','elementType':'all','stylers':[{'color':'#dde6e8'},{'visibility':'on'}]}]
        });

        //=====Initialise Default Marker
        const marker = new google.maps.Marker({
          position,
          map,
          icon: 'images/marker.png',
        });
      });
    }
  } catch (err) { }
});
