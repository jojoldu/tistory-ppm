import {analyze} from './lib';

const el = document.getElementById("analyze");
el.addEventListener("click", render, false);

async function render() {
    const blogName = document.getElementById("blogName").value;
    const accessToken = document.getElementById("accessToken").value;
    const dateCounts = await analyze(accessToken, blogName);
    $('#table').bootstrapTable({
        pagination: true,
        search: true,
        columns: [{
            field: 'date',
            title: '월'
        }, {
            field: 'count',
            title: '발행수'
        }],
        data: dateCounts.dates
    });
}