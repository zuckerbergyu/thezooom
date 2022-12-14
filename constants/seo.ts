import { TITLE, DEFAULT_TITLE, DESCRIPTION } from 'constants/meta';

export const DEFAULT_SEO = {
  title: TITLE,
  defaultTitle: DEFAULT_TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    locale: 'ko_KR', // en_IE
    url: 'HOST URL',
    site_name: `site_name`,
    images: [
      {
        url: ``,
        width: 750,
        height: 400,
        alt: 'alt',
      },
    ],
  },
  additionalLinkTags: [
    {
      rel: 'icon',
      href: 'url',
    },
    {
      rel: 'apple-touch-icon',
      href: 'url',
      sizes: '76x76',
    },
  ],
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};

// 이거는 굳이 필요하지 않을듯하다, 그냥 그때그때 만들어서 쓰는것으로 하기
export const DETAIL_SEO = ({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) => ({
  title: title,
  description: description,
  openGraph: {
    title: title,
    images: url,
  },
});
