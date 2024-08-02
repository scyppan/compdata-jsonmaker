// Function to read files and return their content


function handleFilesToJson(event) {
    event.preventDefault();

    const files = document.getElementById('files').files;
    const fileNames = Array.from(files).map(file => file.name);

    const missingFiles = requiredFiles.filter(requiredFile => !fileNames.includes(requiredFile));

    if (missingFiles.length > 0) {
        showModal(`Missing files: ${missingFiles.join(', ')}`);
        return;
    }

    const fileReadPromises = Array.from(files).map(file => readFileContent(file));

    Promise.all(fileReadPromises)
        .then(fileContents => {
            const jsonObject = {};

            fileContents.forEach((content, index) => {
                const fileName = files[index].name;
                jsonObject[fileName] = content;
            });

            const jsonOutput = document.getElementById('jsonOutput');
            jsonOutput.textContent = JSON.stringify(jsonObject, null, 2);
            
            downloadJson(jsonObject);
        })
        .catch(error => {
            console.error('Error reading files:', error);
        });
}

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

function downloadJson() {
    let jsonObject=filesContent;
    const now = new Date();
    const datetimeString = `${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}-${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;
    const jsonString = JSON.stringify(jsonObject, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `scyppan-${datetimeString}-compdata.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
