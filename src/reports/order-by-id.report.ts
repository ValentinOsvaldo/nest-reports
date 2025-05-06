import type {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { footerSection } from './sections/footer.section';
import { Formatter } from 'src/helpers/formatter.helper';

const logo: Content = {
  image: 'src/assets/tucan-banner.png',
  width: 100,
  height: 30,
  margin: [10, 30],
};

const styles: StyleDictionary = {
  header: {
    bold: true,
    fontSize: 20,
    margin: [0, 30, 0, 0],
  },
  subheader: {
    fontSize: 16,
    bold: true,
    margin: [0, 20, 0, 0],
  },
};

export interface CompleteOrder {
  order_id: number;
  customer_id: number;
  order_date: Date;
  customers: Customers;
  order_details: OrderDetail[];
}

export interface Customers {
  customer_id: number;
  customer_name: string;
  contact_name: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
}

export interface OrderDetail {
  order_detail_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  products: Products;
}

export interface Products {
  product_id: number;
  product_name: string;
  category_id: number;
  unit: string;
  price: string;
}

interface ReportValues {
  title?: string;
  subtitle?: string;
  data: CompleteOrder;
}

export const orderByIdReport = (value: ReportValues): TDocumentDefinitions => {
  const { data } = value;
  const { customers, order_details } = data;

  const subtotal = order_details.reduce(
    (acc, current) => acc + current.quantity * Number(current.products.price),
    0,
  );
  const total = subtotal * 1.16;

  return {
    header: logo,
    footer: footerSection,
    styles,
    pageMargins: [40, 60, 40, 60],
    content: [
      {
        text: 'Tucan Code',
        style: 'header',
      },

      {
        columns: [
          {
            text: [
              `Porfirio del Castillo 155,\nUnidad Laboral 2do Sector,\n66440 San Nicolás de los Garza, N.L.\n`,
              {
                link: `https://valentin-osvaldo.vercel.app/`,
                text: `https://valentin-osvaldo.vercel.app/\n`,
              },
            ],
            bold: true,
          },
          {
            text: `Recibo No: #${data.order_id}\nFecha del recibo ${Formatter.formatDate(data.order_date)}\nFacturar antes de ${Formatter.formatDate(new Date())}\n`,
            alignment: 'right',
          },
        ],
      },

      {
        qr: 'https://valentin-osvaldo.vercel.app/',
        fit: 100,
        alignment: 'right',
      },

      {
        text: [
          { text: `Cobrar a:\n`, style: 'subheader' },
          `Razón social: ${customers.customer_name}
          Contacto: ${customers.contact_name}
          ${customers.address}`,
        ],
      },

      // Table
      {
        layout: 'headerLineOnly',
        margin: [0, 30],
        table: {
          headerRows: 1,
          widths: [50, '*', 'auto', 'auto', 'auto'],
          body: [
            ['ID', 'Descripción', 'Cantidad', 'Precio', 'Total'],
            ...order_details.map((order) => [
              `${order.order_detail_id}`,
              order.products.product_name,
              `${order.quantity}`,
              {
                text: Formatter.formatCurrency(+order.products.price),
                alignment: 'right',
              },
              {
                text: Formatter.formatCurrency(
                  +order.products.price * order.quantity,
                ),
                alignment: 'right',
              },
            ]),
          ],
        },
      },
      // Salto de linea
      '\n\n',
      // Totales
      {
        columns: [
          { width: '*', text: '' },
          {
            width: 'auto',
            layout: 'noBorders',
            table: {
              body: [
                [
                  'Subtotal',
                  {
                    text: Formatter.formatCurrency(subtotal),
                    alignment: 'right',
                  },
                ],
                [
                  { text: 'Total', bold: true },
                  {
                    text: Formatter.formatCurrency(total),
                    alignment: 'right',
                    bold: true,
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  };
};
