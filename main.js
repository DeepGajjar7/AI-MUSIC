var song="";
var song2="";
var leftwristx=0;
var leftwristy=0;
var rightwristx=0;
var rightwristy=0;
var scoreleftwrist;
var scorerightwrist;

function preload(){
    song=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelloaded)
    posenet.on('pose',gotposes)
}

function draw(){
    image (video,0,0,600,500);
    fill("#FF0000")
    stroke("#FF0000");
    if (scoreleftwrist>0.2){
    circle(leftwristx,leftwristy,20);
   song.play();
   song2.stop();
    }
if (scorerightwrist>0.2){
    circle(rightwristx,rightwristy,20);
    song2.play();
    song.stop();
}

}

function modelloaded(){
    console.log("model is loaded")
}
function gotposes(results){
    if(results.length>0){
        console.log(results);
        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
        scoreleftwrist=results[0].pose.keypoints[9].score;
        scorerightwrist=results[0].pose.keypoints[10].score;
    }
}