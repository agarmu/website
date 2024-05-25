import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function GET(context) {
    return rss({
      title: 'Mukul\'s Blog',
      description: 'Mukul Agarwal\'s Personal Blog',
      site: context.site + "/posts/",
      items: await pagesGlobToRssItems(import.meta.glob('./*.md')),
      customData: `<language>en-us</language>`,
    });
  }