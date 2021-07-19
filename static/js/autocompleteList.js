
// const autoCompleteJS = new autoComplete({ data: {
//     src: ["Sauce - Thousand Island", "Wild Boar - Tenderloin", "Goat - Whole Cut"]
// }, });

d3.json("/api/v1.0/install").then(function(installData) {



    postcodes = installData.map(d => d.postcode.toString())
    
    var options = {
    search: input => {
      if (input.length < 1) {
        return []
      }
      return postcodes.filter(code => {
        return code.startsWith(input)
      })
    }
    }




    new Autocomplete('#autocomplete', options);



});