function init() {
     // Grab a reference to the dropdown select element
     var selector = d3.select("#selDataset");
   
     // Use the list of sample names to populate the select options
     d3.json("samples.json").then((data) => {
       var sampleNames = data.names;
   
       sampleNames.forEach((sample) => {
         selector
           .append("option")
           .text(sample)
           .property("value", sample);
       });
   
       // Use the first sample from the list to build the initial plots
       var firstSample = sampleNames[0];
       //buildCharts(firstSample);
       buildMetadata(firstSample);
     });
   }
   
   // Initialize the dashboard
   init();
   

   function optionChanged(newSample) {
     // Fetch new data each time a new sample is selected
     buildMetadata(newSample);
     buildCharts(newSample);
     
   }
   
   // Demographics Panel 
   function buildMetadata(sample) {
     d3.json("samples.json").then((data) => {
       var metadata = data.metadata;
       // Filter the data for the object with the desired sample number
       var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
       var result = resultArray[0];
       // Use d3 to select the panel with id of `#sample-metadata`
       var PANEL = d3.select("#sample-metadata");
       
       PANEL.html("");
       PANEL.append("h6").text(result.location);
     });
       
   }
   