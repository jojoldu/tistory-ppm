const axios = require('axios').default;
const {TistoryError} = require('./TistoryError');

export async function feed(accessToken, blogName) {
    let totalCount;
    let page = 1;
    const dates = [];
    while (true) {
        let tistory = await getPosts(accessToken, blogName, page);
        if (page === 1) {
            totalCount = tistory.totalCount;
        }

        dates.push(...tistory.dates);

        if (dates.length >= totalCount) {
            break;
        }

        page++;
    }

    return dates;
}

export async function getPosts(accessToken, blogName, page) {
    if (page < 1) {
        throw new Error(`티스토리는 1페이지부터 조회 가능합니다. request Page=${page}`);
    }
    try {
        const response = await axios.get(`https://www.tistory.com/apis/post/list?access_token=${accessToken}&output=json&blogName=${blogName}&page=${page}`);
        return {
            totalCount: Number.parseInt(response.data.tistory.item.totalCount),
            dates: response.data.tistory.item.posts.map(item => item.date)
        };
    } catch (e) {
        const status = e.response.status;
        const message = e.response.data.tistory ? e.response.data.tistory.error_message : e.response.statusText;

        console.log(`status:${status}, message=${message}`);
        throw new TistoryError(status, message);
    }
}

export function transform(dateTime) {
    return dateTime.substr(0, 7);
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

export async function analyze(accessToken, blogName) {
    const dates = await feed(accessToken, blogName);
    const countedDates = groupBy(dates.map(date => transform(date)));
    const totalCount = countedDates
        .map(x => x.count)
        .reduce((prev, next) => {
            return prev + next;
        }, 0);

    return {
        totalCount: totalCount,
        dates: countedDates
    };
}



