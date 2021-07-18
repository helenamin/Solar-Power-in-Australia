//Define api urls
var state_url = `/api/v1.0/state`

// Initializes the page with a default plot
function init() {

    d3.json(state_url).then(function(data) {

        // // Test json data
        console.log(data);



        state_ins ={}
        state_out ={}
        state_ins_cum ={}
        state_out_cum ={}

        data.forEach(st => {
            ins_his = [];
            out_his =[];
            ins_cum_his = [];
            out_cum_his =[];
            ins = 0;
            out = 0;
            ins_years = st.install.years;
            out_years = st.output.years;
            years = Object.keys(st.install.years);

            for (key in ins_years){
                ins_his.push(ins_years[key]);
                out_his.push(out_years[key]);
                ins += ins_years[key];
                out += out_years[key];
                // console.log(ins)
                ins_cum_his.push(ins);
                out_cum_his.push(out);
            }

            state_ins[st.state] = ins_his
            state_out[st.state] = out_his

            state_ins_cum[st.state] = ins_cum_his
            state_out_cum[st.state] = out_cum_his

        })

        console.log(years)

        for (i=0;i<years.length;i++){
            years[i] = parseInt(years[i]);
        }

        console.log(state_ins_cum);
        console.log(state_out);

        console.log(years)
     
        console.log(state_ins.ACT);
       
        buildLinePlot(years,state_ins_cum,"cumulative Installation");

        buildLinePlot(years,state_out_cum,"Output");

    });
    
}


// Plot the line chart
function buildLinePlot(years,state_data,data_type){  
    var act_trace = {
        x: years,
        y: state_data.ACT,
        mode : 'lines',
        name: 'ACT'
    };
    
    var nsw_trace = {
        x: years,
        y: state_data.NSW,
        mode: 'lines',
        name: 'NSW'
    };

    var nt_trace = {
        x: years,
        y: state_data.NT,
        mode: 'lines',
        name: 'NT'
    };
    
    var qld_trace = {
        x: years,
        y: state_data.QLD,
        mode: 'lines',
        name: 'QLD'
    };

    var sa_trace = {
        x: years,
        y: state_data.SA,
        mode: 'lines',
        name: 'SA'
    };

    var tas_trace = {
        x: years,
        y: state_data.TAS,
        mode: 'lines',
        name: 'TAS'
    };

    var vic_trace = {
        x: years,
        y: state_data.VIC,
        mode: 'lines',
        name: 'VIC'
    };

    var wa_trace = {
        x: years,
        y: state_data.WA,
        mode: 'lines',
        name: 'WA'
    };

    var national_trace = {
        x: years,
        y: state_data.National,
        mode: 'lines',
        name: 'National'
    };

    var data = [act_trace, nsw_trace, nt_trace, qld_trace, sa_trace, tas_trace, vic_trace, wa_trace,national_trace];

    var layout = {
        title:`States comparison on ${data_type} over years`
      };

    Plotly.newPlot(`${data_type} line chart`,data, layout);
}




init();