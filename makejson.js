function downloadDataAsJson() {
    const jsonData = JSON.stringify(data, null, 2); // Convert data to JSON string
    const blob = new Blob([jsonData], { type: 'application/json' }); // Create a blob
    const url = URL.createObjectURL(blob); // Create a URL for the blob

    // Create an anchor element and trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json'; // Set the desired file name
    document.body.appendChild(a); // Append the anchor to the document
    a.click(); // Programmatically click the anchor to trigger the download
    document.body.removeChild(a); // Remove the anchor from the document
    URL.revokeObjectURL(url); // Release the blob URL
}