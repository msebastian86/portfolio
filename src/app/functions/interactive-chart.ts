import { TweenMax, Elastic } from 'gsap';
declare let $: any;

export function InteractiveChart(iconsData) {
  const data = iconsData;
  const chart = document.querySelector('#svg-chart');
  const icons = document.querySelectorAll('.svg-icon');
  const chartInside = document.querySelector('#zebatka');
  const activeColor = '#ecc200';
  const defaultColor = '#ffffff';

  const colorizeIcons = (current) => {
    icons.forEach(function (item) {
      $(item).find('path').css('fill', defaultColor);
      $(item).find('polygon').css('fill', defaultColor);
    });

    $(current).find('path').css('fill', activeColor);
    $(current).find('polygon').css('fill', activeColor);
  };

  const showDescriptionOnPage = (obj) => {
    const itemDescription = (obj['description']);
    const itemPoints = (obj['points']);

    $('.skills-list li:not(.skills__description)').remove();
    $('.skills__description').html(itemDescription);

    itemPoints.forEach( (element, index) => {
      const elHtml = `<li>${element}</li>`;
      $(elHtml).appendTo('.skills-list').css({
        'animation-name': 'append-skill',
        'animation-delay': `${index * 50}ms`
      });
    });
  };

  const mouseoverEmelent = (current) => {
    TweenMax.to(current, 0.8, {scale: 1.25, ease: Elastic.easeOut.config(1, 0.3), transformOrigin: 'center center'});
    $(current).css('cursor', 'pointer');
  };

  const mouseOutElement = (current) => {
    TweenMax.to(current, 0.1, {scale: 1, transformOrigin: 'center center'});
  };

  const scrollToList = () => {
    $('html, body').animate({
      scrollTop: $('.skills-list').offset().top - 65
    }, 700);
  };

  icons.forEach((item) => {
    item.addEventListener('click', () => {
      const itemRotation = data[item.id];
      TweenMax.to(chart, 2, {rotation: (itemRotation['aroundCenter']), transformOrigin: 'center center'});
      TweenMax.to(chartInside, 2, {rotation: -(itemRotation['aroundCenter'] * 2), transformOrigin: 'center center'});
      TweenMax.to(item, 2, {rotation: itemRotation['aroundCenter'], transformOrigin: 'center center'});
      

      colorizeIcons(item);
      showDescriptionOnPage(data[item.id]);
      scrollToList();
    });

    item.addEventListener('mouseover', function () {
      mouseoverEmelent(item);
    });

    item.addEventListener('mouseout', function () {
      mouseOutElement(item);
    });
  });
}
