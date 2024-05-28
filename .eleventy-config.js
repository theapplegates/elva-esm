// @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig 

// Imports --------------------------------------------

import { EleventyI18nPlugin, EleventyHtmlBasePlugin, EleventyRenderPlugin } from '@11ty/eleventy';
import markdownIt from 'markdown-it';
import markdownItIns from 'markdown-it-ins';
import markdownItMark from 'markdown-it-mark';
import markdownItSub from 'markdown-it-sub';
import markdownItSup from 'markdown-it-sup';
import pluginRSS from '@11ty/eleventy-plugin-rss';
import pluginSyntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import pluginEmbedEverything from 'eleventy-plugin-embed-everything';

// Local Imports --------------------------------------

import { formatDate } from './src/_config/filters/dates.js';
import drafts from './src/_config/plugins/drafts.js';
import cssTransform from './src/_config/transforms/css.js';
import htmlTransform from './src/_config/transforms/html.js';
import jsTransform from './src/_config/transforms/js.js';
import imageShortcode from './src/_config/shortcodes/image.js';
import languageFilter from './src/_config/filters/language.js';
import translateFilter from './src/_config/filters/translate.js';
import mimetypeFilter from './src/_config/filters/mimetype.js';
import cdnifyFilter from './src/_config/filters/cdnify.js';
import widontFilter from './src/_config/filters/widont.js';
import randomFilter from './src/_config/filters/random.js';
import whereFilter from './src/_config/filters/where.js';
import sortFilter from './src/_config/filters/sort.js';
import base64Filter from './src/_config/filters/base64.js';
import readingTimeFilter from './src/_config/filters/readingtime.js';

// 11ty -----------------------------------------------

export default function(eleventyConfig) {

    // Global Settings --------------------------------

    eleventyConfig.addGlobalData('settings', {
        // these get merged with _data/settings.js
        url: process.env.URL || process.env.CF_PAGES_URL || 'http://localhost:8080',
        isProduction: process.env.NODE_ENV === 'production',
        isStaging: (process.env.URL && process.env.URL.includes('github.io')) || (process.env.CF_PAGES_URL && process.env.CF_PAGES_URL.includes('pages.dev')) || false
    });

    // Watch Targets ----------------------------------

    eleventyConfig.addWatchTarget('./src/assets');

    // Layouts ----------------------------------------

    eleventyConfig.addLayoutAlias('base', 'base.njk');
    eleventyConfig.addLayoutAlias('rss', 'rss.njk');
    eleventyConfig.addLayoutAlias('rssxsl', 'rss.xsl.njk');
    eleventyConfig.addLayoutAlias('json', 'json.njk');
    eleventyConfig.addLayoutAlias('manifest', 'manifest.njk');
    eleventyConfig.addLayoutAlias('home', 'home.njk');
    eleventyConfig.addLayoutAlias('page', 'page.njk');
    eleventyConfig.addLayoutAlias('post', 'post.njk');
    eleventyConfig.addLayoutAlias('posts', 'posts.njk');

    // Plugins ----------------------------------------

    eleventyConfig.addPlugin(drafts);
    eleventyConfig.addPlugin(pluginRSS);
    eleventyConfig.addPlugin(pluginSyntaxHighlight);
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
    eleventyConfig.addPlugin(EleventyRenderPlugin);
    eleventyConfig.addPlugin(EleventyI18nPlugin, { defaultLanguage: 'en' });
    eleventyConfig.addPlugin(pluginEmbedEverything, {
        use: ['twitter', 'youtube', 'vimeo'],
        twitter: {
            options: {
                embedClass: 'oembed oembed-twitter',
                doNotTrack: true
            }
        },
        vimeo: {
            options: {
                embedClass: 'oembed oembed-vimeo',
                //wrapperStyle
            }
        },
        youtube: {
            options: {
                embedClass: 'oembed oembed-youtube',
                modestBranding: true,
                lazy: true,
                lite: {
                    thumbnailQuality: 'maxresdefault',
                    css: {
                        inline: true
                    },
                    js: {
                        inline: true
                    }
                }
            }
        }
    });

    // Transforms -------------------------------------

    eleventyConfig.addPlugin(cssTransform);
    eleventyConfig.addPlugin(htmlTransform);
    eleventyConfig.addPlugin(jsTransform);

    // Shortcodes --------------------------------------

    eleventyConfig.addShortcode('version', () => `${+ new Date()}`);
    eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);
    eleventyConfig.addShortcode('build', () => `${new Date().toISOString().split('T')[0]}`);
    eleventyConfig.addShortcode('image', imageShortcode);

    // Filters ----------------------------------------

    eleventyConfig.addFilter('formatDate', formatDate);
    eleventyConfig.addFilter('languageFilter', languageFilter);
    eleventyConfig.addFilter('translate', translateFilter);
    eleventyConfig.addFilter('mimetype', mimetypeFilter);
    eleventyConfig.addFilter('cdnify', cdnifyFilter);
    eleventyConfig.addFilter('widont', widontFilter);
    eleventyConfig.addFilter('random', randomFilter);
    eleventyConfig.addFilter('where', whereFilter);
    eleventyConfig.addFilter('sort', sortFilter);
    eleventyConfig.addFilter('base64', base64Filter);
    eleventyConfig.addFilter('readingTime', readingTimeFilter);


    // Passthrough -------------------------------------

    eleventyConfig.addPassthroughCopy({'./src/assets/files': './assets/files'});
    eleventyConfig.addPassthroughCopy({'./src/assets/img': './assets/img'});
    eleventyConfig.addPassthroughCopy({'./src/assets/fonts': './assets/fonts'});

    // Markdown ----------------------------------------

    eleventyConfig.setLibrary('md', markdownIt({
        html: true,
        linkify: true,
        typographer: true
    }));

    eleventyConfig.amendLibrary('md', (mdLib) => {
        mdLib.use(markdownItIns);
        mdLib.use(markdownItMark);
        mdLib.use(markdownItSub);
        mdLib.use(markdownItSup);
    });

    // 11ty Settings -----------------------------------

    return {
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
    
        // If your site deploys to a subdirectory, change `pathPrefix`
        pathPrefix: '/',

        dir: {
            input: 'src',
            output: 'dist',
            data: '_data',
            includes: '_includes',
            layouts: '_layouts'
        }
    }
}
