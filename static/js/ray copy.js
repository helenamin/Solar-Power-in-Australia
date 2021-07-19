// Load data from json
function psearch(){

var postcode=document.getElementById("search").value;
// console.log(postcode);

 d3.json("/api/v1.0/rdata").then(function(mydata) {

    var filtercitydata = mydata.filter(function(d, i) 
    { 

      if( d["postcode"] == postcode)
      {
        return d ;
        // console.log(d);

      } 
    })
// console.log(mydata.ins_total)
// console.log(d.postcode)
// create 2 data_set
var data1 = [
  {group: "Total Installation", value: filtercitydata[0].ins_total},
  {group: "Average Installation", value: filtercitydata[0].ins_avg},
  {group: "State Total Install", value: filtercitydata[0].out_total},
  {group: "State Average Install", value: filtercitydata[0].out_avg}
];

var data2 = [
  {group: "Total Installation", value: filtercitydata[0].ins_total},
  {group: "Average Installation", value: filtercitydata[0].ins_avg},
  {group: "State Total Install", value: filtercitydata[0].out_total},
  {group: "State Average Install", value: filtercitydata[0].out_avg}
];


// Postcode Details
d3.select("tbody")
  .selectAll("tr")
  .data(filtercitydata)
  .enter()
  .append("tr")
  .html(function(d) {
    return `<tr><b>Postcode:</b> ${d.postcode}</tr><br>
            <tr><b>Installation Total:</b> ${d.ins_total}</tr><br>
            <tr><b>Installation Average:</b> ${d.ins_avg}</tr><br>
            <tr><b>Output Total:</b> ${d.out_total}</tr><br>
            <tr><b>Output Average:</b> ${d.out_avg}</tr><br>
            <tr><b>Suburb:</b> ${d.suburb}</tr><br>
            <tr><b>State:</b> ${d.state}</tr>`;
  });


// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Initialize the X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .padding(0.2);
var xAxis = svg.append("g")
  .attr("transform", "translate(0," + height + ")")

// Initialize the Y axis
var y = d3.scaleLinear()
  .range([ height, 0]);
var yAxis = svg.append("g")
  .attr("class", "myYaxis")



// A function that create / update the plot for a given variable:
function update(data) {

  // Update the X axis
  x.domain(data.map(function(d) { return d.group; }))
  xAxis.call(d3.axisBottom(x))

  // Update the Y axis
  y.domain([0, d3.max(data, function(d) { return d.value }) ]);
  yAxis.transition().duration(1000).call(d3.axisLeft(y));

  // Create the u variable
  var u = svg.selectAll("rect")
    .data(data)

  u
    .enter()
    .append("rect") // Add a new rect for each new elements
    .merge(u) // get the already existing elements as well
    .transition() // and apply changes to all of them
    .duration(1000)
      .attr("x", function(d) { return x(d.group); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", "#69b3a2")

  // If less group in the new dataset, I delete the ones not in use anymore
  u
    .exit()
    .remove()
}

// Initialize the plot with the first dataset
update(data1)

});
}