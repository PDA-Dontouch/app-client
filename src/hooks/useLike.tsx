import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '../store/store';
import { delEstatesLike, setEstatesLike } from '../store/reducers/estates/estates';
import { delEnergyLike, setEnergyLike } from '../store/reducers/energy/energy';
// import { addLikeEstates, delLikeEstates, addLikeEnergy, delLikeEnergy } from '../api'; // API 호출이 필요한 경우 주석 해제

type LikeType = 'estates' | 'energy';

const useLike = (type: LikeType) => {
  const dispatch = useDispatch();
  const likeArr = useSelector((state: RootState) => {
    if (type === 'estates') {
      return state.estates.likes;
    } else if (type === 'energy') {
      return state.energy.likes;
    }
    return [];
  });

  const setLike = useCallback((id: number) => {
    if (likeArr.includes(id)) {
      if (type === 'estates') {
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
      } else if (type === 'energy') {
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
      }
    } else {
      if (type === 'estates') {
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
      } else if (type === 'energy') {
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
    }
  }, [dispatch, likeArr, type]);

  return { likeArr, setLike };
};

export default useLike;