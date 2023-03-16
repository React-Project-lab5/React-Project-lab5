/*global kakao*/
import React, { useEffect } from 'react';
const { kakao } = window;

export const MapContainer = () => {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(
      37.365264512305174,
      127.10676860117488
    );
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  }, []);

  return (
    <div>
      <div
        id="map"
        style={{
          width: '270px',
          height: '220px',
          marginTop: '10px',
          marginRight: '30px',
        }}
      ></div>
    </div>
  );
};
