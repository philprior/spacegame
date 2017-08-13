/*jslint esversion: 6 */
/*jslint node: true */
"use strict";


class Planet {
	constructor(name, diameter, avgDistFromSunAu, avgDistFromSunKm, period, eccentricity, inclination, upgrades){
		this._name = name;
		this._diameter = diameter;
		this._avgDistFromSunAu = avgDistFromSunAu;
		this._avgDistFromSunKm = avgDistFromSunKm;
		this._period = period;
		this._eccentricity = eccentricity;
		this._inclination = inclination;
		this._upgrades = upgrades;
	}
	
	getName() {
		return this._name;
	}
	
	getDiameter() {
		return this._diameter;
	}
	
	getAvgDistFromSunAu() {
		return this._avgDistFromSunAu;
	}
	
	getAvgDistFromSunKm() {
		return this._avgDistFromSunKm;
	}
	
	getPeriod() {
		return this._period;
	}
	
	getEccentricity() {
		return this._eccentricity;
	}
	
	getInclination() {
		return this._inclination;
	}
	
	getUpgrades() {
		return this._upgrades;	
	}
}


class Anchor {
	constructor(x,y,z, rotX, rotY, rotZ){
		this._x = x;
		this._y = y;
		this._z = z;
		this._rotX = rotX*(Math.PI/180);
		this._rotY = rotY*(Math.PI/180);
		this._rotZ = rotZ*(Math.PI/180);
	}
	
	getX() {
		return this._x;
	}
	
	getY() {
		return this._y;
	}
	
	getZ() {
		return this._z;
	}
	
	getRotX() {
		return this._rotX;
	}
		
	getRotY() {
		return this._rotY;
	}
	
	getRotZ() {
		return this._rotZ;
	}
}


class Orbit {
	constructor(orbitID, parent, radius, eccentricity, period, startThetaOffset, rotX, rotY, rotZ){
		this._orbitID = orbitID;
		this._parent = parent;
		this._radius = radius;
		this._eccentricity = eccentricity;
		this._peri = radius-eccentricity; // perihelion - closest to the origin
		this._aphe = radius+eccentricity; //aphelion - furthest from the origin
		
		this._period = period;
		
		this._deltaTheta = Math.PI/Math.round(this._period/2);
		this._theta = startThetaOffset;

		this._x = 0;
		this._y = 0;
		this._z = 0;
		
		this._rotX = rotX*(Math.PI/180)+parent.getRotX();
		this._rotY = rotY*(Math.PI/180)+parent.getRotY();
		this._rotZ = rotZ*(Math.PI/180)+parent.getRotZ();
		
		this.update();
	}
	
	getName() {
		return this._name;
	}
	
	getRadius() {
		return this._radius;
	}
	
	getPeri() {
		return this._peri;
	}
	
	getAphe() {
		return this._aphe;
	}
	
	getEccentricity() {
		return this._eccentricity;
	}
	
	getRotX() {
		return this._rotX;
	}
		
	getRotY() {
		return this._rotY;
	}
	
	getRotZ() {
		return this._rotZ;
	}

	getPeriod() {
		return this._period;
	}
	
	getTheta() {
		return this._theta;
	}
	
	getX() {
		return this._x;
	}
	
	getY() {
		return this._y;
	}
	
	getZ() {
		return this._z;
	}
	
	update() {
		// Rotate the value of theta by one measure
		this._theta += this._deltaTheta;
		// calculate the basic x,y,z cartesian coordinates
		// assuming we start by generating on a plane level with the sun->earth axis
		let localX = (Math.sin(this._theta)*this._aphe);
		let localZ = (Math.cos(this._theta)*this._peri);
		let localY = 0;
		this._x = localX + this._parent.getX();
		this._z = localZ + this._parent.getZ();
		this._y = localY + this._parent.getY();
		// Rotate the coordinates based on the rotation of the orbit around its parent
		if(this._rotX!==0){
			let temp_z = (Math.sin(this._rotX)*localY) + (Math.cos(this._rotX)*localZ);
			let temp_y = (Math.cos(this._rotX)*localY) - (Math.sin(this._rotX)*localZ);
			this._z = temp_z + this._parent.getZ();
			this._y = temp_y + this._parent.getY();
		}
		if(this._rotY!==0){
			let temp_x = (Math.sin(this._rotY)*localZ) + (Math.cos(this._rotY)*localX);
			let temp_z = (Math.cos(this._rotY)*localZ) - (Math.sin(this._rotY)*localX);
			this._x = temp_x + this._parent.getX();
			this._z = temp_z + this._parent.getZ();
		}
		if(this._rotZ!==0){
			let temp_y = (Math.sin(this._rotZ)*localX) + (Math.cos(this._rotZ)*localY);
			let temp_x = (Math.cos(this._rotZ)*localX) - (Math.sin(this._rotZ)*localY);
			this._y = temp_y + this._parent.getY();
			this._x = temp_x + this._parent.getX();
		}
	}
}


// Intantiate planets
/* (name, diameter(1000s of km to 2sf), avgDistFromSunAu(AU to 1 dp), avgDistFromSunKm (1000s of km)
	period(relative to 1 earth year), eccentricity, inclination(degrees), upgrades)
*/
var planets = [];
let sol = new Planet("Sol", 1390, 0, 0, 0, 0, 0, 0);
planets.push(sol);
let planetMercury = new Planet("Mercury", 3.0, 0.4, 5790, 0.241, 0.208, 7.00, 0);
planets.push(planetMercury);
let planetVenus = new Planet("Venus", 7.5, 0.7, 108200, 0.615, 0.007, 3.39, 0);
planets.push(planetVenus);
let planetEarth = new Planet("Earth", 7.9, 1.0, 149600, 1.000, 0.017, 0.00, 0);
planets.push(planetEarth);
let planetMars = new Planet("Mars", 4.2, 1.5, 227900, 1.880, 0.093, 1.85, 0);
planets.push(planetMars);
let planetJupiter = new Planet("Jupiter", 142.8, 5.2, 778300, 11.867, 0.048, 1.31, 0);
planets.push(planetJupiter);
let planetSaturn = new Planet("Saturn", 120.7, 9.5, 1427000, 29.461, 0.058, 2.48, 0);
planets.push(planetSaturn);
let planetUranus = new Planet("Uranus", 51.1, 19.2, 2871000, 84.030, 0.048, 0.77, 0);
planets.push(planetUranus);
let planetNeptune = new Planet("Neptune", 48.6, 30.0, 4497100, 164.815, 0.010, 1.77, 0);
planets.push(planetNeptune);
let planetPluto = new Planet("Pluto", 2, 39.5, 5913000, 248.057, 0.248, 17.14, 0);
planets.push(planetPluto);

var origin = new Anchor(0,0,0,0,0,0);

var earthOrbit = new Orbit("0001", origin, 250, 20, 360, 0, 0, 0, 0);
var moonOrbit = new Orbit("0002", earthOrbit, 20, 0, 100, 0, 0, 0, -10);
var earthOrbit2 = new Orbit("0003", origin, 400, 20, 1000, 90, 0, 0, 15);
var moonOrbit2 = new Orbit("0004", earthOrbit2, 20, 0, 100, 0, 0, 0, 30);


// Set the renderer and assign it to a div
var renderer = new THREE.WebGLRenderer();
var targetDiv = document.getElementById("viewer");
renderer.setSize(targetDiv.clientWidth, targetDiv.clientHeight);
targetDiv.appendChild(renderer.domElement);

// Create the scene and camera
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, targetDiv.offsetWidth / targetDiv.clientHeight, 0.1, 1000);
camera.position.z = 500;

// add a white sphere
var geometry = new THREE.SphereGeometry(10, 32, 32);
var material = new THREE.MeshPhongMaterial();
var planetSphere = new THREE.Mesh(geometry, material);
var geometry2 = new THREE.SphereGeometry(2, 16, 16);
var moonSphere = new THREE.Mesh(geometry2, material);
var planetSphere2 = new THREE.Mesh(geometry, material);
var moonSphere2 = new THREE.Mesh(geometry2, material);
scene.add(planetSphere);
scene.add(moonSphere);
scene.add(planetSphere2);
scene.add(moonSphere2);

var ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
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
	requestAnimationFrame(animate);
	earthOrbit.update();
	moonOrbit.update();
	earthOrbit2.update();
	moonOrbit2.update();
	planetSphere.position.set(earthOrbit.getX(), earthOrbit.getY(), earthOrbit.getZ());
	moonSphere.position.set(moonOrbit.getX(), moonOrbit.getY(), moonOrbit.getZ());
	planetSphere2.position.set(earthOrbit2.getX(), earthOrbit2.getY(), earthOrbit2.getZ());
	moonSphere2.position.set(moonOrbit2.getX(), moonOrbit2.getY(), moonOrbit2.getZ());
	//camera.position.set(earthOrbit.getX(), earthOrbit.getY(), 100 + earthOrbit.getZ());
	renderer.render(scene, camera);
}
animate();