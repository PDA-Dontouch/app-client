import { Map, MapMarker } from "react-kakao-maps-sdk";
import tw, { styled } from "twin.macro";

import Marker from '../../assets/marker.png';

const MapContainer = styled(Map)`
  ${tw`h-[200px] rounded-8`}
`;

const MapComponent = () => {
  return (
    <MapContainer 
      center={{ lat: 33.450701, lng: 126.570667 }}
      level={3}
    >
      <MapMarker
        position={{
          lat: 33.450701,
          lng: 126.570667,
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
  );
};

export default MapComponent;