/*global kakao*/
import React, { useEffect } from 'react';
import classes from './MapContainer.module.scss';

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

    kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
      // 클릭한 위도, 경도 정보를 가져옵니다
      const latlng = mouseEvent.latLng;

      // 마커 위치를 클릭한 위치로 옮깁니다
      marker.setPosition(latlng);

      let message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
      message += '경도는 ' + latlng.getLng() + ' 입니다';
      console.log(message);
    });
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  }, []);

  return (
    <div className={classes['mapContainer']}>
      <div
        id="map"
        // style={{
        //   width: '270px',
        //   height: '220px',
        //   marginTop: '10px',
        //   marginRight: '30px',
        // }}
        className={classes['map']}
      ></div>
    </div>
  );
};
