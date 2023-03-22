import { useSetRecoilState } from 'recoil';
import { readingMap } from '@/states/readingMap';

interface Props {
  mapPosition: [];
}

export function MapReading({ mapPosition }: Props) {
  console.log('MapReading파일', mapPosition);

  const setMapData = useSetRecoilState(readingMap);
  setMapData(mapPosition);

  return <></>;
}
