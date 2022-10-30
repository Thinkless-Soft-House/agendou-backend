import { PaginationConfig } from '@/interfaces/utils.interface';
import { Request } from 'express';

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const checkHour = (hoursA: { start: string; end: string }, hoursB: { start: string; end: string }) => {
  const aMinutesStart = +hoursA.start.split(':')[0] * 60 + +hoursA.start.split(':')[1];
  const aMinutesEnd = +hoursA.end.split(':')[0] * 60 + +hoursA.end.split(':')[1];

  const bMinutesStart = +hoursB.start.split(':')[0] * 60 + +hoursB.start.split(':')[1];
  const bMinutesEnd = +hoursB.end.split(':')[0] * 60 + +hoursB.end.split(':')[1];

  // Checar se o start do B esta entre o start e o end do A
  if (!(bMinutesStart >= aMinutesStart && bMinutesStart <= aMinutesEnd)) {
    return false;
  }
  // Checar se o end do B esta entre o start e o end do A e depois do start do B
  if (!(bMinutesEnd > aMinutesStart && bMinutesEnd < aMinutesEnd && bMinutesEnd > bMinutesStart)) {
    return false;
  }

  return true;
};

export const createPaginationConfig = (req: Request) => {
  const take: number = +req.query.take || 10;
  const skip: number = +req.query.skip || 0;
  const orderColumn: string = (req.query.orderColumn as string) || 'id';
  const order: 'ASC' | 'DESC' = (req.query.order as 'ASC' | 'DESC') || 'ASC';
  const paginationConfig: PaginationConfig = {
    take,
    skip,
    orderColumn,
    order,
  };

  return paginationConfig;
};
