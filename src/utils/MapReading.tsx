import { useSetRecoilState } from 'recoil';
import { readingMap } from '@/states/readingMap';

export function MapReading({ mapPosition }) {
  console.log('MapReading파일', mapPosition);
  const setMapData = useSetRecoilState(readingMap);
  setMapData(mapPosition);

  return <></>;
}
