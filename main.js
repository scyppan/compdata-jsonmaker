function readFileContent(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);

        reader.readAsText(file);
    });
}

function changewindow(which) {
    let filesToJson = document.getElementById("filesToJson");
    let jsonToFiles = document.getElementById("jsonToFiles");

    if (filesToJson) filesToJson.classList.add("hidden");
    if (jsonToFiles) jsonToFiles.classList.add("hidden");

    switch(which) {
        case "filesToJson":
            if (filesToJson && filesToJson.classList.contains('hidden')) {
                filesToJson.classList.remove('hidden');
            }
            break;
        case "jsonToFiles":
            if (jsonToFiles && jsonToFiles.classList.contains('hidden')) {
                jsonToFiles.classList.remove('hidden');
            }
            break;
    }
}


