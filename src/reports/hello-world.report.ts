import { TDocumentDefinitions } from 'pdfmake/interfaces';

interface ReportOptions {
  name: string;
}

export const getHelloWorldReport = (
  options: ReportOptions,
): TDocumentDefinitions => {
  const { name } = options;

  const docDefinition: TDocumentDefinitions = {
    content: [`Hey ${name}`],
    footer: function (currentPage, pageCount) {
      return [
        {
          text: currentPage.toString() + ' of ' + pageCount,
          marginRight: 32,
          alignment: 'right',
        },
      ];
    },
    header: {
      columns: [
        {
          text: 'Start',
          alignment: 'left',
        },
        {
          text: 'End',
          alignment: 'right',
        },
      ],
      margin: 16,
    },
    // header: function (currentPage, pageCount, pageSize) {
    //   // you can apply any logic and return any valid pdfmake element

    //   return [
    //     { text: 'simple text', alignment: currentPage % 2 ? 'left' : 'right' },
    //     {
    //       canvas: [
    //         { type: 'rect', x: 170, y: 32, w: pageSize.width - 170, h: 40 },
    //       ],
    //     },
    //   ];
    // },
  };

  return docDefinition;
};
