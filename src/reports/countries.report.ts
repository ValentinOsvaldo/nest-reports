import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';
import { countries as Country } from '@prisma/client';
import { footerSection } from './sections/footer.section';

interface ReportOptions {
  title?: string;
  subtitle?: string;
  countries: Country[];
}

export const getCountriesReport = (
  options: ReportOptions,
): TDocumentDefinitions => {
  const { title, subtitle, countries } = options;

  return {
    pageOrientation: 'landscape',
    header: headerSection({
      title: title ?? 'Countries report',
      subtitle: subtitle ?? 'List of countries',
    }),
    footer: footerSection,
    pageMargins: [40, 110, 40, 60],
    content: [
      {
        layout: 'customLayout01', // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [50, 50, 50, '*', 'auto', '*'],
          body: [
            ['ID', 'ISO2', 'ISO3', 'NAME', 'CONTINENT', 'LOCAL NAME'],
            ...countries.map((country) => [
              country.id.toString(),
              country.iso2,
              country.iso3,
              country.name,
              country.continent,
              country.local_name,
            ]),
            [
              '',
              '',
              '',
              '',
              {
                text: 'Total',
                bold: true,
              },
              {
                text: `${countries.length}`,
              },
            ],
          ],
        },
      },

      {
        text: 'Totales',
        style: {
          fontSize: 18,
          bold: true,
          margin: [0, 40, 0, 0],
        },
      },
      {
        layout: 'noBorders',
        table: {
          headerRows: 1,
          widths: [50, 50, 70, '*', 'auto', '*'],
          body: [
            [
              {
                text: 'Total de países',
                bold: true,
                colSpan: 2,
              },
              {},
              {
                text: `${countries.length} países`,
                bold: true,
              },
              {},
              {},
              {},
            ],
          ],
        },
      },
    ],
  };
};
