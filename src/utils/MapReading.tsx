import { useSetRecoilState } from 'recoil';
import { readingMap } from '@/@recoil/readingMap';
import { useLayoutEffect } from 'react';

interface Props {
  mapPosition: [];
}

export function MapReading({ mapPosition }: Props) {
  console.log('MapReading파일', mapPosition);

  const setMapData = useSetRecoilState(readingMap);

  useLayoutEffect(() => {
    setMapData(mapPosition);
  }, [mapPosition, setMapData]);

  return <></>;
}
