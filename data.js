let data={};

function builddata() {
    const filesArray = Object.keys(filesContent).map(key => ({
        filename: key,
        content: filesContent[key]
    }));

    console.log("Files Found: ", filesArray);

    filesArray.forEach(file => {
        
        switch(file.filename) {
            case "advancement.txt":
            buildadvancementdata(file.content);
            break;
            case "compobj.txt":
            buildcompobjdata(file.content);
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

function buildcompobjdata(content) {console.log(content);
    data["compobj"] = [];

    let lines = content.split(/\r?\n/);console.log(lines);

    lines.forEach(line => {
        let parts = line.split(',');

        // Convert to integers and check for null or NaN values
        let parsedLine = parseInt(parts[0]);
        let parsedLevel = parseInt(parts[1]);
        let parsedParent = parseInt(parts[4]);

        // Only add to data if all required fields are not null or NaN
        if (!isNaN(parsedLine) && !isNaN(parsedLevel) && !isNaN(parsedParent) && parts[2] !== undefined && parts[3] !== undefined) {
            data["compobj"].push({
                line: parsedLine,
                level: parsedLevel,
                shortname: parts[2] || '', // Default to empty string if undefined
                longname: parts[3] || '',  // Default to empty string if undefined
                parent: parsedParent
            });
        }
    });
}

function buildadvancementdata(content) {
    data["advancement"] = [];

    let lines = content.split(/\r?\n/);
    lines.forEach(line => {
        let parts = line.split(',');

        // Convert to integers and check for null or NaN values
        let parsedGroupId = parseInt(parts[0]);
        let parsedSlot = parseInt(parts[1]);
        let parsedPushToCompetition = parseInt(parts[2]);
        let parsedPushToPosition = parseInt(parts[3]);

        // Only add to data if all fields are valid numbers
        if (!isNaN(parsedGroupId) && !isNaN(parsedSlot) && !isNaN(parsedPushToCompetition) && !isNaN(parsedPushToPosition)) {
            data["advancement"].push({
                groupid: parsedGroupId,
                slot: parsedSlot,
                pushtocompetition: parsedPushToCompetition,
                pushtoposition: parsedPushToPosition
            });
        }
    });
}

function buildobjectivesdata(content) {
    data["objectives"] = [];

    const lines = content.split(/\r?\n/);
    const uniqueEntries = new Map();

    lines.forEach(line => {
        const parts = line.split(',');
        const parsedId = parseInt(parts[0]);
        const parsedValue = parseInt(parts[2]);

        if (!isNaN(parsedId) && parts[1] !== undefined && !isNaN(parsedValue)) {
            const entry = {
                id: parsedId,
                objective: parts[1],
                value: parsedValue
            };
            const key = `${entry.id}-${entry.objective}`;
            if (!uniqueEntries.has(key)) {
                uniqueEntries.set(key, entry);
            }
        }
    });

    data["objectives"] = Array.from(uniqueEntries.values());
}

function buildscheduledata(content) {
    data["schedule"] = [];

    let lines = content.split(/\r?\n/);
    lines.forEach(line => {
        let parts = line.split(',');

        const parsedId = parseInt(parts[0]);
        const parsedDay = parseInt(parts[1]);
        const parsedRound = parseInt(parts[2]);
        const parsedMin = parseInt(parts[3]);
        const parsedMax = parseInt(parts[4]);
        const parsedTime = parseInt(parts[5]);

        if (!isNaN(parsedId) && !isNaN(parsedDay) && !isNaN(parsedRound) && !isNaN(parsedMin) && !isNaN(parsedMax) && !isNaN(parsedTime)) {
            data["schedule"].push({
                id: parsedId,
                day: parsedDay,
                round: parsedRound,
                min: parsedMin,
                max: parsedMax,
                time: parsedTime
            });
        }
    });
}

function buildsettingsdata(content) {
    data["settings"] = [];

    const textTags = [
        'comp_type', 'rule_bookings', 'rule_offsides', 'rule_injuries', 'match_stagetype',
        'match_matchsituation', 'match_endruleleague', 'match_endruleko1leg', 'match_endruleko2leg1',
        'match_endruleko2leg2', 'match_endrulefriendly', 'standings_sort', 'schedule_seasonstartmonth',
        'is_women_competition', 'rule_allowadditionalsub', 'advance_pointskeeprounding',
        'match_celebrationlevel', 'schedule_matchup_behavior', 'standings_use_shadow_table', 
        'schedule_push_jan_season_year', 'rule_fixedmatchesdates', 'match_canusefancards', 'schedule_year_real_version',
        'rule_bookings', 'rule_offsides', 'rule_injuries', 'rule_allowadditionalsub', 'schedule_internationaldependency'
    ];

    content.split(/\r?\n/).forEach(line => {
        let parts = line.split(',');
        let id = parseInt(parts[0]);
        let tag = parts[1];
        let value = parts[2];

        if (!isNaN(id) && tag !== undefined && value !== undefined) {
            if (textTags.includes(tag)) {
                data["settings"].push({
                    id: id,
                    tag: tag,
                    value: value
                });
            } else {
                const numericValue = parseInt(value);
                if (!isNaN(numericValue)) {
                    data["settings"].push({
                        id: id,
                        tag: tag,
                        value: numericValue
                    });
                }
            }
        }
    });
}

function buildstandingsdata(content) {
    data["standings"] = [];

    let lines = content.split(/\r?\n/);
    lines.forEach(line => {
        let parts = line.split(',');
        const parsedId = parseInt(parts[0]);
        const parsedPosition = parseInt(parts[1]);

        if (!isNaN(parsedId) && !isNaN(parsedPosition)) {
            data["standings"].push({
                id: parsedId,
                position: parsedPosition
            });
        }
    });
}

function buildtasksdata(content) {
    data["tasks"] = [];

    let lines = content.split(/\r?\n/);
    lines.forEach(line => {
        let parts = line.split(',');

        const parsedId = parseInt(parts[0]);
        const parsedParam1 = parseInt(parts[3]);
        const parsedParam2 = parseInt(parts[4]);
        const parsedParam3 = parseInt(parts[5]);
        const parsedParam4 = parseInt(parts[6]);

        if (!isNaN(parsedId) && parts[1] !== undefined && parts[2] !== undefined && 
            !isNaN(parsedParam1) && !isNaN(parsedParam2) && !isNaN(parsedParam3) && !isNaN(parsedParam4)) {
            data["tasks"].push({
                id: parsedId,
                when: parts[1],
                description: parts[2],
                param1: parsedParam1,
                param2: parsedParam2,
                param3: parsedParam3,
                param4: parsedParam4
            });
        }
    });
}

function buildweatherdata(content) {
    data["weather"] = [];

    let lines = content.split(/\r?\n/);
    lines.forEach(line => {
        let parts = line.split(',');

        const parsedId = parseInt(parts[0]);
        const parsedMonth = parseInt(parts[1]);
        const parsedChanceDry = parseInt(parts[2]);
        const parsedChanceRain = parseInt(parts[3]);
        const parsedChanceSnow = parseInt(parts[4]);
        const parsedChanceOvercast = parseInt(parts[5]);
        const parsedSunset = parseInt(parts[6]);
        const parsedNighttime = parseInt(parts[7]);

        if (!isNaN(parsedId) && !isNaN(parsedMonth) && !isNaN(parsedChanceDry) && !isNaN(parsedChanceRain) &&
            !isNaN(parsedChanceSnow) && !isNaN(parsedChanceOvercast) && !isNaN(parsedSunset) && !isNaN(parsedNighttime)) {
            data["weather"].push({
                id: parsedId,
                month: parsedMonth,
                chancedry: parsedChanceDry,
                chancerain: parsedChanceRain,
                chancesnow: parsedChanceSnow,
                chanceovercast: parsedChanceOvercast,
                sunset: parsedSunset,
                nighttime: parsedNighttime
            });
        }
    });
}
