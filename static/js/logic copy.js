
// Cerate map
var myMap = L.map("map", {
    center: [-28, 133],
    zoom: 5,
});


// Create tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

  
// Function to change the name of the key that holds the suburb name in geoData
// (original key names were different for each state) 
function formatSuburbs(suburb) {

    if (suburb.properties.hasOwnProperty('nsw_loca_2')) {
        suburb['properties']['Suburb'] = suburb['properties']['nsw_loca_2']
    } else if (suburb.properties.hasOwnProperty('act_loca_2')) {
        suburb['properties']['Suburb'] = suburb['properties']['act_loca_2']
    } else if (suburb.properties.hasOwnProperty('vic_loca_2')) {
        suburb['properties']['Suburb'] = suburb['properties']['vic_loca_2']
    } else if (suburb.properties.hasOwnProperty('qld_loca_2')) {
        suburb['properties']['Suburb'] = suburb['properties']['qld_loca_2']  
    } else if (suburb.properties.hasOwnProperty('sa_local_2')) {
        suburb['properties']['Suburb'] = suburb['properties']['sa_local_2'] 
    } else if (suburb.properties.hasOwnProperty('wa_local_2')) {
        suburb['properties']['Suburb'] = suburb['properties']['wa_local_2']
    } else if (suburb.properties.hasOwnProperty('tas_loca_2')) {
        suburb['properties']['Suburb'] = suburb['properties']['tas_loca_2']  
    } else if (suburb.properties.hasOwnProperty('nt_local_2')) {
        suburb['properties']['Suburb'] = suburb['properties']['nt_local_2']
    } else {
        console.log(suburb)
    }
    
    //Convert the suburb name to lower case for merging
    suburb.properties.Suburb = suburb.properties.Suburb.toLowerCase()
}

// Load the GeoJSON file of all australian suburbs/postcodes       
d3.json("static/data/australian-suburbs.geojson").then(function(geoData) {
    
    // Load the list of Australian post-codes 
    d3.json("static/data/australian_postcodes.json").then(function(postcodeData) {
    
        // Load the solar data (totals for 2001-2021)
        d3.json("static/data/energy.json").then(function(energyData) {

            
            // Convert the suburb name in postcode data to lower case for merging
            postcodeData.forEach(d => {
                    d.locality = d.locality.toLowerCase()
            }) 
            
            // Format the suburb names in the geoData
            L.geoJson(geoData, {
                onEachFeature: formatSuburbs
            }) 
            
            // Add the post codes to geoData
            L.geoJson(geoData, {
                filter: function(feature, layer) {
                    suburbName = feature.properties.Suburb
                    // filter postcodeData to suburbs with matching name 
                    matchedData = postcodeData.filter(d => d.locality == suburbName)
                    
                    // If match found 
                    if (matchedData.length > 0) {
                        // Iterate through results (because more than one suburb with same name)
                        // Compare latitude to determine the correct match 
                        for (var i=0; i<matchedData.length; i++) {
                            var val1 = Math.abs(feature.geometry.coordinates[0][0][1])
                            var val2 = Math.abs(matchedData[i].lat)
                            // if difference in latitude between each file < 1, match found, append the postcode 
                            if (Math.abs(val1 - val2) < 1 ){
                                feature['properties']['postcode'] = matchedData[i].postcode
                            }
                        }
                    }    
            }})

            // Add the installation numbers and power output to geoData (now matched on post code)
            L.geoJson(geoData, {
                filter: function(feature, layer) {
                    suburb = energyData.filter(d => d.postcode == feature.properties.postcode)
                    if (suburb.length > 0) {
                        feature['properties']['installations'] = suburb[0].installations
                        feature['properties']['output'] = suburb[0].output
                    } else {
                        feature['properties']['installations'] = 0 // set to 0 if postcode not in the dataset
                        feature['properties']['output'] = 0 // set to 0 if postcode not in the dataset
                    };
                },

            });
            

            // Create the choropleth map
            L.choropleth(geoData, {

                // Define what  property in the features to use
                valueProperty: "installations",
            
                // Set color scale
                scale: ["#c8ddf0", "#08306b"],
            
                // Number of breaks in step range
                steps: 7,
            
                // q for quartile, e for equidistant, k for k-means
                mode: "q",
                style: {
                  // Border color
                  color: "#fff",
                  weight: 0.5,
                  fillOpacity: 0.8
                },
                // Add a pop-op
                onEachFeature: function(feature, layer) {
                    layer.bindPopup("<strong>Suburb: </strong>" + feature.properties.Suburb.charAt(0).toUpperCase() + feature.properties.Suburb.substring(1) + "<br>" +
                                    "<strong>Postcode: </strong>" + feature.properties.postcode);
                  }
            
              }).addTo(myMap)


        })
    })
})


        
        

    
 

  