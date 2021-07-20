function callf(){
  var postcode=document.getElementById("search").value;
  psearch(postcode);
  // barplot(postcode);
  barplot2(postcode);
  search2(postcode)
  console.log(postcode);
  return postcode;
  }

console.log(callf);
psearch(callf)

// Load data from json

function psearch(postcode2){
// console.log(postcode2);
var p=postcode2;
// console.log(p);

 d3.json("/api/v1.0/rdata").then(function(mydata) {

    var filtercitydata = mydata.filter(function(d, i) 
    { 

      if( d["postcode"] == postcode2)
      {
        return d; 
       
      } 
});

doupdate(filtercitydata);

// Postcode Details
function doupdate(filterdata){
  // console.log(filterdata);
  d3.select("tbody1")
  .selectAll("tr")
  .data(filterdata)
  .enter()
  .append("tr")
  .html(function(d) 
  {
    return `<tr><b>Postcode:</b> ${d.postcode}</tr><br>
            <tr><b>Installation Total:</b> ${d.ins_total}</tr><br>
            <tr><b>Installation Average:</b> ${d.ins_avg}</tr><br>
            <tr><b>Output Total:</b> ${d.out_total}</tr><br>
            <tr><b>Output Average:</b> ${d.out_avg}</tr><br>
            <tr><b>Suburb:</b> ${d.suburb}</tr><br>
            <tr><b>State:</b> ${d.state}</tr>`;
  });
  }

});

}

function barplot(plotdata){
  console.log(plotdata);
  d3.json("/api/v1.0/rdata").then(function(mydata2) {

    var idata1 = d3.nest()
    .rollup(function(v) { return d3.sum(v, function(d) { return d.ins_total; }); })
    .entries(mydata2);
    console.log(idata1);

    var idata2 = d3.nest()
    .rollup(function(v) { return d3.sum(v, function(d) { return d.ins_avg; }); })
    .entries(mydata2);
    console.log(idata2);
 


    plot1 = "2000"
    
    // var plot1 = document.getElementById("search").value;
    
    // console.log(plot1);
    var plot1filter = mydata2.filter(function(d, i) 
    { 

      if( d["postcode"] == plot1)
      {
        console.log(d);
        var data1 = [
        {group: "Total Installation", value: d.ins_total},
        {group: "Average Installation", value: d.ins_avg},
        {group: "State Total Install", value: idata1/10000},
        {group: "State Average Install", value: idata2/100}
];
        // console.log(data1);
        update(data1);
        return data1; 
      } 
});
});
}

function barplot2(plotdata){
  // console.log(plotdata);
  d3.json("/api/v1.0/rdata").then(function(mydata3) {

    var odata1 = d3.nest()
    .rollup(function(v) { return d3.sum(v, function(d) { return d.out_total; }); })
    .entries(mydata3);
    console.log(odata1);

    var odata2 = d3.nest()
    .rollup(function(v) { return d3.sum(v, function(d) { return d.out_avg; }); })
    .entries(mydata3);
    console.log(odata2);

    var plot2 = document.getElementById("search").value;
    console.log(plot2);
    var plot2filter = mydata3.filter(function(d, i) 
    { 

      if( d["postcode"] == plotdata)
      {
        // console.log(d.ins_avg);
        var data2 = [
          {group: "Total Ouput", value: d.out_total},
          {group: "Average Output", value: d.out_avg},
          {group: "State Total Output", value: odata1/1000},
          {group: "State Average Output", value: odata2/100}
        ];
        // console.log(data2);
        update(data2);
        return data2; 
        
      } 
});
});

}



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
// console.log(data)
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
barplot();

function search2(postcode){
  console.log(value);
  d3.json("/api/v1.0/rdata").then(function(mydata3) {

  $('#search').on('keyup', function(){
    var value = postcode;
    console.log(value);

    // var data = searchtable(value, myArray)
    // buildtable(data)
  });
  
  // buildtable(myArray);
  
  // function searchtable(value, data){
  //   var filterdata = []
  
  //   for (var i =0; i < data.length; i++){
  //       value = value.toLowerCase()
  //       var name = data[i].postcode.toLowerCase()
  
  //       if (name.includes(value)){
  //           filterdata.push(data[i])
  //       }
  //   }
  //   return filterdata
  // }
  
  // function buildtable(data){
  // var table = document.getElementById('myTable')
  // table.innerHTML = ''
  // for (var i = 0; i < data.length; i++){
  //   var colname = `name-${i}`
  //   var colage = `age-${i}`
  //   var colbirth = `birth-${i}`
  
  //   var row = `<tr><b>Postcode:</b>${data[i].age}</tr><br>
  //              <tr><b>Installation Total:</b>${data[i].name}</tr>`
  //   table.innerHTML += row
  // }
  // }

});
}



