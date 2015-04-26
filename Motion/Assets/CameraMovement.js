
var smooth : float = 1.5f; // The relative speed at which the camera will catch up.
var newPos : Vector3;               // The position the camera is trying to reach.
var speed: float;
var planets : GameObject[];
var centerOfPlanets : Array[];

function Start() {
	planets = [GameObject.Find("Mercury"), GameObject.Find("Venus"), GameObject.Find("Earth II"), GameObject.Find("Mars"), GameObject.Find("Jupiter"), GameObject.Find("Saturn"), GameObject.Find("Uranus"), GameObject.Find("Neptune"), GameObject.Find("Sun")];
}

function Update() {
	for (var i = 0; planets.length > i; i++) {
		print(planets[i]);
		centerOfPlanets[i] = [planets[i].GetComponent.<Mesh>().bounds.center.x, planets[i].GetComponent.<Mesh>().bounds.center.y, planets[i].GetComponent.<Mesh>().bounds.center.z, planets[i].GetComponent.<Mesh>().bounds.size / 2];
	}

	var rightHand = GameObject.Find("RightHand");
	var leftHand = GameObject.Find("LeftHand");
	var forwardWarp = false;
	var backwardWarp = false;
	var k = 3;
	if (rightHand != null && leftHand != null) {
		if(angle(leftHand.palmVelocity, rightHand.palmVelocity) < 0){
			if(leftHand.palmVelocity.x > 30 && rightHand.palmVelocity.x < -30){
				backwardWarp = true;
			}
			if(rightHand.palmVelocity.x > 30 && leftHand.palmVelocity.x < -30){
				forwardWarp = true;
			}
		}
		
		var vectorWeUse = gameObject.transform.rotation.Normalize();
		if(forwardWarp) {
			warp(k * (rightHand.palmPosition - leftHand.palmPosition).magnitude * (vectorWeUse));
		}
		if(backwardWarp){
			warp(k * -1 * (vectorWeUse));
		}
	}
}

function move(direction : Vector3) {
	var index = -1;
	var minD = 1e100;
	var planet = new Array(4);
	for(var i=0; i<centerOfPlanets.length; i++) {
		planet = centerOfPlanets[i];
		var vector: Vector3;
		vector.x = planet[0];
		vector.y = planet[1];
		vector.z = planet[2];
		var d = dist(vector, gameObject.transform.position);
		if(d < minD) {
			minD = d;
			index = i;
		}
	}
	var k = 1;
	planet = centerOfPlanets[index];
	gameObject.transform.position.x += k * planet[3] * direction.x; //why index 3 each time??
	gameObject.transform.position.y += k * planet[3] * direction.y;
	gameObject.transform.position.z += k * planet[3] * direction.z;
}

function warp(direction: Vector3){
	var minShortDist = 10e100;
	var index = -1;
	var planet;
	for (var i=0; i<centerOfPlanets.length; i++) {
		planet = centerOfPlanets[i];
		var vector: Vector3;
		vector.x = planet[0] - gameObject.transform.position.x;
		vector.y = planet[1] - gameObject.transform.position.y;
		vector.z = planet[2] - gameObject.transform.position.z;
		var theta = angle(vector, direction);
		if(theta < Mathf.PI/6) {
			var shortDist = Mathf.Sin(theta)*dist(planet, gameObject.transform.position);
			if(shortDist < minShortDist) {
				minShortDist = shortDist;
				index = i;
			}
		}
	}
	
	if(index == -1) {
		// no planet to auto-aim towards
		var k = 1;
		var percentageToWarp = magnitude(direction);
		gameObject.transform.position.x += k * direction.x;
		gameObject.transform.position.y += k * direction.y;
		gameObject.transform.position.z += k * direction.z;
	}
	else {
		var maxWarpVect : Vector3;
		planet = centerOfPlanets[index];
		maxWarpVect.x = planet[0] - gameObject.transform.position.x;
		maxWarpVect.y = planet[1] - gameObject.transform.position.y;
		maxWarpVect.z = planet[2] - gameObject.transform.position.z;
		
		var leng = magnitude(maxWarpVect);
		var unitVector : Vector3;
		unitVector.x = maxWarpVect.x / leng;
		unitVector.y = maxWarpVect.y / leng;
		unitVector.z = maxWarpVect.z / leng;
		
		var p = 2;
		maxWarpVect.x -= unitVector.x * planet[3] * p;
		maxWarpVect.y -= unitVector.y * planet[3] * p;
		maxWarpVect.z -= unitVector.z * planet[3] * p;
		
		percentageToWarp = magnitude(direction);
		gameObject.transform.position.x += maxWarpVect.x * percentageToWarp;
		gameObject.transform.position.y += maxWarpVect.y * percentageToWarp;
		gameObject.transform.position.z += maxWarpVect.z * percentageToWarp;
	}
}

function dist(a : Vector3, b : Vector3) {
	return Mathf.Sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y)+(a.z-b.z)*(a.z-b.z));
}

function dotproduct(a: Vector3, b: Vector3) {
	var n = 0.0;
	for (var i = 0; i < 3; i++) n += a[i] * b[i];
	return n;
 }
 
function magnitude(v: Vector3){
	var n = 0.0;
	for (var i = 0; i < 3; i++){
		n += Mathf.Pow(v[i], 2);
	}
	return Mathf.Sqrt(n);
}

function angle(a: Vector3, b:Vector3){
	return Mathf.Acos(dotproduct(a, b)/(magnitude(a) * magnitude(b)));
}