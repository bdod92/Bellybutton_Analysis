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
    buildCharts(firstSample);
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

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function. sample is the id# being sent into optionChanged from index.html
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => parseInt(sampleObj.id) == sample);
    console.log(resultArray);
    //  5. Create a variable that holds the first sample in the array.
    var result = resultArray[0];
    console.log(result);
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    let otu_ids = result.otu_ids;

    let otu_labels = result.otu_labels;

    let sample_values = result.sample_values;

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    let topTenOtus = otu_ids.slice(0,10).map(otu_id => otu_id.toString());
    let topTenSamples = sample_values.slice(0,10);
    console.log(topTenOtus);
    console.log(topTenSamples);

    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: topTenSamples,
      y: topTenOtus,
      type: 'bar',
      orientation: 'h'
    }];

    // 9. Create the layout for the bar chart. 
    var barLayout = {};
     
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData);
  });
}

// var eyeColor = ["Brown", "Brown", "Brown", "Brown", "Brown",
//   "Brown", "Brown", "Brown", "Green", "Green",
//   "Green", "Green", "Green", "Blue", "Blue",
//   "Blue", "Blue", "Blue", "Blue"];
// var eyeFlicker = [26.8, 27.9, 23.7, 25, 26.3, 24.8,
//   25.7, 24.5, 26.4, 24.2, 28, 26.9,
//   29.1, 25.7, 27.2, 29.9, 28.5, 29.4, 28.3];

// // Create the Trace
// var trace1 = {
//   x: eyeColor,
//   y: eyeFlicker,
//   type: "bar"
// };

// // Create the data array for the plot
// var data = [trace1];

// // Define the plot layout
// var layout = {
//   title: "Eye Color vs Flicker",
//   xaxis: { title: "Eye Color" },
//   yaxis: { title: "Flicker Frequency" }
// };

// // Plot the chart to a div tag with id "bar-plot"
