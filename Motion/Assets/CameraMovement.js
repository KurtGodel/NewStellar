var smooth : float = 1.5f; // The relative speed at which the camera will catch up.
var newPos : Vector3;               // The position the camera is trying to reach.
var speed: float;

var centerOfPlanets = new Array(9);
for (var i=0; i < centerOfPlanets.length; i++){
	var temp = [];
	for (var j=0; j<4; j++){
		temp[j] = 0;
	}
	centerOfPlanets[i] = temp;
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


