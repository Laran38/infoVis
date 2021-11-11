const body = d3.select("body");
const divs = {
	1: body.append('div'),
	2: body.append('div')

};
//define the size of the graph and the margin
const size_graph = {x : 700, y : 700},
		margin = {top:10, bot:20, right:20, left:30 },
		width = size_graph.x - margin.right - margin.left ,
		height =  size_graph.y - margin.top - margin.bot;

var s = d3.formatSpecifier("f");
s.precision = d3.precisionFixed(0.01);
var f = d3.format(s);

var x = d3.scaleLinear().range([0,width]);
var y = d3.scaleLinear().range([height,0]);



//Set the size of the legend,
const LEGEND_X = 300;
const LEGEND_Y = size_graph.y;



var s = d3.formatSpecifier("f");
s.precision = d3.precisionFixed(0.01);
var f = d3.format(s);


var cScale = d3.scaleSequential()
	.interpolator(d3.interpolateBlues)
	.domain([1970,1981]);

d3.tsv("../../data/cars.tsv", d => (
	{
		name:   d.name,
		year:  +d.year,
		origin: d.origin,
		y : +d.mpg,
		x : +d.weight,
	}
)).then(function(data) {
	//Set the maximal value of X and Y
	var MAX_X = d3.max(data, d => d.x);
	var MAX_Y = d3.max(data, d => d.y);
	x.domain([0, MAX_X]).nice();
	y.domain([0, MAX_Y]).nice();
	//Split the page in to part, the graph and his legend
	var div_graph = divs[1];
	var div_legend = divs[2];

	//Filter the data to have European, american and japans cars
	const euro = data.filter(d => d.origin === "Europe");
	const japan = data.filter(d => d.origin === "Japan");
	const usa = data.filter(d => d.origin === "USA");

	//Size of our element
	const size = 20

	const make_cross = (svg) => svg.attr('d', 'M -4 0 L 4 0 M 0 -4 L 0 4 ');
	const make_circle = (svg) => svg.attr('r', size/4).attr('class', 'empty');
	const make_square = (svg) => svg.attr('x', -2.5).attr('y', -2.5).attr('width', size/2).attr('height', size/2).attr('class', 'empty');

	//Creating our first svg elemnt for the graph
	var svg = div_graph.
				append('svg').
				attr("width", size_graph.x).
				attr("height", size_graph.y).
				append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

	//Function to add items in our graph with the svg element, the data and the form
	const add_item = (svg, data, form) => {
		svg = svg.selectAll('.row')
				.data(data)
				.enter()
				.append(form)
				.attr('transform', d => `translate(${x(d.x)}, ${y(d.y)})`)
				.attr('stroke', d => cScale(d.year))
		return svg;

	};



	//Put the form in our graph, here circle for euro, square for japan, and cross for USA
	make_circle(add_item(svg, euro, 'circle'));

	make_square(add_item(svg, japan, 'rect'));

	make_cross(add_item(svg, usa, 'path'));


	//Draw the graph
	var xAxis = d3.axisBottom(x);
	var	yAxis = d3.axisLeft(y);

	svg.append('g').
		attr('transform', `translate(${x(0)})`).
		call(yAxis.ticks(MAX_Y/5).tickSize(-10));

	svg.append('g').
			attr('transform', `translate(0, ${y(0)})`).
			call(xAxis.ticks(MAX_X/500).tickSize(-10));


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/*
		Here we draw the legends
	 */

	//Create the svg element
	var svg2 = div_legend.append('div')
		.append('svg')
		.attr('width', LEGEND_X)
		.attr('height', LEGEND_Y);

	//Set the countries
	var countries = ['Japan', 'Europe', 'USA' ];

	//Create an array for all dates
	var nb_date = 11;
	var date = [...Array(nb_date + 1).keys()].map(i => i + 1970);

	//adding an offset to control the distance between the graph and the legend
	var offset = 100;


	//Draw the form for the countries
	make_square(svg2.selectAll().data([1]).enter().append('rect')).attr('x', `${offset}px`).attr("y", 95).attr('stroke', 'black');
	svg2.selectAll().data([1]).enter().append('path').attr('d', `M 100 150 L 110 150 M 105 145 L 105 155 `).attr('stroke', 'black');
	make_circle(svg2.selectAll().data([1]).enter().append('circle')).attr('cx', 100 + size/4).attr('cy', 115 + size/2).attr('stroke', 'black');


	//Draw the blue squares for the date, 100px above the countries
	svg2.selectAll()
  			.data(date)
			.enter()
			.append("rect")
			.attr("x", 100)
			.attr("y", function(d,i){ return offset + 100 + 3 * size + i*(size+5)})
			.attr("width", size)
			.attr("height", size)
			.attr('fill', d =>  cScale(d));

	//Write the text of the legend
	svg2.selectAll()
		  .data(countries.concat(date))
		  .enter()
		  .append("text")
			.attr("x", 100 + 2*size)
			.attr("y", function(d,i){ return offset + i*(size+5) + (i > 2) * 100} )
			.text(function(d){ return d})
			.attr("text-anchor", "left")
			.style("alignment-baseline", "middle")

});
