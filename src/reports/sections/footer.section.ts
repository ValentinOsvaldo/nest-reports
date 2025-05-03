import type { Content } from 'pdfmake/interfaces';

export const footerSection = (
  currentPage: number,
  pageCount: number,
): Content => {
  return [
    {
      text: `Página ${currentPage} de ${pageCount}`,
      alignment: 'right',
      margin: [20, 20],
      bold: true,
    },
  ];
};
