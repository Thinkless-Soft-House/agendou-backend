import { PaginationConfig } from '@/interfaces/utils.interface';
import { parse, isBefore, isAfter, isWithinInterval, addMinutes, subMinutes, compareAsc } from 'date-fns';
import { Request } from 'express';
import * as crypto from 'crypto';

import * as Papa from 'papaparse';
import * as fs from 'fs';

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

export const setPassword = (password: string): string => {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
};

export const comparePassword = (password: string, hashedPassword: string): boolean => {
  return crypto.timingSafeEqual(Buffer.from(crypto.createHash('sha256').update(password).digest('hex'), 'hex'), Buffer.from(hashedPassword, 'hex'));
};

export const checkHour = (rangeA: { start: string; end: string }, rangeB: { start: string; end: string }) => {
  const startA = parse(rangeA.start, 'HH:mm', new Date());
  const endA = parse(rangeA.end, 'HH:mm', new Date());
  const startB = parse(rangeB.start, 'HH:mm', new Date());
  const endB = parse(rangeB.end, 'HH:mm', new Date());

  if (endB <= startB) {
    return false;
  }

  return isWithinInterval(startB, { start: startA, end: endA }) && isWithinInterval(endB, { start: startA, end: endA });
};

export const checkDiffInterval = (rangeA: { start: string; end: string }, rangeB: { start: string; end: string }) => {
  const startA = parse(rangeA.start, 'HH:mm', new Date());
  const endA = parse(rangeA.end, 'HH:mm', new Date());
  const startB = parse(rangeB.start, 'HH:mm', new Date());
  const endB = parse(rangeB.end, 'HH:mm', new Date());

  // Checar se o startA é diferente que o startB
  if (compareAsc(startA, startB) !== 0) {
    // Checar se o startA é menor que o startB
    if (compareAsc(startA, startB) === -1) {
      // Checar se o endA é menor ou igual ao startB e maior que o startA
      if ((compareAsc(endA, startB) === -1 || compareAsc(endA, startB) === 0) && compareAsc(endA, startA) === 1) {
        return true;
      } else {
        return false;
      }
    } else {
      // Checar se o endB é menor ou igual ao startA
      if (compareAsc(endB, startA) === -1 || compareAsc(endB, startA) === 0) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    return false;
  }
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

export const parseDate = (date: string, delimiter = '/') => {
  const dateSplited = date.split(delimiter);
  console.log('dateSplited', dateSplited);
  const dateParsed = new Date(+dateSplited[0], +dateSplited[1] - 1, +dateSplited[2]);
  console.log('dateParsed', dateParsed);
  return dateParsed.toISOString();
};

export const createCSV = (data: any[], fileConfig: { filename?: string; path?: string; save: boolean }) => {
  if (!fileConfig || !fileConfig.save) {
    console.log('Não é necessário salvar o arquivo');
    return;
  }

  const csv = Papa.unparse(data);

  if (!fileConfig.filename) {
    fileConfig.filename = 'default_' + new Date().getTime() + '.csv';
  }

  if (!fileConfig.path) {
    fileConfig.path = './';
  }

  fs.mkdirSync(fileConfig.path, { recursive: true });

  // Checar se o arquivo já existe, se sim adicionar um timestamp
  if (fs.existsSync(`${fileConfig.path}${fileConfig.filename}`)) {
    fileConfig.filename = fileConfig.filename.split('.')[0] + '_' + new Date().getTime() + '.csv';
  }

  fs.writeFile(`${fileConfig.path}${fileConfig.filename}`, csv, function (err) {
    if (err) {
      console.log('Erro ao salvar o arquivo:', err);
    } else {
      console.log(`Arquivo salvo como ${fileConfig.filename} em ${fileConfig.path}`);
    }
  });
};
