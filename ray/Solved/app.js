// Load data from hours-of-tv-watched.csv
d3.json("/api/v1.0/rdata").then(function(mydata) {

  function pcodesearch(pcode){
    return pcode.postcode === document.getElementById("search").value;
  }
  console.log(mydata.find(pcodesearch));

  var result = sum(mydata.ins_total);
  console.log(result);


  console.log(mydata.ins_total);
 
  mydata.forEach(function(data) {
    // data.hours = +data.hours;
    // console.log("Total Installation:", data.ins_total);
    // console.log("Average Installation:", data.ins_avg);
    // console.log("State Total Install:", data.ins_total);
    // console.log("State Total Install:", data.ins_avg);
  });
}).catch(function(error) {
  console.log(error);
});

function btnsearch(){

var postcode=document.getElementById("search").value;
// console.log(postcode);

 d3.csv("rdata.csv").then(function(mydata) {

    var filtercitydata = mydata.filter(function(d, i) 
    { 

      if( d["postcode"] == postcode)
      {
        return d; 
        console.log(d);
      } 

      

});

function pcodesearch(pcode){
  return pcode.postcode === document.getElementById("search").value;
}

console.log(mydata.find(pcodesearch));      

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
})
}

// create 2 data_set
var data1 = [
  {group: "Total Installation", value: 5},
  {group: "Average Installation", value: 15},
  {group: "State Total Install", value: 25},
  {group: "State Average Install", value: 50}
];

var data2 = [
  {group: "Output Total", value: 35},
  {group: "Output Average", value: 25},
  {group: "State Total Output", value: 15},
  {group: "State Ave Output", value: 5}
];


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
