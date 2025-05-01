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
  const { showDate = true, showLogo = true, title } = options;

  const headerLogo = showLogo ? logo : null;
  const headerDate: Content = showDate
    ? {
        text: new Date().toLocaleDateString(),
        alignment: 'right',
        margin: [20, 20],
      }
    : null;

  const headerTitle: Content = title
    ? { text: title, style: { alignment: 'center', bold: true } }
    : null;

  return {
    columns: [headerLogo, headerTitle, headerDate],
  };
};
