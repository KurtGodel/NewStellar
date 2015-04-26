#pragma strict
import System.IO;


var ps : ParticleSystem;
var particles : ParticleSystem.Particle[];

function Start () {
	var filePath = "Assets/hygdata_v3.csv";
	ps = GetComponent.<ParticleSystem>();
	
	ps.startSpeed = 0;
	ps.emissionRate = 0;

	var starPositions = new Vector3[119613];
	var starColors = new Color32[starPositions.length];
	var starSizes = new float[starPositions.length];
	var color = 0;
	
	try {
        // Create an instance of StreamReader to read from a file.
        print(filePath);
        var sr = new StreamReader(filePath+"");
        // Read and display lines from the file until the end of the file is reached.
        var line = sr.ReadLine();
        line = sr.ReadLine();
        var j = 0;
        while (line != null) {
        	var lineValues = line.Split(","[0]);
        	//set positions
        	starPositions[j] = new Vector3(parseFloat(lineValues[3]), parseFloat(lineValues[4]), parseFloat(lineValues[5]));
        	
        	color = parseFloat(lineValues[10]);
        	if (color == 0) {
    			starColors[j] = Color32(155, 176, 255, 255);
			} else if (color == 1) {
    			starColors[j] = Color32(170, 191, 255, 255);
			} else if (color == 2) {
    			starColors[j] = Color32(202, 215, 255, 255);
			} else if (color == 3) {
    			starColors[j] = Color32(248, 247, 255, 255);
			} else if (color == 4) {
    			starColors[j] = Color32(255, 244, 234, 255);
			} else if (color == 5) {
    			starColors[j] = Color32(255, 210, 161, 255);
			} else {
    			starColors[j] = Color32(255, 204, 111, 255);
			}
			
			
        	starSizes[j] = (19.63 - parseFloat(lineValues[1]))/3.63;
        	
        	j = j + 1;
            line = sr.ReadLine();
        }
        sr.Close();
    }
    catch (e) {
        // Something went wrong, return -1
        return -1;
    }
    
	var i = 0;
	// for(i=0; i<starPositions.length; i++) {
	for(i=0; i<500; i++) {
		ps.Emit(starPositions[i], Vector3(0, 0, 0), starSizes[i], Mathf.Infinity, starColors[i]);
	}
	
	particles = new ParticleSystem.Particle[ps.maxParticles];
}

function Update () {}