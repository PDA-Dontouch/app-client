import { Map, MapMarker } from 'react-kakao-maps-sdk';
import tw, { styled } from 'twin.macro';

import Marker from '../../assets/marker.png';
import { useEffect, useState } from 'react';

interface MapProps {
  lat: number;
  lng: number;
  lastPartAddress: string;
}

const MapContainer = styled(Map)`
  ${tw`h-[200px] rounded-8`}
`;

const MainText = styled.span`
  ${tw`text-[15px] font-semibold ps-2`}
`;

const MapComponent = ({ lat, lng, lastPartAddress }: MapProps) => {
  const [address, setAddress] = useState<string>('');

  useEffect(() => {
    const loadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        const coord = new window.kakao.maps.LatLng(lat, lng);

        geocoder.coord2Address(
          coord.getLng(),
          coord.getLat(),
          (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const address = result[0].address.address_name;
              setAddress(address);
            }
          },
        );
      });
    };

    if (window.kakao && window.kakao.maps) {
      loadKakaoMap();
    }
  }, [lat, lng]);

  return (
    <>
      <MapContainer center={{ lat: lat, lng: lng }} level={3}>
        <MapMarker
          position={{
            lat: lat,
            lng: lng,
          }}
          image={{
            src: Marker,
            size: {
              width: 40,
              height: 40,
            },
          }}
        />
      </MapContainer>
      <MainText>
        {address} {lastPartAddress}
      </MainText>
    </>
  );
};

export default MapComponent;
