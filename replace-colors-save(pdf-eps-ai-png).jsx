try {
  function PDFSaver() {
    var doc = app.activeDocument;

    // Set the color mode to CMYK
    doc.documentColorSpace = DocumentColorSpace.CMYK;
    app.executeMenuCommand("doc-color-cmyk");
    alert("Color mode set to CMYK");

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
      // Export the document to PDF
      var pdfFile = new File(
        activeDocument.path + "/" + fileName + "_" + colorName[i] + ".pdf"
      );

      // Export as an EPS file with "Use Artboards" and "Include CMYK Postscript" options
      var epsFile = new File(
        activeDocument.path + "/" + fileName + "_" + colorName[i] + ".eps"
      );
      // Export as PNG file with 300ppi resolution
      var pngFile = new File(
        activeDocument.path + "/" + fileName + "_" + colorName[i] + ".png"
      );

      if (saveFile != null) {
        var aiSaveOpts = new IllustratorSaveOptions();
        activeDocument.saveAs(saveFile, aiSaveOpts);

        var pdfSaveOpts = new PDFSaveOptions();
        pdfSaveOpts.pDFPreset = "[Press Quality]";
        pdfSaveOpts.preserveEditability = true;
        pdfSaveOpts.bleedLink = false;
        pdfSaveOpts.bleedOffsetRect = [30.23622, 30.23622, 30.23622, 30.23622]; // 8 milimeters on each side
        pdfSaveOpts.useDocumentBleeds = true; // This line selects the "Use Document Bleed Settings" option
        doc.saveAs(pdfFile, pdfSaveOpts);

        var epsSaveOpts = new EPSSaveOptions();
        epsSaveOpts.cmykPostScript = true;
        epsSaveOpts.embedAllFonts = true;
        epsSaveOpts.includeDocumentThumbnails = true;
        epsSaveOpts.includeLinkedFiles = true;
        epsSaveOpts.saveMultipleArtboards = true;
        doc.saveAs(epsFile, epsSaveOpts);

        var pngSaveOpts = new ExportOptionsPNG24();
        pngSaveOpts.antiAliasing = true;
        pngSaveOpts.transparency = true;
        pngSaveOpts.artBoardClipping = true;
        pngSaveOpts.horizontalScale = 100.0;
        pngSaveOpts.verticalScale = 100.0;
        pngSaveOpts.matte = true;
        pngSaveOpts.matteColor = new RGBColor();
        pngSaveOpts.matteColor.red = 255;
        pngSaveOpts.matteColor.green = 255;
        pngSaveOpts.matteColor.blue = 255;
        pngSaveOpts.saveAsHTML = false;
        pngSaveOpts.PNG8 = false;
        pngSaveOpts.horizontalResolution = 300;
        pngSaveOpts.verticalResolution = 300;
        doc.exportFile(pngFile, ExportType.PNG24, pngSaveOpts);
      }
    }
  }
  alert("All colors replaced and files saved.");

  PDFSaver();
} catch (err) {
  alert("Error: " + err);
}
