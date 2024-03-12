import { applyLimits } from "./number-utils";

type pageInfo = {
  currentPage: number,
  prevPage: number | null,
  nextPage: number | null,
  lastPage: number,
}

type offsetsInfo = {
  offsetStart: number,
  offsetEnd: number;
}

export const getPageInfo = (reqPage: number, countPerPage: number, totalCount: number): pageInfo => {
  if (countPerPage > totalCount) countPerPage = totalCount;
  const lastPage = totalCount % countPerPage == 0
    ? totalCount / countPerPage
    : (totalCount / countPerPage | 0) + 1;
  const prevPage = reqPage > 1 ? reqPage - 1 : null;
  const nextPage = lastPage > reqPage ? reqPage + 1 : null;

  return {
    currentPage: reqPage,
    prevPage,
    nextPage,
    lastPage,
  }
}

export const getOffsetsPerPage = (reqPage: number, countPerPage: number, totalCount: number, isAsc: boolean): offsetsInfo => {
  let offsetStart: number, offsetEnd: number;
  if (isAsc) {
    offsetEnd = applyLimits(totalCount - (reqPage - 1) * countPerPage, 0);
    offsetStart = applyLimits(offsetEnd - countPerPage, 0);
  } else {
    offsetStart = (reqPage - 1) * countPerPage;
    offsetEnd = offsetStart + countPerPage;
  }
  
  return {
    offsetStart,
    offsetEnd
  }
}