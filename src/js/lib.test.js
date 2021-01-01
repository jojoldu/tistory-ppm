import {
    feed,
    transform,
    groupBy
} from "./lib";

test('tistory rss에서 발행일만 가져온다', async () => {
    const result = await feed("https://pwa-jojoldu.tistory.com/rss");

    expect(result[0]).toBe("Fri, 01 Jan 2021 14:33:54 +0900");
});

test('일자를 yyyy-MM으로 변환한다.',  () => {
    const result = transform("Fri, 01 Jan 2021 14:33:54 +0900");

    expect(result).toBe("2021-01");
});

test("월별 count가 반환된다",  () => {
    const result = groupBy(["2021-02", "2021-01", "2021-01"]);

    expect(result[0].date).toBe("2021-02");
    expect(result[0].count).toBe(1);

    expect(result[1].date).toBe("2021-01");
    expect(result[1].count).toBe(2);
});

test("월별 역순 정렬된다",  () => {
    const result = groupBy(["2021-01", "2021-01", "2021-02"]);

    expect(result[0].date).toBe("2021-02");
    expect(result[1].date).toBe("2021-01");
});