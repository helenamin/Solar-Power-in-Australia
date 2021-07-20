//Define api urls
var data_url = `/api/v1.0/sgu`

// Initializes the page with a default plot


d3.json(data_url).then((data) => {
    console.log(data);
    var suburb_list = data.map(su => su.postcode);
    suburb_list.forEach((name) => {
    var dropdownMenu = d3.select("#selDataset");
    var newoption = dropdownMenu.append("option");
    newoption.attr('value', name);
    newoption.text(name);   
    selectedSuburb = dropdownMenu.node().value;
    console.log(selectedSuburb)
    });

});
// default value when page lands

    var defaultID = "800"
    optionChanged(defaultID);

    // function to trigger the change

    function optionChanged(selectedSuburb) {
            lineChart(selectedSuburb);
    };

// function to select the data set

    function lineChart(selectedSuburb){
        d3.json(data_url).then((data) => {
            var dropdownMenu = d3.select("#selDataset");
            selectedID = dropdownMenu.node().value;
// OUTPUT
            var sub = data.map(su => su.postcode);
            console.log(sub);
            var select_sub = data.filter(su=>su.postcode==selectedSuburb);
            console.log(select_sub);

            value = []
            var valuearray = select_sub.forEach(function(selsub){
                value.push(Object.values(selsub.output.years));
            });
            console.log(value);
        
            year = []
            var yer = select_sub.forEach(function(selsub){
                    year.push(Object.keys(selsub.output.years));
            });
            console.log(year);
// INSTALL

            value1 = []
            var valuearray = select_sub.forEach(function(selsub){
                value1.push(Object.values(selsub.install.years));
            });
            console.log(value1);
        
            year1 = []
            var yer = select_sub.forEach(function(selsub){
                    year1.push(Object.keys(selsub.install.years));
            });
            console.log(year1);

            
// plot details
        

            var trace1 = {x: year[0],y: value[0],name:"Output in KW",line:{color:'red',width:2},type: 'line'};
            var trace2 = {x: year1[0],y: value1[0],name:"Installation in numbers",line:{color:'purple',width:2},type: 'line',yaxis: 'y2'};
            
            var data = [trace1, trace2];
// plot layout
            var layout = {
                title: `Suburb ${selectedSuburb} Performance in KW & Number of installations`,
                xaxis: { title: "Year ",position: 0.1 },
                xaxis2: { title: "Year ",position: 0,overlaying: 'x' },
                legend: {x: -0.2,y: 1,traceorder: 'normal'},
                autosize: true,
                width: 600,
                height: 650,
                yaxis: { title: "Output in kW",titlefont:{color: "red"},tickfont:{color:"red"}},
                yaxis2:{title:'Installation in Numbers',
                titlefont: {color: 'rgb(148, 103, 189)'},
                tickfont: {color: 'rgb(148, 103, 189)'},
                overlaying: 'y',
                side: 'right'}
            };
            const config = {
                displayModeBar: false, 
              };
            
            Plotly.newPlot('plot1', data, layout, config);

    

    })};