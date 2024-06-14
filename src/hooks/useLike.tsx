import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '../store/store';
import {
  delEstatesLike,
  setEstatesLike,
} from '../store/reducers/estates/estates';
import { delEnergyLike, setEnergyLike } from '../store/reducers/energy/energy';
// import { addLikeEstates, delLikeEstates, addLikeEnergy, delLikeEnergy } from '../api';

const useLike = () => {
  const dispatch = useDispatch();
  const EstatesLikeArr = useSelector(
    (state: RootState) => state.estates.estatesLike,
  );
  const EnergyLikeArr = useSelector(
    (state: RootState) => state.energy.energyLike,
  );

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

  const setLikeEnergy = useCallback(
    (id: string) => {
      if (EnergyLikeArr.includes(id)) {
        dispatch(delEnergyLike(id));
        // const data = {
        //   token: "token",
        //   energy_id: id
        // }
        // dispatch(delLikeEnergy(data))
        //   .then((res) => {
        //     if (res.payload.success === true) {
        //       dispatch(delEnergyLike(id));
        //     }
        //   })
      } else {
        dispatch(setEnergyLike(id));
        // const data = {
        //   token: "token",
        //   energy_id: id
        // }
        // dispatch(addLikeEnergy(data))
        //   .then((res) => {
        //     if (res.payload.success === true) {
        //       dispatch(setEnergyLike(id));
        //     }
        //   })
      }
    },
    [dispatch, EnergyLikeArr],
  );

  return { EstatesLikeArr, setLikeEstates, EnergyLikeArr, setLikeEnergy };
};

export default useLike;
