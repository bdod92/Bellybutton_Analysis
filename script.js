
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