//Define api urls
var install_url = `/api/v1.0/install`
var rebate_url = `/api/v1.0/rebate`
var suburbs_url = `/api/v1.0/suburbs`
var income_url = `/api/v1.0/income`
// var output_url = `/api/v1.0/output`




// Initializes the page with a default plot
function init() {

    d3.json(install_url).then(function(ins_data) {
        d3.json(rebate_url).then(function(reb_data) {
            d3.json(suburbs_url).then(function(sub_data) {
                d3.json(income_url).then(function(inc_data) {
                    //Test json data
                    console.log(ins_data);
                    console.log(reb_data);
                    console.log(sub_data);
                    console.log(inc_data);

                    // buildPlot(data);
                });
            });
        });
    });
    
}


// // Plot the bubble chart
// function buildPlot(data){  

// }


init();