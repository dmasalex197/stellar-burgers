import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';

import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { selectIngredients } from '../../services/slices/ingredientsSlice';
import { fetchIngredients } from '../../services/thunk/ingredients';

export const BurgerIngredients: FC = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredients);

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');

  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: TTabMode) => {
    setCurrentTab(tab);
    if (tab === 'bun' && titleBunRef.current) {
      titleBunRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'main' && titleMainRef.current) {
      titleMainRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'sauce' && titleSaucesRef.current) {
      titleSaucesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
  const mains = ingredients.filter((ingredient) => ingredient.type === 'main');
  const sauces = ingredients.filter(
    (ingredient) => ingredient.type === 'sauce'
  );

  return (
    <>
      <BurgerIngredientsUI
        currentTab={currentTab}
        buns={buns}
        mains={mains}
        sauces={sauces}
        titleBunRef={titleBunRef}
        titleMainRef={titleMainRef}
        titleSaucesRef={titleSaucesRef}
        bunsRef={bunsRef}
        mainsRef={mainsRef}
        saucesRef={saucesRef}
        onTabClick={onTabClick}
      />
    </>
  );
};
