import { useLayoutEffect } from 'react';

export const useDocumentTitle = (titleContent: string) => {
  useLayoutEffect(() => {
    document.title = titleContent;
  }, [titleContent]);
};
