const body = d3.select("body");
const divs = {
    '1': body.append('div'),
    '2': body.append('div'),
    '3': body.append('div'),
    '4': body.append('div'),
};


const SIZE_X = 500;
const SIZE_Y = 275;
const OFFSET = 90;
const margin = {top: 10, right: 10, bottom: 20, left: 20},
    width  = SIZE_X - margin.left - margin.right,
    height = SIZE_Y - margin.top - margin.bottom;

const x = d3.scaleLinear()
    .range([0, width]);

const y = d3.scaleLinear()
    .range([height, 0]);

const s = d3.formatSpecifier("f");
s.precision = d3.precisionFixed(0.01);
const f = d3.format(s);

d3.tsv("../../data/anscombe.tsv", d => ({
    dataset:     d.dataset,
    observation: d.observation,
    x: +d.x,
    y: +d.y,
})).then(function(data) {
        x.domain([0, 20]).nice();
        y.domain([0, 13]).nice();
        for(let k in divs) {
            var div = divs[k];
            div.append('p')
                .text(`data set ${k}`);

            var svg = div.append('svg')
                .attr("width", width + margin.left + margin.right + OFFSET)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            svg.selectAll('.row')
                    .data(data.filter(d => d.dataset === k))
                    .enter().append('circle')
                    .attr('class', 'row')
                    .attr('transform', d => `translate(${x(d.x)},${y(d.y)})`)
                    .attr('r', 2);

            var xAxis = d3.axisBottom(x);
            svg.append('g')
                .attr('transform', `translate(0,${y(0)})`)
                .call(xAxis.ticks(20/5).tickSize(-10));
            svg.append('g')
                .attr('transform', `translate(0,${y(0)})`)
                .call(xAxis.ticks(20/1).tickSize(-5).tickFormat(''));

            var yAxis = d3.axisLeft(y);
            svg.append('g')
                .attr('transform', `translate(${x(0)})`)
                .call(yAxis.ticks(13/5).tickSize(-10));
            svg.append('g')
                .attr('transform', `translate(${x(0)})`)
                .call(yAxis.ticks(13/1).tickSize(-5).tickFormat(''));
        }
});