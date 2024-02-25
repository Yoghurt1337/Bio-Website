document.addEventListener('DOMContentLoaded', function() {
  // Get references to DOM elements
  var terminalContainer = document.getElementById('terminal');
  var terminalText = document.getElementById('terminal-text');
  var videoBackground = document.getElementById('myVideo');
  var audioBackground = document.getElementById('myAudio');
  var blurredBox = document.getElementById('blurred-box');
  var closeButton = document.getElementById('close-button');
  
  // Initial terminal text content
  var terminalTextContent = [
      "User: unknown",
      "IP: Loading...",
      "System: Loading...", // System information placeholder
      "Bio Loaded",
      "Press Enter To Continue",
  ];
  var currentIndex = 0;

  // Pause background video and audio
  videoBackground.pause();
  audioBackground.pause();

  // Function to type out terminal text
  function typeWriter() {
      var line = currentIndex === 0 ? getAsciiArt() : terminalTextContent[currentIndex - 1];
      var i = 0;

      function typeChar() {
          if (i < line.length) {
              terminalText.textContent += line.charAt(i);
              i++;
              setTimeout(typeChar, 50);
          } else {
              terminalText.textContent += "\n";
              currentIndex++;
              if (currentIndex < terminalTextContent.length + 1) {
                  typeWriter();
              } else {
                  document.addEventListener('keydown', handleKeyPress);
              }
          }
      }

      typeChar();
  }

  // Handle key press event
  function handleKeyPress(event) {
      if (event.key === 'Enter') {
          // Hide terminal, play background video and audio, and show blurred box
          terminalContainer.style.display = 'none';
          videoBackground.play();
          audioBackground.play();
          blurredBox.style.display = 'block';
          document.removeEventListener('keydown', handleKeyPress);
      }
  }

  // Handle close button click event
  closeButton.addEventListener('click', function() {
      terminalContainer.style.display = 'none';
      videoBackground.play();
      audioBackground.play();
      blurredBox.style.display = 'block';
  });

  // Fetch IP address using API
  fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
          var ipAddress = data.ip;
          terminalTextContent[1] = "IP: " + ipAddress;
          typeWriter();
      })
      .catch(error => {
          console.error('Error fetching IP address:', error);
          terminalTextContent[1] = "IP: Unable to fetch IP address";
          typeWriter();
      });

  // Extract system information from user agent
  var userAgent = navigator.userAgent;
  var systemInfo = userAgent.match(/Windows NT ([\d.]+)/);
  if (systemInfo) {
    // Remove "NT" and everything after "10" for Windows
    systemInfo = systemInfo[1].replace(/NT.*|10.0.*/g, '10');
    terminalTextContent[2] = "System: Windows " + systemInfo;
  } else if (userAgent.includes('Linux')) {
    // Set system information to Linux if detected
    terminalTextContent[2] = "System: Linux";
  } else {
    // Default to "Unknown" if system information cannot be determined
    terminalTextContent[2] = "System: Unknown";
  }

  // Center the terminal window on the screen
  var terminalWidth = terminalContainer.offsetWidth;
  var terminalHeight = terminalContainer.offsetHeight;
  var centerX = (window.innerWidth - terminalWidth) / 2;
  var centerY = (window.innerHeight - terminalHeight) / 2;

  terminalContainer.style.position = 'absolute'; 
  terminalContainer.style.left = centerX + 'px';
  terminalContainer.style.top = centerY + 'px';

  // Center the ASCII art within the terminal window
  terminalText.style.textAlign = 'center';

  // Function to generate ASCII art
  function getAsciiArt() {
      return `
      ███████╗██████╗ 
      ██╔════╝╚════██╗
      ███████╗ █████╔╝
      ╚════██║██╔═══╝ 
      ███████║███████╗
      ╚══════╝╚══════╝
                      
    `;
  }
    // Get the audio element
    var audio = document.getElementById("myAudio");

    // Set the maximum volume level (between 0 and 1)
    var maxVolume = 0.1; // Adjust this value as needed
  
    // Function to limit the volume
    function limitVolume(volume) {
      if (volume > maxVolume) {
        audio.volume = maxVolume; // Set volume to the maximum allowed
      } else {
        audio.volume = volume; // Set volume to the provided value
      }
    }
  
    // Example usage:
    // Set volume to 0.7 (will be limited to maxVolume)
    limitVolume(0.1);
});
