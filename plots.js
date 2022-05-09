// create event listener
d3.selectAll("body").on("change", updatePage);

// change the page upon event
function updatePage() {
//   connect this to the selectOption id in index.html
  var dropdownMenu = d3.selectAll("#selectOption").node();
  
//   ID and value of selected option are stored as a variabel
  var dropdownMenuID = dropdownMenu.id;
  var selectedOption = dropdownMenu.value;

  console.log(dropdownMenuID);
  console.log(selectedOption);
};

function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
        console.log(data);
        var sampleNames = data.names;
        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });
})}
  
init();

function optionChanged(newSample) {
    buildMetadata(newSample);
    // buildCharts(newSample);
}

function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        var PANEL = d3.select("#sample-metadata");

        PANEL.html("");
        PANEL.append("h6").text("ID: " +result.id);
        PANEL.append("h6").text("Ethnicity: " + result.ethnicity);
        PANEL.append("h6").text("Gender: " + result.gender);
        PANEL.append("h6").text("Age: " + result.age);
        PANEL.append("h6").text("Location: " + result.location);
        PANEL.append("h6").text("BBType: " + result.bbtype);
        PANEL.append("h6").text("WFREQ: " + result.wfreq);
    });
}