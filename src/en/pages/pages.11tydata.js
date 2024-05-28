export default {
    layout: 'page',
    tags: 'page',
    permalink: function(data) {
        if (data.seo?.slug) {
            return `/${data.lang}/${this.slugify(data.seo.slug)}/`;
        } else {
            return `/${data.lang}/${this.slugify(data.page.fileSlug)}/`;
        }
    }
};
