import { TweenMax } from 'gsap';
declare let $: any;

export function InteractiveChart(iconsData) {
  const data = iconsData;
  const chart = document.querySelector('#svg-chart');
  const icons = document.querySelectorAll('.svg-icon');
  const chartInside = document.querySelectorAll('#kolko-inside');
  const activeColor = '#ecc200';
  const defaultColor = '#ffffff';

  const colorizeElementContent = (current) => {
    icons.forEach(function (item) {
      $(item).find('path').css('fill', defaultColor);
      $(item).find('polygon').css('fill', defaultColor);
    });

    $(current).find('path').css('fill', activeColor);
    $(current).find('polygon').css('fill', activeColor);
  };

  const showElementOnPage = (obj) => {
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
    TweenMax.to(current, 0.2, {scale: 1.08, transformOrigin: 'center center'});
    $(current).css('cursor', 'pointer');
  };

  const mouseOutElement = (current) => {
    TweenMax.to(current, 0.3, {scale: 1, transformOrigin: 'center center'});
  };

  icons.forEach((item) => {
    item.addEventListener('click', () => {
      const itemRotation = data[item.id];

      TweenMax.to(chart, 2, {rotation: -(itemRotation['aroundCenter']), transformOrigin: 'center center'});
      TweenMax.to(item, 2, {rotation: itemRotation['aroundCenter'], transformOrigin: 'center center'});
      TweenMax.to(chartInside, 2, {rotation: (itemRotation['aroundCenter'] * 2), transformOrigin: 'center center'});

      colorizeElementContent(item);
      showElementOnPage(data[item.id]);
    });

    item.addEventListener('mouseover', function () {
      mouseoverEmelent(item);
    });

    item.addEventListener('mouseout', function () {
      mouseOutElement(item);
    });
  });
}
