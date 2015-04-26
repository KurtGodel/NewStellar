#pragma strict

var positionLastFrame;

function Start () {
	positionLastFrame = gameObject.transform.position
}

function Update () {
	var pos = gameObject.transform.position;
	var dumbWalk = pos - positionLastFrame;
	
	var k = 4;
	var positionToAdd = Vector3(k*dumbWalk);
	var newPos = gameObject.transform.position + positionToAdd;
	gameObject.transform.position = newPos;
	
	positionLastFrame = pos;
}
