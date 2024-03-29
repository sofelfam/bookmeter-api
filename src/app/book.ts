import { type groups, extractRegex, extractRegexGroup } from "../utils/string-utils";
import { joinBaseUrl } from "../utils/bookmeter-utils";

export type OffsetBookParams = {
  offsetArrayStart: number,
  offsetArrayEnd: number,
  offsetBookNo: number
}

export const getBooksDetails = (listBooks: string[], isAsc: boolean, params: OffsetBookParams) => {
  const { offsetArrayStart, offsetArrayEnd, offsetBookNo } = params;
  const targetBooks = listBooks.slice(offsetArrayStart, offsetArrayEnd);
  if (isAsc) targetBooks.reverse();
  return {
    books: targetBooks.map((book, i) => {
      const titleInfo = getBookTitleInfo(book);
      const authorInfo = getBookAuthorInfo(book);
      return ({
        no: isAsc ? offsetBookNo - (targetBooks.length - i - 1) : offsetBookNo - i,
        title: titleInfo?.title ?? '',
        url: joinBaseUrl(titleInfo?.url),
        author: authorInfo?.author ?? '',
        authorUrl: joinBaseUrl(authorInfo?.url),
        thumb: getBookThumb(book),
        date: getBookDate(book),
      });
    }
    ),
    count: targetBooks.length,
  }
}

export const getBooks = (html: string): string[] => {
  return extractRegex(html, /<li class="group__book">(.*?)<\/div><\/li>/g);
}

export const getBookTitleInfo = (htmlBook: string): groups => {
  // img altの場合、タイトルが省略されていない
  // return extractRegexGroup(htmlBook, /<div class="detail__title"><a href="(?<url>.*?)">(?<title>.*?)<\/a><\/div>/g)[0];
  return extractRegexGroup(htmlBook, /<div class="thumbnail__cover"><a href="(?<url>.*?)"><img alt="(?<title>.*?)" class/g)[0];
}

export const getBookDate = (htmlBook: string): string => {
  return extractRegex(htmlBook, /<div class="detail__date">(.*?)<\/div>/g)[0];
}

export const getBookAuthorInfo = (htmlBook: string): groups => {
  return extractRegexGroup(htmlBook, /<ul class="detail__authors"><li><a href="(?<url>.*?)">(?<author>.*?)<\/a><\/li><\/ul>/g)[0];
}

export const getBookThumb = (htmlBook: string): string => {
  return extractRegex(htmlBook, /class="cover__image" src="(.*?)" \/>/g)[0];
}
