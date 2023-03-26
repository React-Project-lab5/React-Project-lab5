/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import classes from './MapContainer.module.scss';
import { useRecoilValue } from 'recoil';
import { addressState } from '@/@recoil/addressState';
import { mapState } from '@/@recoil/mapState';
import { readingMap } from '@/@recoil/readingMap';
import { useSetRecoilState } from 'recoil';
import { useRecoilState } from 'recoil';

export const MapContainer = () => {
  const kakao = window['kakao'];
  const address = useRecoilValue(addressState);
  const setMapLocation = useSetRecoilState(mapState);
  const [mapData, setMapData] = useRecoilState(readingMap);

  console.log('mapData', typeof mapData);
  useEffect(() => {
    const mapContainer = document.getElementById('map'); // 지도를 표시할 div
    const mapOption = {
      center: new kakao.maps.LatLng(mapData[0], mapData[1]), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    // 지도를 생성합니다
    const map = new kakao.maps.Map(mapContainer, mapOption);

    // 마커가 표시될 위치입니다
    const markerPosition = new kakao.maps.LatLng(mapData[0], mapData[1]);

    // 마커를 생성합니다
    const Firstmarker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    Firstmarker.setMap(map);
  }, [address, setMapLocation, mapData]);

  useEffect(() => {
    const mapContainer = document.getElementById('map'); // 지도를 표시할 div
    const mapOption = {
      center: new kakao.maps.LatLng(mapData[0], mapData[1]), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };
    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new kakao.maps.services.Geocoder();
    const map = new kakao.maps.Map(mapContainer, mapOption);

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(`${address}`, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        setMapLocation([coords['Ma'], coords['La']]);

        kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
          // 클릭한 위도, 경도 정보를 가져옵니다
          const latlng = mouseEvent.latLng;

          // 마커 위치를 클릭한 위치로 옮깁니다
          marker.setPosition(latlng);
          let message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
          message += '경도는 ' + latlng.getLng() + ' 입니다';
          console.log(message);

          setMapLocation([latlng.getLat(), latlng.getLng()]);
        });
        // 결과값으로 받은 위치를 마커로 표시합니다
        const marker = new kakao.maps.Marker({
          map: map,
          position: coords,
        });
        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
        marker.setMap(map);
      }
    });
  }, [address]);

  return (
    <div className={classes['mapContainer']}>
      <div id="map" className={classes['map']}></div>
    </div>
  );
};
