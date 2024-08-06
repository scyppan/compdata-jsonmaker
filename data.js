let data={};

function builddata() {
    const filesArray = Object.keys(filesContent).map(key => ({
        filename: key,
        content: filesContent[key]
    }));

    console.log("Files Found: ", filesArray);

    filesArray.forEach(file => {

        // 10 files matter
        
        switch(file.filename) {
            case "advancement.txt":
            buildadvancementdata(file.content);
            break;
            case "compids.txt":
            buildcompidsdata(file.content);
            break;
            case "compobj.txt":
            buildcompobjdata(file.content);
            break;
            case "initteams.txt":
            buildinitteamsdata(file.content);
            break;
            case "objectives.txt":
            buildobjectivesdata(file.content);
            break;
            case "schedule.txt":
            buildscheduledata(file.content);
            break;
            case "settings.txt":
            buildsettingsdata(file.content);
            break;
            case "standings.txt":
            buildstandingsdata(file.content);
            break;
            case "tasks.txt":
            buildtasksdata(file.content);
            break;
            case "weather.txt":
            buildweatherdata(file.content);
            break;

            default:break;
        }
    });

    console.log("Final Data", data);
    document.getElementById('downloadjsonbtn').classList.remove('hidden');
}

function buildcompobjdata(content){

    data["compobj"]=[]

    let lines = content.split('\r\n');
    lines.forEach(line=>{
        let parts=line.split(',');
        data["compobj"].push({
            line: parseInt(parts[0]),
            level: parseInt(parts[1]),
            shortname: parts[2] || '',
            longname: parts[3] || '',
            parent: parseInt(parts[4])
        })
    });
}

function buildadvancementdata(content){

    data["advancement"]=[]

    let lines = content.split('\r\n');
    lines.forEach(line=>{
        let parts=line.split(',');
        data["advancement"].push({
            pullfromcompetition: parseInt(parts[0]),
            pullfromposition: parseInt(parts[1]),
            pushtocompetition: parseInt(parts[2]),
            pushtoposition: parseInt(parts[3])
        })
    });
}

function buildcompidsdata(content) {
    data["compids"] = [];

    let lines = content.split('\r\n');
    lines.forEach(line => {
        data["compids"].push({
            compid: parseInt(line)
        });
    });
}

function buildinitteamsdata(content) {

    data["initteams"]=[]

    let lines = content.split('\r\n');
    lines.forEach(line=>{
        let parts=line.split(',');
        data["initteams"].push({
            id: parseInt(parts[0]),
            finishingpos: parseInt(parts[1]),
            teamid: parseInt(parts[2])
        })
    });
}

function buildobjectivesdata(content) {

    data["objectives"]=[]

    let lines = content.split('\r\n');
    lines.forEach(line=>{
        let parts=line.split(',');
        data["objectives"].push({
            id: parseInt(parts[0]),
            objective: parts[1],
            value: parseInt(parts[2])
        })
    });
}

function buildscheduledata(content) {

    data["schedule"]=[]

    let lines = content.split('\r\n');
    lines.forEach(line=>{
        let parts=line.split(',');
        data["schedule"].push({
            id: parseInt(parts[0]),
            day: parseInt(parts[1]),
            round: parseInt(parts[2]),
            min: parseInt(parts[3]),
            max: parseInt(parts[4]),
            time: parseInt(parts[5])
        })
    });
}

function buildsettingsdata(content) {

    data["settings"]=[]

    let lines = content.split('\r\n');
    lines.forEach(line=>{
        let parts=line.split(',');
        data["settings"].push({
            id: parseInt(parts[0]),
            tag: parts[1],
            value: parseInt(parts[2]),
        })
    });
}

function buildstandingsdata(content) {

    data["standings"]=[]

    let lines = content.split('\r\n');
    lines.forEach(line=>{
        let parts=line.split(',');
        data["standings"].push({
            id: parseInt(parts[0]),
            position: parseInt(parts[1])
        })
    });
}

function buildtasksdata(content){
    data["tasks"]=[]

    let lines = content.split('\r\n');
    lines.forEach(line=>{
        let parts=line.split(',');
        data["tasks"].push({
            id: parseInt(parts[0]),
            when: parts[1],
            description: parts[2],
            group: parseInt(parts[3]),
            order: parseInt(parts[4]),
            param1: parseInt(parts[5]),
            param2: parseInt(parts[6])
        })
    });
}

function buildweatherdata(content){
    data["weather"]=[]

    let lines = content.split('\r\n');
    lines.forEach(line=>{
        let parts=line.split(',');
        data["weather"].push({
            id: parseInt(parts[0]),
            month: parseInt(parts[1]),
            chancedry: parseInt(parts[2]),
            chancerain: parseInt(parts[3]),
            chancesnow: parseInt(parts[4]),
            chanceovercast: parseInt(parts[5]),
            sunset: parseInt(parts[6]),
            nighttime: parseInt(parts[7])
        })
    });
}