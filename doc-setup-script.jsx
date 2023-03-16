try {
  function PDFSaver() {
    var doc = app.activeDocument;

    // Set the color mode to CMYK
    doc.documentColorSpace = DocumentColorSpace.CMYK;
    app.executeMenuCommand("doc-color-cmyk");
    alert("Color mode set to CMYK");

    // Save the file in its original format
    doc.save();
    alert("File saved in original format");

    // Export the document to PDF
    var pdfFile = new File(
      doc.fullName.toString().replace(/\.[^\.]+$/, "") + ".pdf"
    );
    var pdfSaveOpts = new PDFSaveOptions();
    pdfSaveOpts.pDFPreset = "[Press Quality]";
    pdfSaveOpts.preserveEditability = true;
    pdfSaveOpts.bleedLink = false;
    pdfSaveOpts.bleedOffsetRect = [30.23622, 30.23622, 30.23622, 30.23622]; // 8 milimeters on each side
    pdfSaveOpts.useDocumentBleeds = true; // This line selects the "Use Document Bleed Settings" option
    doc.saveAs(pdfFile, pdfSaveOpts);
    alert("PDF file saved");

    // Export as an EPS file with "Use Artboards" and "Include CMYK Postscript" options
    var epsFile = new File(
      doc.fullName.toString().replace(/\.[^\.]+$/, "") + ".eps"
    );
    var epsSaveOpts = new EPSSaveOptions();
    epsSaveOpts.cmykPostScript = true;
    epsSaveOpts.embedAllFonts = true;
    epsSaveOpts.includeDocumentThumbnails = true;
    epsSaveOpts.includeLinkedFiles = true;
    epsSaveOpts.saveMultipleArtboards = true;
    doc.saveAs(epsFile, epsSaveOpts);
    alert("EPS file saved");

    // Export as PNG file with 300ppi resolution
    var pngFile = new File(
      doc.fullName.toString().replace(/\.[^\.]+$/, "") + ".png"
    );
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
    alert("PNG file saved");
  }

  PDFSaver();
} catch (err) {
  alert("Error: " + err);
}
