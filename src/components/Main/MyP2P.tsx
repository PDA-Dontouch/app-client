import tw, { styled } from 'twin.macro';
import MyP2PProduct, { MyP2PProductType } from './MyP2PProduct';
import Nothing from './Nothing';

type MyP2PProps = {
  energyData: MyP2PProductType[];
  estateData: MyP2PProductType[];
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
  return (
    <MyP2PContainer>
      <P2P>
        <P2PType>부동산</P2PType>
        {estateData.length > 0 ? (
          estateData.map((estate, idx) => {
            return (
              <div key={idx}>
                <MyP2PProduct
                  img={estate.img}
                  name={estate.name}
                  monthlyDividend={estate.monthlyDividend}
                  annualRate={estate.annualRate}
                  openDate={estate.openDate}
                />
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
                <MyP2PProduct
                  img={energy.img}
                  name={energy.name}
                  monthlyDividend={energy.monthlyDividend}
                  annualRate={energy.annualRate}
                  openDate={energy.openDate}
                />
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
