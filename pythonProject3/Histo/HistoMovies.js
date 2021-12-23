//Import values from other histogram to display

const body = d3.select("body");
const divs = {
	1: body.append('div'),
	2: document.getElementById("SelectionMenu")
};


//define the size of the graph and the margin
const size_graph = {x : 1500, y : 1000},
		margin = {top:10, bot:20, right:20, left:30 },
		width = size_graph.x - margin.right - margin.left ,
		height =  size_graph.y - margin.top - margin.bot;

var s = d3.formatSpecifier("f");
s.precision = d3.precisionFixed(0.01);
var f = d3.format(s);

var x = d3.scaleLinear().range([0,width]);
//TODO Chercher pour log
var y = d3.scaleLinear().range([height,0]);


var s = d3.formatSpecifier("f");
s.precision = d3.precisionFixed(0.01);
var f = d3.format(s);

//Todo gerer couleur
var cScale = d3.scaleSequential()
	.interpolator(d3.interpolateBlues)
	.domain([0,100]);

var country= ["USA", "France"]
var genre = ["Drama", "Comedy"]
var min_year = 2005;
var max_year = 2007;


var filtrer = (d, elemAPrendre)  => {
	let to_ret = [];
	d = d.split(", ")
	for(let i =0; i < d.length; i++){
		if(elemAPrendre.indexOf(d[i]) > -1){
			to_ret.push(d[i]);
		}
	}
	return to_ret;
}





d3.tsv("../../data/metadata.tsv", d => (

	{
		country: filtrer(d.Country, country),
		genre: filtrer(d.Genre, genre),
		y: +d.Metascore,
		x: +d.Year,
		title: d.Title

	}
)).then(function(data) {
	data = data.filter(d => d.country.length > 0);
	data = data.filter(d => d.genre.length > 0);
	data = data.filter(d => !isNaN(d.x) & !isNaN(d.y));
	data = data.filter(d => d.x <= max_year);
	data = data.filter(d => d.x >= min_year);




	res = [];
	for (let i = min_year; i < max_year + 1; i++) {
		let d = data.filter(d => d.x === i);
		for (let j = 0; j < d.length; j++) {
			//TODO trier par rate
			res.push(d[j].title);
		}
	}

	x.domain([0, res.length]).nice();
	y.domain([0,100]).nice();

	var svg = divs[1]
			.append('svg')
			.attr("width", size_graph.x)
			.attr("height", size_graph.y)
			.append("g")
			.attr("transform", `translate(${margin.left},${margin.top})`)



	var xAxis = d3.axisBottom(x);
	var yAxis = d3.axisLeft(y);


	svg.append('g')
		.attr('transform', `translate(${x(0)})`)
		.call(yAxis.ticks(100/10).tickSize(5).tickFormat(''));

	svg.append('g')
		.attr('transform', `translate(0,${y(0)})`)
		.call(xAxis.ticks(res.length/10).tickSize(-5).tickFormat(''));


	let f = function (d) {
		console.log(d3.select(this))
		let d1 = d3.select(this)
		let barre = d1._groups[0][0];
		let donnees = barre.__data__;




	}

	svg.selectAll('.row')
		.data(data)
		.enter()
		.append('rect')
		.attr('transform', d => `translate(${x(res.indexOf(d.title) + 1)}, ${y(d.y)})`)
		.attr('width', size_graph.x / (2 * res.length))
		.attr('height', d => y(100-d.y))
		.attr('x', -2.5)
		.attr('class', d => d.genre)
		.on("mouseenter", f);



});
