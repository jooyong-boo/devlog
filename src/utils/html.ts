import DOMPurify from 'dompurify';
import parse, { HTMLReactParserOptions, Text } from 'html-react-parser';
import { JSDOM } from 'jsdom';

// html 문자열에서 텍스트만 추출
export const extractTextFromHtml = (
  html: string,
  maxLength: number = 100,
): string => {
  let text = '';
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Text) {
        text += domNode.data;
      }
      return null;
    },
  };

  parse(html, options);

  // 추출된 텍스트를 maxLength만큼 자르고 말줄임표 추가
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

// html 문자열을 purify하여 반환
export const sanitizeHtml = (html: string) => {
  return DOMPurify(new JSDOM('<!DOCTYPE html>').window).sanitize(html);
};
