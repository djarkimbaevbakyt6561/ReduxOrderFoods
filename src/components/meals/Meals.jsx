import styled from 'styled-components';
import MealsItem from './MealsItem';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFoods } from '../store/meals';
const Meals = React.memo(() => {
  const { meals } = useSelector((state) => state.meals);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFoods());
  }, []);
  return (
    <MealsList>
      {meals?.map((el) => {
        return (
          <MealsItem
            price={el.price}
            title={el.title}
            description={el.description}
            key={el._id}
            id={el._id}
          />
        );
      })}
    </MealsList>
  );
});
export default Meals;
const MealsList = styled.ul`
  width: 50.4%;
  height: 58vh;
  background: #ffffff;
  border-radius: 16px;
  padding-right: 40px;
`;
