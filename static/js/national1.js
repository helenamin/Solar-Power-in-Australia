//Define api urls
var state_url = `/api/v1.0/state`

//Define SVG width and hiegh and margins
var svgWidth = 1100;
var svgHeight = 700;

var margin = {
  top: 60,
  right: 40,
  bottom: 140,
  left: 100
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;


// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);


// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

function acc_install (data) {
  ins_his = [];
  ins = 0;
  ins_years = data.install.years;
  for (key in ins_years){
    ins += ins_years[key];
    ins_his.push(ins); 
  }
  return ins_his
}

function acc_output (data) {
  out_his = [];
  out = 0;
  out_years = data.output.years;
  for (key in out_years){
    out += out_years[key];
    out_his.push(out); 
  }
  return out_his
}


d3.json(state_url).then(function(state_data) {

    // // Configure a parseTime function which will return a new Date object from a string
    var parseTime = d3.timeParse("%Y");

    state_data.forEach(st => {
      // Format years
      Object.keys(st.install.years).forEach( function(d){

        d = parseTime(d);

      })
    })

    // Configure a time scale with a range between 0 and the chartWidth
    var xTimeScale = d3.scaleTime()
    .range([0, chartWidth])
    .domain([d3.min(d3.min(state_data, d => Object.keys(d.install.years))),
        d3.max(d3.max(state_data, d => Object.keys(d.install.years)))]);
    
    // ([d3.min(d3.min(state_data, d => Object.keys(d.install.years)))]);
      //   d3.max(d3.max(state_data, d => Object.keys(d.install.years)))])
    // }));

    // var xLinearScale = d3.scaleLinear()
    // .range([0, chartWidth])
    // .domain([d3.min(d3.min(state_data, d => Object.keys(d.install.years))),
    //   d3.max(d3.max(state_data, d => Object.keys(d.install.years)))]);



    console.log(d3.max(d3.max(state_data, d => Object.keys(d.install.years))));
    
    // Configure a linear scale with a range between the chartHeight and 0
    var yLinearScale = d3.scaleLinear()
    .range([chartHeight, 0])
    .domain([0, d3.max([15000,3000000])]);


    // Create two new functions passing the scales in as arguments
    // These will be used to create the chart's axes
    var bottomAxis = d3.axisBottom(xTimeScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // // Configure a drawLine function which will use our scales to plot the line's points
    var drawLine = d3
    .line()
    .x(xTimeScale(state_data, d => {
      return Object.keys(d.install.years)
    }))
    .y(yLinearScale(state_data, d => acc_install(d)));

    // // Append an SVG path and plot its points using the line function
    // chartGroup.append("path")
    // // The drawLine function returns the instructions for creating the line for milesData
    // .attr("d", drawLine(state_data))
    // .classed("line", true);

    // Append an SVG group element to the SVG area, create the left axis inside of it
    chartGroup.append("g")
    .classed("axis", true)
    .call(leftAxis);

    // Append an SVG group element to the SVG area, create the bottom axis inside of it
    // Translate the bottom axis to the bottom of the page
    chartGroup.append("g")
    .classed("axis", true)
    .attr("transform", "translate(0, " + chartHeight + ")")
    .call(bottomAxis);
}).catch(function(error) {
    console.log(error);
});
