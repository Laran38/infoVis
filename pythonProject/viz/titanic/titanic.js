
var body = d3.select("body");


var size_graph = {
	x : 1000,
	y : 800
}

var margin = {top: 20, right: 20, bottom: 40, left: 40},
    width  = size_graph.x - margin.left - margin.right,
    height = size_graph.y - margin.top - margin.bottom;




var x = d3.scaleLinear()
    .range([0, width]);

var y = d3.scaleLog()
    .range([height, 0]);


var s = d3.formatSpecifier("f");
s.precision = d3.precisionFixed(0.01);
var f = d3.format(s);




d3.tsv("../../data/titanic.tsv", d => (
	{
		dataset:     d.dataset,
		observation: d.observation,
		x: +d.age,
		y: +d.fare,
		survive: +d.survived,
		sexe : d.sex,
	}
)).then(function(data) {

		data = data.filter(d => !isNaN(d.x) & !isNaN(d.y));
		var MAX_X = d3.max(data, d => d.x);
	    var MAX_Y = d3.max(data, d => d.y);
		x.domain([1,MAX_X]).nice();
		y.domain([1,MAX_Y]).nice();

		const data_male = data.filter(d => (d.sexe === 'male'));
		const data_female = data.filter(d => (d.sexe === 'female'));

		const make_data_male = (svg, data) => {
			svg =  svg.selectAll('.row')
				.data(data)
				.enter()
				.append('rect')
				.attr('transform', d => `translate(${x(d.x)}, ${y(d.y)})`)
				.attr('width', 5)
				.attr('height', 5)
				.attr('x', -2.5)
				.attr('y', -2.5)
				.classed('alive', d => d.survive === 1)
				.classed('dead', d => d.survive === 0);
			return svg;
		}

		const make_data_female = (svg, data, style) => {
			svg =  svg.selectAll('.row')
				.data(data)
				.enter().append('circle')
				.attr('transform', d => `translate(${x(d.x)}, ${y(d.y)})`)
				.attr('r', 2.8)
				.attr('class', style);
			return svg;
		}

        var svg = body.append('div')
				.append('svg')
				.attr("width", size_graph.x)
				.attr("height", size_graph.y)
				.append("g")
				.attr("transform", `translate(${margin.left},${margin.top})`);


		make_data_male(svg, data_male);
		make_data_female(svg, data_female);



        var xAxis = d3.axisBottom(x);
        var yAxis = d3.axisLeft(y);

        svg.append('g')
            .attr('transform', `translate(0,${y(1)})`)
            .call(xAxis.ticks(MAX_X/10).tickSize(-10));

        svg.append('g')
            .attr('transform', `translate(0,${y(1)})`)
            .call(xAxis.ticks(MAX_X/2).tickSize(-5).tickFormat(''));

        svg.append('g')
            .attr('transform', `translate(${x(0)})`)
            .call(yAxis.ticks(MAX_Y/100).tickSize(10));

        svg.append('g')
            .attr('transform', `translate(${x(0)})`)
            .call(yAxis.ticks(MAX_Y/17).tickSize(5).tickFormat(''));

});



