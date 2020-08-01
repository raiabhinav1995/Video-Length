 const { getVideoDurationInSeconds } = require('get-video-duration');
const fs=require('fs');
const path=require('path');
// Contributed by Me 
// Made by Rajneesh on remote session using AnyDesk.

function allMp4FilesInADirectory(pathOfDir)
{ let mp4Files=[];
    let emptiness=[];
    let files=fs.readdirSync(pathOfDir, "utf8");
    files=files.sort((a,b)=>
    {
        let num1 = +a.match(/\d+/g); 
        let num2 = +b.match(/\d+/g); 
        return num1-num2;
    });
    // console.log(files);
    //matches = str.match(/\d+/g); 
    for(let file of files){
        // console.log(file)
        mp4Files.push(fs.readdirSync(`${pathOfDir}/${file}`).filter(f1 =>f1.endsWith('.mp4')).map(l1=>`${pathOfDir}/${file}/${l1}`));
    }
    for(let m1 of mp4Files)
    {
        for(let m2 of m1)
        {
            // console.log(m2);
            emptiness.push(m2);
        }
    }
    // console.log(emptiness);
return totalLength(emptiness);
}

function totalLength(emptiness)
{
    let length=0;
    // console.log(emptiness);
    for(let video of emptiness)
    {
        //console.log(index, video);
        getVideoDurationInSeconds(video).then(len=>{length+=(len/60);console.log(video, len);
        }).catch(err=>console.log(err));

        
    }

   // console.log(length);
    return length;
// getVideoDurationInSeconds('/home/abhinav/Downloads/React-Udemy/1. Getting Started/2. What is React.mp4').then(len=>console.log(len));
}
console.log(allMp4FilesInADirectory('/home/abhinav/Downloads/React-Udemy'));