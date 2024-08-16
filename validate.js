let filesContent = {};

const requiredFiles = [
    'advancement.txt',
    'compobj.txt',
    'objectives.txt',
    'schedule.txt',
    'settings.txt',
    'standings.txt',
    'tasks.txt',
    'weather.txt'
];

const validationRules = {
    'advancement.txt': /^\d+,\d+,\d+,\d+$/,
    'compids.txt': /^\d+$/,
    'compobj.txt': /^\d+,\d+,[^,]*,[^,]*,-?\d+$/,
    'initteams.txt': /^\d+,\d+,-?\d+$/,
    'objectives.txt': /^\d+,[A-Z_]+(?:_[A-Z_]+)*(?:_[^_]*)?,\d+$/,
    'schedule.txt': /^\d+,\d+,\d+,\d+,\d+,\d+$/,
    'settings.txt': /^\d+,[\w_]+,[\w-]+$/,
    'standings.txt': /^\d+,\d+$/,
    'tasks.txt': /^\d+,\w+,[\w_]+,\d+,\d+,\d+,\d+$/,
    'weather.txt': /^\d+,\d+,\d+,\d+,\d+,\d+,\d+,\d+,\d+$/,
};

function validateAllIndividualFiles() {
    let allValid = true;
    Object.entries(validationRules).forEach(([filename, regex]) => {
        if (!validateSpecificFile(filename, regex)) {
            const message = document.createElement('p');
            message.textContent = `${filename} file failed validation check`;
            showModal(message);
            allValid = false;
        }
    });

    if (allValid) {
        console.log('All files passed validation');
        builddata();
        //document.getElementById("downloadjsonbtn").classList.remove('hidden');
    } else {
        resetFileInput();
    }
}

function validateSpecificFile(filename, regex) {

    const fileContent = getFileContent(filename);
    if (!fileContent) return false;

    const lines = fileContent.trim().split('\n');

    for (const line of lines) {

        
        if (!regex.test(line.trim())) {
            console.log(filename, "failed", line);
            return false;
        }
    }
    console.log(filename, "worked");
    return true;
}

function validateLine(line, regex) {
    if (!regex.test(line)) {
        for (let i = 0; i < line.length; i++) {
            let subLine = line.substring(0, i + 1);
            if (!regex.test(subLine)) {
                console.log(`Validation failed at character ${i + 1}: "${line[i]}" in line "${line}"`);
                break;
            }
        }
        return false;
    }
    return true;
}

function getFileContent(fileName) {
    return filesContent[fileName.toLowerCase()] || null;
}

function validateRequiredFiles(files) {
    const fileNames = Array.from(files).map(file => file.name.trim().toLowerCase());
    const missingFiles = requiredFiles.filter(requiredFile => !fileNames.includes(requiredFile.toLowerCase()));

    if (missingFiles.length > 0) {
        const message = document.createElement('p');
        message.textContent = 'TRY AGAIN! Missing files:';

        const list = document.createElement('ul');
        missingFiles.forEach(file => {
            const listItem = document.createElement('li');
            listItem.textContent = file;
            list.appendChild(listItem);
        });

        const messageContainer = document.createElement('div');
        messageContainer.appendChild(message);
        messageContainer.appendChild(list);

        showModal(messageContainer);
        resetFileInput();
        return false;
    }
    return true;
}

function readFiles(files) {
    return new Promise((resolve, reject) => {
        const promises = Array.from(files).map(file => {
            return new Promise((resolveFile, rejectFile) => {
                const reader = new FileReader();
                reader.onload = function(event) {
                    filesContent[file.name.trim().toLowerCase()] = event.target.result;
                    resolveFile();
                };
                reader.onerror = function(error) {
                    rejectFile(error);
                };
                reader.readAsText(file);
            });
        });

        Promise.all(promises)
            .then(() => resolve())
            .catch(error => reject(error));
    });
}

function showModal(message) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modalMessage');

    let p = document.createElement('p');
    p.textContent=message;

    modalMessage.innerHTML = '';
    modalMessage.appendChild(p);
    modal.style.display = 'block';

    // Close modal on ESC key press
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

function resetFileInput() {
    const fileInput = document.getElementById('files');
    fileInput.value = '';
}

function validateAdvancement(fileContent) {
    if (!fileContent) return false;

    const lines = fileContent.trim().split('\n');
    const regex = /^\d+,\d+,\d+,\d+$/;

    for (const line of lines) {
        if (!regex.test(line.trim())) {
            return false;
        }
    }
    return true;
}

document.getElementById('files').addEventListener('change', function(event) {
    const files = event.target.files;
    if (validateRequiredFiles(files)) {
        readFiles(files)
            .then(() => {
                validateAllIndividualFiles();
            })
            .catch(error => {
                console.error('Error reading files:', error);
            });
    }
});

document.getElementById('closeModal').addEventListener('click', closeModal);
