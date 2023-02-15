import { TITLE, DEFAULT_TITLE, DESCRIPTION } from 'constants/meta';

// TODO : 해당 어플리케이션 상황에 맞게 수정후 배포
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

// FIXME: 꼭 필요하지 않음, 상황에 따라 삭제 및 사용여부 결정
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
