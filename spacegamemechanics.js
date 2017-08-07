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


class UpgradeEvent {
	constructor(eventId, name, prereqOne, prereqTwo, costOne, costTwo, deltaShiftOne, deltaShiftTwo, unique, flavourText, storyText){
		this._eventId = eventId;
		this._name = name;
		this._prereqOne = prereqOne;
		this._prereqTwo = prereqTwo;
		this._deltaShiftOne = deltaShiftOne;
		this._deltaShiftTwo = deltaShiftTwo;
		this._unique = unique;
		this._flavourText = flavourText;
		this._storyText = storyText;
	}
	
	getEventId() {
		return this._eventId;
	}
	
	getName() {
		return this._name;
	}
	
	getPrereqOne() {
		return this._prereqOne;
	}
	
	getPrereqTwo() {
		return this._prereqTwo;
	}
	
	getDeltaShift() {
		return this._deltaShift;
	}
	
	getUnique() {
		return this._unique;
	}
	
	getFlavourText() {
		return this._flavourText;
	}
	
	getStoryText() {
		return this._storyText;
	}
}


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



// Instantiate resources
let resourceOne = new Resource("Nuclear", 0, 0.5);
let resourceTwo = new Resource("Photonic", 0, 0.1);


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


// Instantiate upgradeEvents
// (eventId, name, prereqOne, prereqTwo, costOne, costTwo, deltaShiftOne, deltaShiftTwo, unique, flavourText, storyText)
var upgradeEvents = [];
let aBeginning = new UpgradeEvent("000001","A beginning", 0, 0, 0, 0, 0, 0, true, "The first steps", "Text");
upgradeEvents.push(aBeginning);
let nuclearPowerStation = new UpgradeEvent("000002", "Nuclear Power Station", 200, 0, 500, 0, 1, 0, false, "A planetside source of nuclear power", "You can now purchase surface based nuclear power stations for this planet.");
upgradeEvents.push(nuclearPowerStation);
let solarPowerFarm = new UpgradeEvent("000003", "Solar Power Farm", 0, 100, 100, 500, 0, 1, false, "A planetside source of solar power", "You can now purchase surface based solar farms for this planet.");
upgradeEvents.push(solarPowerFarm);


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
										loadPlanetaryData(planet);
										showHidePlanetaryData("show");
										showHideUpgrades("show");
										});
}


// Increments the resource values by their delta and updates the display
function incrementResources() {
	resourceOne.increment();
	document.getElementById(resourceOne.getName()).innerHTML = Math.round(resourceOne.getAmount()).toLocaleString();
	resourceTwo.increment();
	document.getElementById(resourceTwo.getName()).innerHTML = Math.round(resourceTwo.getAmount()).toLocaleString();
}


// Load planetary data into panel
function loadPlanetaryData(planet){
		for (var i=0, len=planets.length; i<len; i++) {
		if (planet.toUpperCase()===planets[i].getName().toUpperCase()) {
			document.getElementById("planetary_data").innerHTML =
				"Name<br><span class='indented_data'>" + planets[i].getName() + "</span><br>" +
				"Diameter<br><span class='indented_data'>" + (planets[i].getDiameter()*1000).toLocaleString() + "km</span><br>" +
				"Average distance from the sun<br><span class='indented_data'>" + (planets[i].getAvgDistFromSunKm()*1000).toLocaleString()+ "km (" + planets[i].getAvgDistFromSunAu() + "AU)</span><br>";
			break;
		}
	}
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

// Check the upgradeEvents array for triggered events, publish these to the UI
function checkUpgradeEvents() {
	for (var i=0, len=upgradeEvents.length; i<len; i++) {
		if (resourceOne.getAmount() >= upgradeEvents[i].getPrereqOne() && resourceTwo.getAmount() >= upgradeEvents[i].getPrereqTwo()) {
			document.getElementById("upgrades").innerHTML +=
				'<div class="upgradeevent">' + upgradeEvents[i].getName() + '<br>' + upgradeEvents[i].getFlavourText() + '</div>';
			document.getElementById("storybox").innerHTML +=
				"<div class='story_item' id='story_" + upgradeEvents[i].getEventId() + "'>" +upgradeEvents[i].getStoryText() + "</div>";
			var nextStoryItem = "story_" + upgradeEvents[i].getEventId();
			upgradeEvents.splice(i,1);
			scrollStory(nextStoryItem);
		}
	}
}


// Loads the content for the viewer panel
function loadViewer(planet) {
	document.getElementById("viewer").innerHTML=planet;
}


// Initial screen layout, centred on Earth
loadViewer("earth");
loadPlanetaryData("earth");
showHidePlanetaryData("show");
showHideUpgrades("show");


// Scrolls the story pane to the top of the next item automatically
function scrollStory(identifier) {
	document.querySelector("#"+identifier).scrollIntoView({behavior:'smooth'});
}

// Update rate, once every 10th of a second
setInterval(gameMain, 100);

// Main function
function gameMain(){
	incrementResources();
	checkUpgradeEvents();
}


