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
            groupid: parseInt(parts[0]),
            slot: parseInt(parts[1]),
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
    data["objectives"] = [];

    const lines = content.split('\r\n');
    const uniqueEntries = new Map();

    lines.forEach(line => {
        const parts = line.split(',');
        const entry = {
            id: parseInt(parts[0]),
            objective: parts[1],
            value: parseInt(parts[2])
        };
        const key = `${entry.id}-${entry.objective}`;
        if (!uniqueEntries.has(key)) {
            uniqueEntries.set(key, entry);
        }
    });

    data["objectives"] = Array.from(uniqueEntries.values());
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
    data["settings"] = [];

    // Define arrays for text and numeric tags
    const textTags = [
        'comp_type', 'rule_bookings', 'rule_offsides', 'rule_injuries', 'match_stagetype',
        'match_matchsituation', 'match_endruleleague', 'match_endruleko1leg', 'match_endruleko2leg1',
        'match_endruleko2leg2', 'match_endrulefriendly', 'standings_sort', 'schedule_seasonstartmonth',
        'is_women_competition', 'rule_allowadditionalsub', 'advance_pointskeeprounding',
        'match_celebrationlevel', 'schedule_matchup_behavior', 'standings_use_shadow_table', 
        'schedule_push_jan_season_year', 'rule_fixedmatchesdates', 'match_canusefancards', 'schedule_year_real_version',
        'rule_bookings', 'rule_offsides', 'rule_injuries', 'rule_allowadditionalsub', 'schedule_internationaldependency'
    ];

    content.split('\r\n').forEach(line => {
        let parts = line.split(',');
        let id = parseInt(parts[0]);
        let tag = parts[1];
        let value = parts[2];

        // Determine if the tag requires text or numeric value
        if (textTags.includes(tag)) {
            data["settings"].push({
                id: id,
                tag: tag,
                value: value
            });
        } else {
            data["settings"].push({
                id: id,
                tag: tag,
                value: parseInt(value)
            });
        }
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
            param1: parseInt(parts[3]),
            param2: parseInt(parts[4]),
            param3: parseInt(parts[5]),
            param4: parseInt(parts[6])
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