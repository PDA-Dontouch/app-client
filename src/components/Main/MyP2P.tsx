import tw, { styled } from 'twin.macro';
import MyP2PProduct from './MyP2PProduct';
import {
  EnergyList,
  HeldEnergyList,
  MyP2PProductType,
  WithEnergyId,
} from '../../types/energy_product';
import Nothing from './Nothing';
import {
  EstatesList,
  HeldEstatesList,
  WithEstateId,
} from '../../types/estates_product';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { setClickEstates } from '../../store/reducers/estates/estates';

type MyP2PProps = {
  energyData: (MyP2PProductType & WithEnergyId)[] | EnergyList[];
  estateData: (MyP2PProductType & WithEstateId)[] | EstatesList[];
};

const MyP2PContainer = styled.div`
  ${tw`flex flex-col gap-5 w-full`}
`;

const P2P = styled.div`
  ${tw`flex flex-col gap-4 w-full`}
`;

const P2PType = styled.div`
  ${tw`text-xs`}
`;

export default function MyP2P({ energyData, estateData }: MyP2PProps) {
  const dispatch = useDispatch<AppDispatch>();

  console.log(energyData);
  console.log(estateData);

  return (
    <MyP2PContainer>
      <P2P>
        <P2PType>부동산</P2PType>
        {estateData.length > 0 ? (
          estateData.map((estate, idx) => {
            return (
              <div key={idx}>
                <MyP2PProduct data={estate} isEstates={true} />
              </div>
            );
          })
        ) : (
          <Nothing />
        )}
      </P2P>
      <P2P>
        <P2PType>에너지</P2PType>
        {energyData.length > 0 ? (
          energyData.map((energy, idx) => {
            return (
              <div key={idx}>
                <MyP2PProduct data={energy} isEstates={false} />
              </div>
            );
          })
        ) : (
          <Nothing />
        )}
      </P2P>
    </MyP2PContainer>
  );
}
