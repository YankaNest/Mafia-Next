'use client';

import React, { useEffect, useRef } from 'react';

export default function ContactMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ymapsScriptId = 'ymaps-script';

    if (!document.getElementById(ymapsScriptId)) {
      const script = document.createElement('script');
      script.id = ymapsScriptId;
      script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
      script.async = true;
      script.onload = () => {
        initMap();
      };
      document.head.appendChild(script);
    } else {
      initMap();
    }

    function initMap() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!mapRef.current || !(window as any).ymaps) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).ymaps.ready(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const myMap = new (window as any).ymaps.Map(mapRef.current, {
          center: [54.898691, 38.081417],
          zoom: 15,
          controls: ['zoomControl', 'fullscreenControl'],
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const myPlacemark = new (window as any).ymaps.Placemark(
          [54.898691, 38.081417],
          {
            balloonContent: 'Мафия',
          },
          {
            preset: 'islands#icon',
            iconColor: '#ff6600',
          }
        );

        myMap.geoObjects.add(myPlacemark);
      });
    }
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '400px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
    />
  );
}
