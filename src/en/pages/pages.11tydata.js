import slugify from './utils/slugify'; // Or define slugify directly in this file

export default {
  layout: 'page',
  tags: 'page',
  permalink: (data) => {
    if (data.seo?.slug) {
      return `/${data.lang}/${slugify(data.seo.slug)}/`;
    } else {
      return `/${data.lang}/${slugify(data.page.fileSlug)}/`;
    }
  }
};
