
let histoMovie = function (){
		//Import values from other histogram to display
	let elem = get_elem_form();
	let min_year = elem.min_year;
	let max_year = elem.max_year;
	let ranking = elem.ranking;

	let nbFilms = elem.nbFilms;

	let k = document.getElementById("histogram");
	if(k)
		k.remove();

	k = document.getElementById("finalPanel");
	if(k)
		k.remove();

	const body = d3.select("body");
	const divs = {
		1: body.append('div').attr('id', "histogram"),
	};
	 //document.getElementById("histogram").style.position = "absolute";

	//define the size of the graph and the margin
	const size_graph = {x : 950, y : 500},
			margin = {top:50, bot:10, right:50, left:50 },
			width = size_graph.x - margin.right - margin.left ,
			height =  size_graph.y - margin.top - margin.bot;

	var s = d3.formatSpecifier("f");
	s.precision = d3.precisionFixed(0.01);
	var f = d3.format(s);

	var x = d3.scaleLinear().range([0,width]);
	var y = d3.scaleLinear().range([height,0]);

	d3.tsv("../Data/metadata.tsv", (function (d) {
		return {
			country: filtrer(d.Country, country),
			genre: filtrer(d.Genre, genre),
			poster: d.Poster,
			y: (ranking === "Metadata" ? +d.Metascore : (+d.imdbRating * 10)) ,
			x: +d.Year,
			title: d.Title,
			release: d.Released,
			runtime: d.Runtime,
			actors: d.Actors,
			awards: d.Awards,

		};
	})).then(function(data) {
		data = data.filter(d => d.country.length > 0);
		data = data.filter(d => d.genre.length > 0);
		data = data.filter(d => !isNaN(d.x) & !isNaN(d.y));
		data = data.filter(d => d.x <= +max_year);
		data = data.filter(d => d.x >= +min_year);

		var svg = divs[1]
			.append('svg')
			.attr("width", size_graph.x)
			.attr("height", size_graph.y)


		let rating = {}
		for(let index in data){

			let elem = data[index];
			let rate = elem.y;
			let title = elem.title;
			if (rating[rate])
				rating[rate].push(title);
			else
				rating[rate] = [title];
		}

		let res = []
		Object.keys(rating).map(function(key) {
			rating[key].forEach(titre => res.unshift(titre));

		});

		res = res.slice(0, nbFilms);

		data = data.filter(d => res.includes(d.title));

		if (data.length === 0){
			divs[1].classed("SVGErr", true);

			svg.append('text')
				.text("NOTHING TO DISPLAY")
				.classed("text", true)
				.attr("transform", `translate(${75}, ${size_graph.y / 2})`)
				.style('fill', "white");
			return;
		}


		svg = svg.append("g")
			.attr("transform", `translate(${margin.left},${margin.top})`)



		x.domain([0, res.length + 2]).nice();
		y.domain([0,100]).nice();
		var xAxis = d3.axisBottom(x);
		var yAxis = d3.axisLeft(y);

		//xAxis.style('fill', "white");

		svg.append('g')
			.attr('transform', `translate(${x(0)})`)
			.attr("color", "white")
			.call(yAxis.ticks(100/10).tickSize(5))

		svg.append('g')
			.attr('transform', `translate(0,${y(0)})`)
			.attr("color", "white")
			.call(xAxis.ticks(res.length/10).tickSize(-5).tickFormat(''))

		var SVGTitle = divs[1].append('svg')
							.attr("width", size_graph.x)
							.attr("height", size_graph.y/10)

		let scaleBar = function (d) {
			changeSize(d3.select(this)._groups[0][0], scaleW, scaleH);
			let title = d3.select(this)._groups[0][0].__data__.title
			SVGTitle.append('text')
					.attr("id", "title +" + title)
					.attr('x', x(res.indexOf(title)) + 1)
					.attr('y', size_graph.y/10 - margin.bot)
					.text(title)
					.classed("text", true)
					.style("font-size", "1vw")
					.style('fill', "white")

		}

		let scaleBarOut = function (d) {
			changeSize(d3.select(this)._groups[0][0], 1/scaleW, 1/scaleH);
			let title = d3.select(this)._groups[0][0].__data__.title;
			document.getElementById("title +" + title).remove();
		}

		let changeSize = function (elem, scaleX, scaleY){
			elem.width.baseVal.value *= scaleX;
			elem.y.baseVal.value = scaleY < 1 ? 0 : elem.height.baseVal.value * (1/scaleY - 1);
			elem.height.baseVal.value *= scaleY;
			elem.x.baseVal.value *= scaleX;
		}

		let getColor = function (dg){
			dg = dg[0];
			let index = all_genre.indexOf(dg);
			return cScale[index];
		}


		svg.selectAll('.row')
			.data(data)
			.enter()
			.append('rect')
			.attr('transform', d => `translate(${x(res.indexOf(d.title) + 1)}, ${y(d.y)})`)
			.attr('width', width / (2 * res.length))
			.attr('height', d => y(100-d.y))
			.attr('x', -2.5)
			.attr('class', 'Box')
			.style('fill', d => getColor(d.genre))
			.style('z-index', 0)
			.on("mouseup", finalPanel(size_graph))
			.on("mouseover", scaleBar)
			.on("mouseout", scaleBarOut)
		;


		svg2 = divs[1].append('svg')
			.attr("width", size_graph.x)
			.attr("height", size_graph.y/10)
			.style("background-color", '#222a41');

			svg2.append('text')
			.attr('x', size_graph.x / 2 - 100)
			.attr('y', size_graph.y/10 - margin.bot)
			.text(res.length + " movies found")
			.style("font-size", "1vw")
			.style('fill', "white")

	});

}
