import {
    feed,
    transform,
    groupBy,
    analyze
} from "./lib";

test('일시를 yyyy-MM으로 변환한다.',  () => {
    const result = transform("2021-01-01 19:02:10");

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

test('최종 확인', async () => {
    const result = await analyze("https://jojoldu.tistory.com/rss");

    console.log(result);
});