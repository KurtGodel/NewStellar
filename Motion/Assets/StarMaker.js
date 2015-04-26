var particles : ParticleSystem.Particle[];

function Start () {
	var ps = GetComponent.<ParticleSystem>();
	for(var i=0; i<1000; i++) {
		var theta = Random.value*Mathf.PI*2;
		var phi = Random.value*Mathf.PI*2;
		var r = 1000;
		var x = r*Mathf.Cos(theta)*Mathf.Sin(phi);
		var y = r*Mathf.Cos(phi);
		var z = r*Mathf.Sin(theta)*Mathf.Sin(phi);
		var pos = Vector3(x, y, z);
		var starSize = 3;
		
		var rand = Random.value;
		if(rand < 0.3) {
			ps.Emit(pos, Vector3(0, 0, 0), starSize, Mathf.Infinity, Color32(255, 255, 255, 255));
		}
		else {
			ps.Emit(pos, Vector3(0, 0, 0), starSize, Mathf.Infinity, Color32(255, 255, 255, 255));
		}
		
	}
}

function Update () {

}