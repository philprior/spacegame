// Viewer code
// Set the renderer and assign it to a div
var renderer = new THREE.WebGLRenderer();
var targetDiv = document.getElementById("viewer");
renderer.setSize(targetDiv.clientWidth, targetDiv.clientHeight);
targetDiv.appendChild(renderer.domElement);

// Create the scene and camera
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, targetDiv.offsetWidth / targetDiv.clientHeight, 0.1, 5000000);
camera.position.z = 5000;

// add a white sphere
//var geometry = new THREE.SphereGeometry(10, 32, 32);
var sunGeometry = new THREE.SphereGeometry(sol.getDiameter()/2, 32, 32);
var sunMaterial = new THREE.MeshBasicMaterial();
var material = new THREE.MeshPhongMaterial();
var sunModel = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sunModel);


var planetModels = [];
for (let i=0, len=planets.length; i<len; i++) {
	let geometry = new THREE.SphereGeometry((planets[i].getDiameter()/2), 32, 32);
	planetModels[i] = new THREE.Mesh(geometry, material);
	scene.add(planetModels[i]);
}


var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
var light = new THREE.PointLight(0xffffff);
light.position.set(0,0,0).normalize();
scene.add(ambientLight);
scene.add(light);

// redraws the camera and renderer on a window resize
window.addEventListener('resize', function(){
	renderer.setSize(0,0);
	renderer.setSize(targetDiv.offsetWidth, targetDiv.offsetHeight);
	camera.aspect = targetDiv.offsetWidth / targetDiv.clientHeight;
	camera.updateProjectionMatrix();
});

function animate() {
		
	for (let i=0, len=planets.length; i<len; i++) {
		planetModels[i].position.set(orbits[i].getX(), orbits[i].getY(), orbits[i].getZ());
		orbits[i].update();
	}
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}
animate();