import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { AppDispatch, RootState } from '../store/store';
import {
  delEstatesLike,
  setEstatesLike,
} from '../store/reducers/estates/estates';
import {
  addLikeEnergy,
  delEnergyLike,
  setEnergyLike,
} from '../store/reducers/energy/energy';

type likeType = {
  fundId: string | number;
};

const useLike = ({ fundId }: likeType) => {
  const dispatch = useDispatch<AppDispatch>();
  const EstatesLikeArr = useSelector(
    (state: RootState) => state.estates.estatesLike,
  );
  const EnergyLikeArr = useSelector(
    (state: RootState) => state.energy.energyLike,
  );
  const userId = useSelector((state: RootState) => state.user.user.id);

  const setLikeEstates = useCallback(
    (id: number) => {
      if (EstatesLikeArr.includes(id)) {
        dispatch(delEstatesLike(id));
        // const data = {
        //   token: "token",
        //   estates_id: id
        // }
        // dispatch(delLikeEstates(data))
        //   .then((res) => {
        //     if (res.payload.success === true) {
        //       dispatch(delEstatesLike(id));
        //     }
        //   })
      } else {
        dispatch(setEstatesLike(id));
        // const data = {
        //   token: "token",
        //   estates_id: id
        // }
        // dispatch(addLikeEstates(data))
        //   .then((res) => {
        //     if (res.payload.success === true) {
        //       dispatch(setEstatesLike(id));
        //     }
        //   })
      }
    },
    [dispatch, EstatesLikeArr],
  );

  const setLikeEnergy = useCallback(() => {
    const data = {
      userId: userId,
      energyFundId: fundId as string,
    };

    dispatch(addLikeEnergy(data));
  }, [dispatch]);

  return { EstatesLikeArr, setLikeEstates, EnergyLikeArr, setLikeEnergy };
};

export default useLike;
