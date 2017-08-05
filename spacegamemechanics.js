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

document.getElementById("sun_button").addEventListener("click", function(){
																			loadViewer("sun");				
																			moveItem("planetary_data", "left", 300);
																			moveItem("upgrades", "right", 300);
																			});
document.getElementById("mercury_button").addEventListener("click", function(){
																			loadViewer("mercury");
																			moveItem("planetary_data", "right", 300);
																			moveItem("upgrades", "left", 300);
																			});
document.getElementById("venus_button").addEventListener("click", function(){loadViewer("venus");});
document.getElementById("earth_button").addEventListener("click", function(){loadViewer("earth");});
document.getElementById("mars_button").addEventListener("click", function(){loadViewer("mars");});
document.getElementById("jupiter_button").addEventListener("click", function(){loadViewer("jupiter");});
document.getElementById("saturn_button").addEventListener("click", function(){loadViewer("saturn");});
document.getElementById("uranus_button").addEventListener("click", function(){loadViewer("uranus");});
document.getElementById("neptune_button").addEventListener("click", function(){loadViewer("neptune");});
document.getElementById("pluto_button").addEventListener("click", function(){loadViewer("pluto");});


// Increments the resource values by their delta and updates the display
function incrementResources() {
	resourceOne.increment();
	document.getElementById(resourceOne.getName()).innerHTML = Math.round(resourceOne.getAmount());
	resourceTwo.increment();
	document.getElementById(resourceTwo.getName()).innerHTML = Math.round(resourceTwo.getAmount());
}


// Animation for UI items
function moveItem(element, direction, distance) {
	var animspeed = setInterval(motion, 0.5);
	var rect = document.getElementById(element).getBoundingClientRect();
	var pos = rect.left;
	alert(pos);
	function motion() {
		if (direction==="left" && pos!==(pos-distance)) {
			pos--;
			document.getElementById(element).style.transform = "translate(" + pos + "px, 0px)";	
		} else if (direction==="right" && pos!==(pos+distance)) {
			pos++;
			document.getElementById(element).style.transform = "translate(" + pos + "px, 0px)";	
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
