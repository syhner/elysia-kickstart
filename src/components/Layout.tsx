import * as elements from 'typed-html';

type Props = {
  title?: string;
};

export const Layout = (props: Props & elements.Children) => {
  const { title = 'elysia-kickstart' } = props;
  return (
    '<!DOCTYPE html>' +
    (
      <html lang='en' class='dark'>
        <head>
          <meta charset='UTF-8' />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />
          <title>{title}</title>
          <link href='/dist/globals.css' rel='stylesheet' />
          <script src='/public/htmx@1.9.5.min.js'></script>
          <script src='/public/use-theme.js' />
        </head>
        <body>{props.children}</body>
      </html>
    )
  );
};
