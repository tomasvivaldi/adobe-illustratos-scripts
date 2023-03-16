try {
  // Replace the colors array with a list of hex colors you want to use

  var colors = {
    Red: "a50026",
    Orange: "ff5733",
    Yellow: "ffd600",
    Green: "008000",
    Blue: "003380",
    Indigo: "4b0082",
    Violet: "8b008b",
  };

  var hexColors = [];
  for (var color in colors) {
    if (colors.hasOwnProperty(color)) {
      hexColors.push(colors[color]);
    }
  }
  var colorName = [];

  for (var key in colors) {
    if (colors.hasOwnProperty(key)) {
      colorName.push(key);
    }
  }

  // Loop through each color in the array
  for (var i = 0; i < hexColors.length; i++) {
    // Convert hex color to CMYK values
    var r = parseInt(hexColors[i].substring(0, 2), 16);
    var g = parseInt(hexColors[i].substring(2, 4), 16);
    var b = parseInt(hexColors[i].substring(4, 6), 16);
    var c, m, y, k;

    // Convert RGB values to CMYK values
    c = 1 - r / 255;
    m = 1 - g / 255;
    y = 1 - b / 255;
    k = Math.min(c, m, y);
    c = (c - k) / (1 - k);
    m = (m - k) / (1 - k);
    y = (y - k) / (1 - k);

    // Loop through all page items in the document
    for (var j = 0; j < activeDocument.pageItems.length; j++) {
      var item = activeDocument.pageItems[j];

      // Check if the item has a fill color
      if (item.fillColor != null) {
        item.fillColor.cyan = c * 100;
        item.fillColor.magenta = m * 100;
        item.fillColor.yellow = y * 100;
        item.fillColor.black = k * 100;
      }

      // Check if the item has a stroke color
      if (item.strokeColor != null) {
        item.strokeColor.cyan = c * 100;
        item.strokeColor.magenta = m * 100;
        item.strokeColor.yellow = y * 100;
        item.strokeColor.black = k * 100;
      }
    }

    // Save the file with the color name as the suffix
    var fileName = activeDocument.name.replace(/\.[^\.]+$/, "");
    for (var j = 0; j < colorName.length; j++) {
      fileName = fileName.replace("_" + colorName[j], "");
    }
    var saveFile = new File(
      activeDocument.path + "/" + fileName + "_" + colorName[i] + ".ai"
    );

    if (saveFile != null) {
      var aiSaveOpts = new IllustratorSaveOptions();
      activeDocument.saveAs(saveFile, aiSaveOpts);
    }
  }
  alert("All colors replaced and files saved.");
} catch (err) {
  alert("Error: " + err);
}
