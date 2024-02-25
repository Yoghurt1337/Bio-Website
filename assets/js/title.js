// Array containing different titles to cycle through
var titles = [
  "@",
  "@Y",
  "@Yo",
  "@Yog",
  "@Yogh",
  "@Yoghu",
  "@Yoghur",
  "@Yoghurt",
  "@Yoghurt 1",
  "@Yoghurt 13",
  "@Yoghurt 133",
  "@Yoghurt 1337"
];

// Function to change the title periodically
function changeTitle() {
  var index = 0; // Initialize index to start from the first title

  // Set interval to change the title every 1000 milliseconds (1 second)
  setInterval(function() {
      // Set the document title to the title at the current index
      document.title = titles[index];
      // Increment the index and use modulo operator to ensure it stays within the bounds of the array
      index = (index + 1) % titles.length;
  }, 1000); // Interval set to 1000 milliseconds (1 second)
}

// Call the function to start changing the title
changeTitle();
