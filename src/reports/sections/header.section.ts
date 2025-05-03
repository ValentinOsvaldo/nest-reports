import type { Content } from 'pdfmake/interfaces';

interface HeaderOptions {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 20],
};

export const headerSection = (options: HeaderOptions = {}): Content => {
  const { showDate = true, showLogo = true, title, subtitle } = options;

  const headerLogo = showLogo ? logo : null;
  const headerDate: Content = showDate
    ? {
        text: new Date().toLocaleDateString(),
        alignment: 'right',
        margin: [20, 30],
        width: 150,
      }
    : null;

  const headerSubtitle: Content = subtitle
    ? {
        text: subtitle,
        alignment: 'center',
        style: { bold: true, fontSize: 22 },
      }
    : null;

  const headerTitle: Content = title
    ? {
        stack: [
          {
            text: title,
            alignment: 'center',
            margin: [0, 15, 0, 0],
            style: {
              bold: true,
              fontSize: 26,
            },
          },
          headerSubtitle,
        ],
      }
    : null;

  return {
    columns: [headerLogo, headerTitle, headerDate],
  };
};
