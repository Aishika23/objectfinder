video = "";
Status = "";
input = "";
objects = [];
function preload() {
    video = createVideo('video.mp4');
    video.hide();
}
function setup() {
    canvas = createCanvas(615, 560);
    canvas.position(153, 80);
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded());
    document.getElementById("status").innerHTML = "Detecting Objects";
    input = document.getElementById("input").value;
}
function modelLoaded() {
    console.log("model Loaded!");
    Status = true;
}
function gotResults(error, results) {
    if (error) 
    {
        console.error(error);
    }
    console.log(results);
    objects = results
}
function draw() {
    image(video, 0, 0, 615, 560);
    if (Status != "") {
        objectDetector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++) {
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            fill("#FF0000");
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == input) 
            {
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("status").innerHTML = "Mentioned Object Found";
            }
            else
            {
                document.getElementById("status").innerHTML = "Mentioned Object Not Found";
            }
        }
    }
}