#pragma strict
import System.IO;

function Start () {
	print(readFromFile("Assets/starData.txt"));
	writeToFile("Assets/starData.txt", "quails are awesome");
}

function Update () {

}

function readFromFile(filePath) {
	var returnMessage = "";
	try {
        // Create an instance of StreamReader to read from a file.
        var sr = new StreamReader(filePath+"");
        // Read and display lines from the file until the end of the file is reached.
        var line = sr.ReadLine();
        while (line != null) {
        	returnMessage += line + "\n";
            line = sr.ReadLine();
        }
        sr.Close();
    }
    catch (e) {
        // Something went wrong, return -1
        return -1;
    }
    return returnMessage;
}

function writeToFile(filePath, newContents) {
	var sw = new StreamWriter(filePath+"");
    // Add some text to the file.
    sw.Write(newContents);
    sw.Close();
}