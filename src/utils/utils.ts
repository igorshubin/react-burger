import {IngredientItemProps} from './props';
import {TYPEDEFAULT} from './constants';


/**
 * Parse data to get Constructor top/bottom & inner list
 * @param bunKey Key of bun for top/bottom (TODO: get from selected BUN ingredients, in left section)
 * @param data
 */
export const getConstructorData = (data: IngredientItemProps[], bunKey: number = 0) => {
  const top: IngredientItemProps|null = data[bunKey];
  const bottom: IngredientItemProps|null = data[bunKey];
  const list: IngredientItemProps[]|[] = data.filter((i) => i.type !== TYPEDEFAULT);

  return {top, bottom, list};
}

/**
 * Calc constructor total money amount
 * @param data
 */
export const getConstructorTotal = (data: IngredientItemProps[]) => {
  // TODO: calc totals prices from data & multiply to counts
  return 9999;
}
