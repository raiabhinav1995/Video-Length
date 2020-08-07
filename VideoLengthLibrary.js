 const { getVideoDurationInSeconds } = require('get-video-duration');
const fs=require('fs');
const path=require('path');
// Contributed by Me 
// Made by Rajneesh on remote session using AnyDesk.

function allMp4FilesInADirectory(pathOfDir)
{
    let mp4Files=[];
    let files=fs.readdirSync(pathOfDir, "utf8");
    files=files.sort((a,b)=>
    {
        let num1 = +a.match(/\d+/g); 
        let num2 = +b.match(/\d+/g); 
        return num1-num2;
    });
        for(let file of files){
        let fileRet=fs.readdirSync(`${pathOfDir}/${file}`).filter(f1 =>f1.endsWith('.mp4')).map(l1=>`${pathOfDir}/${file}/${l1}`);
        if(fileRet===[])continue;
        mp4Files.push(fileRet);
    }
    let mp4 = [].concat(...mp4Files);
    return mp4;
}


function returnFilesByHours(mp4Videos)
{
    let videos=[];
    let minutes=0;
    let hours=0;
    for(let i=0;i<mp4Videos.length;i++)
    {
        getVideoDurationInSeconds(mp4Videos[i]).then(data=>{
            data/=60;
            if(minutes<60)
            {
                if(i===mp4.length-1)if(i===mp4.length-1)console.log(`Total Time is ${videos.length} Hours and ${minutes.toFixed(2)} minutes`);
                minutes+=data;
                hours++;
            }
            else
            {
                videos.push(hours);
                console.log(`${videos.length} Hour reached at ${hours} video`);
                minutes=minutes-60;
                hours++;
                minutes+=data;
                if(i===mp4.length-1)console.log(`Total Time is ${videos.length} Hours and ${minutes} minutes`);
            }
        })
    }
}
mp4=allMp4FilesInADirectory('/home/abhinav/Downloads/React-Udemy');
returnFilesByHours(mp4);