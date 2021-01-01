// import Parser from 'rss-parser';
// import dateFormat from 'dateformat';

const Parser = require('../../node_modules/rss-parser/dist/rss-parser');
const dateFormat = require('../../node_modules/dateformat/lib/dateformat');

let parser = new Parser();

export async function feed(url) {
    const channel = await parser.parseURL(url);
    return channel.items.map(item => item.pubDate);
}

export function transform(date) {
    return dateFormat(date, "yyyy-mm");
}

export function groupBy(dates) {
    let result = [];
    result = dates.reduce((res, value) => {
        if (!res[value]) {
            res[value] = {
                date: value,
                count: 0,

            }
            result.push(res[value])
        }
        res[value].count++;
        return res;
    }, {});

    return (Object.values(result) || []).sort((a, b) => {
        return b.date.replace("-", "") - a.date.replace("-", "");
    });
}

export async function analyze(url) {
    const dates = await feed(url);
    const dateCounts = groupBy(dates.map(date => transform(date)));

}

