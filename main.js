song1="";
song2="";
song1_status="";
song2_status="";
lWristX=0;
lWristY=0;
rWristX=0;
rWristY=0;
score_left_wrist=0;
score_right_wrist=0;

function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}

function play_sound(){
    song.play();
    song.setVolume(0.5);
    song.rate(1);
}

function setup(){
    canvas=createCanvas(400,400);
    canvas.position(550,300);
    video=createCapture(VIDEO);
    video.size(400,400);
    video.hide();
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPoses);
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        lWristX=results[0].pose.leftWrist.x;
        lWristY=results[0].pose.leftWrist.y;
        rWristX=results[0].pose.rightWrist.x;
        rWristY=results[0].pose.rightWrist.y;
        console.log("lwristx= "+lWristX+" lwristy= "+lWristY+" rwristx= "+rWristX+" rwristy= "+rWristY);
        score_left_wrist=results[0].pose.keypoints[9].score;
        score_right_wrist=results[0].pose.keypoints[10].score;
        console.log(score_left_wrist);
        console.log(score_right_wrist);
    }
}


function draw(){
    image(video,0,0,400,400);
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
    fill('red');
    stroke('red');
    if(score_left_wrist>0.2){
    circle(lWristX,lWristY,15);
    song1.stop();
    if(song2_status==false){
        song2.play();
        document.getElementById("song_name").innerHTML="Now Playing: Peter Pan Song";
    }

    }
    if(score_right_wrist>0.2){
        circle(rWristX,rWristY,15);
        song2.stop();
        if(song1_status==false){
            song1.play();
            document.getElementById("song_name").innerHTML="Now Playing: Harry Potter Theme Song";
        }
    }
}

function modelLoaded(){
    console.log("Model loaded");
}
