/*jslint esversion: 6 */
/*jslint node: true */
"use strict";



//classes
class Resource {
	constructor(name, amount, delta){
		this._name = name;
		this._amount = amount;
		this._delta = delta;
	}
	
	getName() {
		return this._name;
	}
	
	getAmount() {
		return this._amount;
	}
	
	getDelta() {
		return this._delta;
	}
	
	increment() {
		this._amount += this._delta;
	}
	
	increaseDelta(increase) {
		this._delta += increase;
	}
	
	manualIncrease(inputAmount) {
		this._amount += inputAmount;
	}
	
}


class upgrade {
	constructor(){
		
	}
	
}


class Planet {
	constructor(name, diameter, avgDistFromSun, period, eccentricity, inclination){
		this._name = name;
		this._diameter = diameter;
		this._avgDistFromSun = avgDistFromSun;
		this._period = period;
		this._eccentricity = eccentricity;
		this._inclination = inclination;
	}
	
	getName() {
		return this._name;
	}
	
	getDiameter() {
		return this._diameter;
	}
	
	getAvgDistFromSun() {
		return this._avgDistFromSun;
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
	
}



// Instantiate resources
let resourceOne = new Resource("Nuclear", 100, 1.0);
let resourceTwo = new Resource("Photonic", 100, 0.1);


// Event listeners
document.getElementById(resourceOne.getName()+"_button").addEventListener("click", function(){resourceOne.manualIncrease(100);});
document.getElementById(resourceTwo.getName()+"_button").addEventListener("click", function(){resourceTwo.manualIncrease(100);});

document.getElementById("sun_button")
	.addEventListener("click", function(){
										loadViewer("sun");				
										showHidePlanetaryData("hide");
										showHideUpgrades("hide");
										});
// Planet button listeners
var planetbuttons = document.getElementsByClassName("planetbutton");

for (var i=0,len=planetbuttons.length; i<len; i++) {
	planetButtonListener(planetbuttons[i].id);
}

function planetButtonListener(planet){
	document.getElementById(planet).addEventListener("click", function(){
										loadViewer(planet);
										showHidePlanetaryData("show");
										showHideUpgrades("show");
										});
}


// Increments the resource values by their delta and updates the display
function incrementResources() {
	resourceOne.increment();
	document.getElementById(resourceOne.getName()).innerHTML = Math.round(resourceOne.getAmount());
	resourceTwo.increment();
	document.getElementById(resourceTwo.getName()).innerHTML = Math.round(resourceTwo.getAmount());
}


// Show/hide planetary data panel
function showHidePlanetaryData(showHide) {
	var animspeed = setInterval(motion, 1);
	var planetaryRect = document.getElementById("planetary_data").getBoundingClientRect();
	var planetaryPos = planetaryRect.left;
	function motion() {
		if (showHide==="hide" && (planetaryPos>-300)) {
			planetaryPos-=3;
			document.getElementById("planetary_data").style.transform = "translate(" + planetaryPos + "px, 0px)";	
		} else if (showHide==="show" && planetaryPos<0) {
			planetaryPos+=3;
			document.getElementById("planetary_data").style.transform = "translate(" + planetaryPos + "px, 0px)";	
		}
		else {
			clearInterval(animspeed);
		}
	}
}

// Show/hide upgrades panel
function showHideUpgrades(showHide) {
	var animspeed = setInterval(motion, 1);
	var upgradesRect = document.getElementById("upgrades").getBoundingClientRect();
	var upgradesPos = document.documentElement.clientWidth - upgradesRect.left;
	function motion() {
		if (showHide==="hide" && (upgradesPos>0)) {
			upgradesPos-=3;
			document.getElementById("upgrades").style.transform = "translate(" + (300 - upgradesPos) + "px, 0px)";	
		} else if (showHide==="show" && (upgradesPos<300)) {
			upgradesPos+=3;
			document.getElementById("upgrades").style.transform = "translate(" + (300 - upgradesPos) + "px, 0px)";
		}
		else {
			clearInterval(animspeed);
		}
	}
}



function loadViewer(thing) {
	document.getElementById("viewer").innerHTML=thing;
}

// Main function
function gameMain(){
	incrementResources();
	
}

// Update rate, once every 10th of a second
setInterval(gameMain, 100);
