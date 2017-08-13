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
	
	addAmount(inputAmount) {
		this._amount += inputAmount;
	}
	
}


class UpgradeEvent {
	constructor(eventId, name, prereqEvent, prereqOne, prereqTwo, costOne, costTwo, deltaShiftOne, deltaShiftTwo, unique, displayed, done, count, flavourText, storyText){
		this._eventId = eventId;
		this._name = name;
		this._prereqEvent = prereqEvent;
		this._prereqOne = prereqOne;
		this._prereqTwo = prereqTwo;
		this._costOne = costOne;
		this._costTwo = costTwo;
		this._deltaShiftOne = deltaShiftOne;
		this._deltaShiftTwo = deltaShiftTwo;
		this._unique = unique;
		this._displayed = displayed;
		this._done = done;
		this._count = count;
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
	
	getPrereqEvent() {
		return this._prereqEvent;
	}
	
	getCostOne() {
		return this._costOne;
	}
	
	getCostTwo() {
		return this._costTwo;
	}
	
	getDeltaShiftOne() {
		return this._deltaShiftOne;
	}
	
	getDeltaShiftTwo() {
		return this._deltaShiftTwo;
	}
	
	getUnique() {
		return this._unique;
	}
	
	getDisplayed() {
		return this._displayed;
	}
	
	setDisplayed(newVal) {
		this._displayed = newVal;
	}
	
	getDone() {
		return this._done;
	}
	
	getCount() {
		return this._count;
	}
	
	getFlavourText() {
		return this._flavourText;
	}
	
	getStoryText() {
		return this._storyText;
	}
	
	setCostOne(newCostOne) {
		this._costOne = newCostOne;
	}
	
	setCostTwo(newCostTwo) {
		this._costTwo = newCostTwo;
	}
	
	increaseCosts() {
		this._costOne = Math.round(this._costOne*1.25);
		this._costTwo = Math.round(this._costTwo*1.25);
	}
	
	incrementEventCounter() {
		this._count++;
	}
}


class Planet {
	constructor(name, type, diameter, avgDistFromSunAu, avgDistFromSunKm, period, eccentricity, inclination, upgrades){
		this._name = name;
		this._type = type;
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
	
	getType() {
		return this._type;
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



// Instantiate resources and set button boost values
let resourceOne = new Resource("Nuclear", 0, 0.5);
let resourceTwo = new Resource("Photonic", 0, 0.1);
let resourceOneBoost = 100;
let resourceTwoBoost = 100;


// Intantiate planets
/* (name, diameter(1000s of km to 2sf), avgDistFromSunAu(AU to 1 dp), avgDistFromSunKm (1000s of km)
	period(relative to 1 earth year), eccentricity, inclination(degrees), upgrades)
*/
var planets = [];
let sol = new Planet("Sol", 1390, 0, 0, 0, 0, 0, 0);
planets.push(sol);
let planetMercury = new Planet("Mercury", "Terrestrial", 3.0, 0.4, 5790, 0.241, 0.208, 7.00, 0);
planets.push(planetMercury);
let planetVenus = new Planet("Venus", "Terrestrial", 7.5, 0.7, 108200, 0.615, 0.007, 3.39, 0);
planets.push(planetVenus);
let planetEarth = new Planet("Earth", "Terrestrial", 7.9, 1.0, 149600, 1.000, 0.017, 0.00, 0);
planets.push(planetEarth);
let planetMars = new Planet("Mars", "Terrestrial", 4.2, 1.5, 227900, 1.880, 0.093, 1.85, 0);
planets.push(planetMars);
let planetJupiter = new Planet("Jupiter", "Gas giant", 142.8, 5.2, 778300, 11.867, 0.048, 1.31, 0);
planets.push(planetJupiter);
let planetSaturn = new Planet("Saturn", "Gas giant", 120.7, 9.5, 1427000, 29.461, 0.058, 2.48, 0);
planets.push(planetSaturn);
let planetUranus = new Planet("Uranus", "Gas giant", 51.1, 19.2, 2871000, 84.030, 0.048, 0.77, 0);
planets.push(planetUranus);
let planetNeptune = new Planet("Neptune", "Gas giant", 48.6, 30.0, 4497100, 164.815, 0.010, 1.77, 0);
planets.push(planetNeptune);
let planetPluto = new Planet("Pluto", "Dwarf", 2, 39.5, 5913000, 248.057, 0.248, 17.14, 0);
planets.push(planetPluto);


// Updates resource values after an upgrade is chosen
function updateResources(i) {
	resourceOne.addAmount(-upgradeEvents[i].getCostOne());
	resourceTwo.addAmount(-upgradeEvents[i].getCostTwo());
	resourceOne.increaseDelta(upgradeEvents[i].getDeltaShiftOne());
	resourceTwo.increaseDelta(upgradeEvents[i].getDeltaShiftTwo());
	
	if (upgradeEvents[i].getUnique()===false) {
		upgradeEvents[i].incrementEventCounter();
		upgradeEvents[i].increaseCosts();
		updateButtonVals(i);
	}
}

// Update the values on the upgrade buttons after a click
function updateButtonVals(eventId) {
	document.getElementById("upgradeeventcount_"+eventId).innerHTML = "(x" + upgradeEvents[eventId].getCount() +")";
	document.getElementById("nuclearcost_"+eventId).innerHTML = upgradeEvents[eventId].getCostOne();
	document.getElementById("photoniccost_"+eventId).innerHTML = upgradeEvents[eventId].getCostTwo();
} 

// Instantiate upgradeEvents and create related function triggers
// (eventId, name, prereqEvent, prereqOne, prereqTwo, costOne, costTwo, deltaShiftOne, deltaShiftTwo, unique, displayed, done, count, flavourText, storyText)
var upgradeEvents = [];
let aBeginning = new UpgradeEvent(0,"A beginning", -1, 0, 0, 0, 0, 0, 0, true, false, false, 0, "", "The first steps");
upgradeEvents.push(aBeginning);
function upgradeevent_0() {
}

let nuclearPowerStation = new UpgradeEvent(1, "Nuclear Power Station", -1, 20, 0, 50, 0, 0.1, 0, false, false, false, 0, "Adds <span class='Nuclear'>1</span>TJ/s", "You can now purchase surface based nuclear power stations for Earth.");
upgradeEvents.push(nuclearPowerStation);
function upgradeevent_1() {
	updateResources(1);
}

let solarPowerFarm = new UpgradeEvent(2, "Solar Power Farm", -1, 0, 10, 10, 50, 0, 0.1, false, false, false, 0, "Adds <span class='Photonic'>1</span>TJ/s", "You can now purchase surface based solar farms for Earth.");
upgradeEvents.push(solarPowerFarm);
function upgradeevent_2() {
	updateResources(2);
	
	
}


// Event listeners
document.getElementById(resourceOne.getName()+"_booster").addEventListener("click", function(){resourceOne.addAmount(resourceOneBoost);});
document.getElementById(resourceTwo.getName()+"_booster").addEventListener("click", function(){resourceTwo.addAmount(resourceTwoBoost);});

document.getElementById("system_button")
	.addEventListener("click", function(){
										loadViewer("system");				
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
	document.getElementById(resourceOne.getName()+"_delta").innerHTML = Math.round(10*resourceOne.getDelta()).toLocaleString();
	resourceTwo.increment();
	document.getElementById(resourceTwo.getName()).innerHTML = Math.round(resourceTwo.getAmount()).toLocaleString();
	document.getElementById(resourceTwo.getName()+"_delta").innerHTML = Math.round(10*resourceTwo.getDelta()).toLocaleString();
}


// Load planetary data into panel
function loadPlanetaryData(planet){
		for (let i=0, len=planets.length; i<len; i++) {
		if (planet.toUpperCase()===planets[i].getName().toUpperCase()) {
			document.getElementById("pd_name").innerHTML = planets[i].getName();
			document.getElementById("pd_type").innerHTML = planets[i].getType();
			document.getElementById("pd_diameter").innerHTML = (planets[i].getDiameter()*1000).toLocaleString();
			document.getElementById("pd_avgdist_km").innerHTML = (planets[i].getAvgDistFromSunKm()*1000).toLocaleString();
			document.getElementById("pd_avgdist_au").innerHTML = planets[i].getAvgDistFromSunAu();
			document.getElementById("pd_eccentricity").innerHTML = planets[i].getEccentricity();
			document.getElementById("pd_inclination").innerHTML = planets[i].getInclination();
			document.getElementById("pd_period").innerHTML = planets[i].getPeriod();
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

// Add upgradeEvents array for triggered events to the UI
function addUpgradeEvents() {
	for (let i=0, len=upgradeEvents.length; i<len; i++) {
		let prereqEvent = upgradeEvents[i].getPrereqEvent();
		//alert(prereqEvent);
		if (prereqEvent === -1 || upgradeEvents[prereqEvent].getDone()===true) {
			if (upgradeEvents[i].getDisplayed()===false && 
				(resourceOne.getAmount() >= upgradeEvents[i].getPrereqOne() && resourceTwo.getAmount() >= upgradeEvents[i].getPrereqTwo())) {

				if (upgradeEvents[i].getFlavourText()!=="") {
					let eventCount = "";
					if (upgradeEvents[i].getUnique()===false) {eventCount = "(x" + upgradeEvents[i].getCount() +")";}
					let eventId = upgradeEvents[i].getEventId();
					document.getElementById("upgrades").innerHTML +=
						"<div class='upgradeevent' id='upgradeevent_" + eventId + "'>" +
						"<span class='upgradeeventname' id='upgradeeventname_" + eventId + "'>" + upgradeEvents[i].getName() + "</span> " +
						"<span class='upgradeeventcount' id='upgradeeventcount_" + eventId + "'>" + eventCount + "</span>" +
						"<br>" +
						"Cost: <span class='Nuclear' id='nuclearcost_" + eventId + "'>" + upgradeEvents[i].getCostOne().toLocaleString() + "</span>, " +
						"<span class='Photonic' id='photoniccost_" + eventId + "'>" + upgradeEvents[i].getCostTwo().toLocaleString() + "</span>" +
						"<br>" +
						"<span class='upgradeeventflavour'>" + upgradeEvents[i].getFlavourText() + "</span>" +					
						"</div>";
					addUpgradeEventButtons();
				}

				if (upgradeEvents[i].getStoryText()!=="") {
					document.getElementById("storybox").innerHTML +=
						"<div class='story_item' id='story_" + upgradeEvents[i].getEventId() + "'>" +upgradeEvents[i].getStoryText() + "</div>";
				}

				var upgradeEventItem = "upgradeevent_" + upgradeEvents[i].getEventId();
				var storyItem = "story_" + upgradeEvents[i].getEventId();
				upgradeEvents[i].setDisplayed(true);
				scrollStory(storyItem);
				fadein(storyItem);
				fadein(upgradeEventItem);
			}
		}
	}
}

// Update the DOM to include listeners for each of the upgrade events
function addUpgradeEventButtons() {
	// upgrade button listeners
	let upgradebuttons = document.getElementsByClassName("upgradeevent");

	for (let i=0,len=upgradebuttons.length; i<len; i++) {
		upgradeButtonListener(upgradebuttons[i].id);
	}

	function upgradeButtonListener(upgrade){
		document.getElementById(upgrade).addEventListener("click", function(){window[upgrade]();});
	}
}

// Loads the content for the viewer panel
function loadViewer(planet) {
	planetSphere.material.map = THREE.ImageUtils.loadTexture("images/" + planet + "map.jpg");
	planetSphere.material.needsUpdate = true;
}


// Initial screen layout, centred on Earth
loadViewer("earth");
loadPlanetaryData("earth");
showHidePlanetaryData("show");
showHideUpgrades("show");
fadein("ui");

// Scrolls the story pane to the top of the next item automatically
function scrollStory(identifier) {
	document.querySelector("#"+identifier).scrollIntoView({behavior:'smooth'});
}

// fades an item in from opacity 0 to opacity 1
function fadein(identifier){
	document.querySelector("#"+identifier).style.opacity = 1;
}

// fades an item in from opacity 0 to opacity 1
function fadeout(identifier){
	document.querySelector("#"+identifier).style.opacity = 0;
}

// Update rate, once every 10th of a second
setInterval(gameMain, 100);

// Main function
function gameMain(){
	incrementResources();
	addUpgradeEvents();
}


