// calculate the time to read of a chunk of text (to the nearest minute)
// based on https://www.bobmonsour.com/posts/calculating-reading-time/
import nunjucks from 'nunjucks';
nunjucks.configure({ autoescape: true });

export default function readingTime(text) {
    const content = String(text);
    const speed = 240; // reading speed in words per minute

    // remove all html elements
    const re = /(<.*?>)|(<[^>]+>)/gi;
    let plain = content.replace(re, "");

    // replace all newlines and 's with spaces
    plain = plain.replace(/\s+|'s/g, " ");

    // create array of all the words in the post & count them
    const words = plain.split(" ");
    const count = words.length;

    // calculate the reading time
    const readingTime = Math.round(count / speed);
    if (readingTime === 0) {
        return this.ctx.translations[this.page.lang || this.ctx.lang].readingTime.underMinute;
    } else if (readingTime === 1) {
        return this.ctx.translations[this.page.lang || this.ctx.lang].readingTime.minute;
    } else {
        return nunjucks.renderString(this.ctx.translations[this.page.lang || this.ctx.lang].readingTime.other, { minutes: readingTime});
    }
}

