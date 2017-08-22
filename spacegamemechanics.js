/*jslint esversion: 6 */
/*jslint node: true */
"use strict";

////////////////////////////
// classes  ////////////////
////////////////////////////
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
	constructor(eventId, name, planet, prereqEvent, prereqOne, prereqTwo, costOne, costTwo, deltaShiftOne, deltaShiftTwo, unique, displayed, done, count, flavourText, storyText){
		this._eventId = eventId;
		this._name = name;
		this._planet = planet;
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
	
	getPlanet() {
		return this._planet;
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
	
	isDone() {
		this._done=true;
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


class StellarObject {
	constructor(name, type, diameter, orbitalRadiusAu, orbitalRadiusKm, period, eccentricity, inclination, axialTilt, rotationPeriod){
		this._name = name;
		this._type = type;
		this._diameter = diameter;
		this._orbitalRadiusAu = orbitalRadiusAu;
		this._orbitalRadiusKm = orbitalRadiusKm;
		this._period = period;
		this._eccentricity = eccentricity;
		this._inclination = inclination;
		this._axialTilt = axialTilt;
		this._rotationPeriod = rotationPeriod;
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
	
	getOrbitalRadiusAu() {
		return this._orbitalRadiusAu;
	}
	
	getOrbitalRadiusKm() {
		return this._orbitalRadiusKm;
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
	
	getAxialTilt() {
		return this._axialTilt;
	}
	
	getRotationPeriod() {
		return this._rotationPeriod;
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
		
		this._deltaTheta = (2*Math.PI)/this._period;
		this._theta = startThetaOffset*(Math.PI/180);

		this._x = 0;
		this._y = 0;
		this._z = 0;
		
		this._rotX = rotX*(Math.PI/180)+parent.getRotX();
		this._rotY = rotY*(Math.PI/180)+parent.getRotY();
		this._rotZ = rotZ*(Math.PI/180)+parent.getRotZ();
		
		this.update();
	}
	

	getOrbitID() {
		return this._orbitID;
	}
	
	getRadius() {
		return this._radius;
	}
	
	getParent() {
		return this._parent;
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
		// Rotate the coordinates based on the rotation of the orbit around its parent
		if(this._rotX!==0){
			let temp_z = (Math.sin(this._rotX)*localY) + (Math.cos(this._rotX)*localZ);
			let temp_y = (Math.cos(this._rotX)*localY) - (Math.sin(this._rotX)*localZ);
			localZ = temp_z;
			localY = temp_y;
		}
		if(this._rotY!==0){
			let temp_x = (Math.sin(this._rotY)*localZ) + (Math.cos(this._rotY)*localX);
			let temp_z = (Math.cos(this._rotY)*localZ) - (Math.sin(this._rotY)*localX);
			localX = temp_x;
			localZ = temp_z;
		}
		if(this._rotZ!==0){
			let temp_y = (Math.sin(this._rotZ)*localX) + (Math.cos(this._rotZ)*localY);
			let temp_x = (Math.cos(this._rotZ)*localX) - (Math.sin(this._rotZ)*localY);
			localY = temp_y;
			localX = temp_x;
		}
		this._x = localX + this._parent.getX();
		this._z = localZ + this._parent.getZ();
		this._y = localY + this._parent.getY();
	}
}

/////////////////////////
// Create intances  /////
/////////////////////////


// Planets
/* name, type, diameter(1000s of km to 2sf), orbitalRadiusAu(AU to 1 dp), orbitalRadiusKm (1000s of km) period(relative to 1 earth year), eccentricity, inclination(degrees), axial tilt, axial rotation(relative to 1 earth day)
*/

let sol = new StellarObject("Sol", "Star", 1390, 0, 0, 0, 0, 0, 0, 0);

var planets = [];
let planetMercury = new StellarObject("Mercury", "Terrestrial", 3.0, 0.4, 57900, 0.241, 0.208, 7.00, 0, 59);
planets.push(planetMercury);
let planetVenus = new StellarObject("Venus", "Terrestrial", 7.5, 0.7, 108200, 0.615, 0.007, 3.39, 177, 243);
planets.push(planetVenus);
let planetEarth = new StellarObject("Earth", "Terrestrial", 7.9, 1.0, 149600, 1.000, 0.017, 0.00, 23, 1);
planets.push(planetEarth);
let planetMars = new StellarObject("Mars", "Terrestrial", 4.2, 1.5, 227900, 1.880, 0.093, 1.85, 25, 1.02);
planets.push(planetMars);
let planetJupiter = new StellarObject("Jupiter", "Gas giant", 142.8, 5.2, 778300, 11.867, 0.048, 1.31, 3, 0.41);
planets.push(planetJupiter);
let planetSaturn = new StellarObject("Saturn", "Gas giant", 120.7, 9.5, 1427000, 29.461, 0.058, 2.48, 27, 0.44);
planets.push(planetSaturn);
let planetUranus = new StellarObject("Uranus", "Gas giant", 51.1, 19.2, 2871000, 84.030, 0.048, 0.77, 98, 0.72);
planets.push(planetUranus);
let planetNeptune = new StellarObject("Neptune", "Gas giant", 48.6, 30.0, 4497100, 164.815, 0.010, 1.77, 29, 0.72);
planets.push(planetNeptune);
let planetPluto = new StellarObject("Pluto", "Dwarf", 2, 39.5, 5913000, 248.057, 0.248, 17.14, 120, 6.38);
planets.push(planetPluto);

// Approx angle of offset, as per 17/08/2017
var thetaoffsets = [170, 15, 130, 310, 250, 185, 60, 110, 170];

// Anchors
// Create an origin point at the centre of all axes
var origin = new Anchor(0,0,0,0,90,0);

// Orbits for planets
// Create orbits for the planets around the central anchor
var planetaryOrbits = [];
for (let i=0, len=planets.length; i<len; i++) {
	let orb = new Orbit(planets[i].getName() + "Orbit", 		//orbitID
						origin,									//parent
						planets[i].getOrbitalRadiusKm(),		//radius
						planets[i].getEccentricity()*14960,		//eccentricity * 1AU in Km
						planets[i].getPeriod()*1000,			//period
						thetaoffsets[i],						//startThetaOffset
						0,										//rotX
						0,										//rotY
						planets[i].getInclination()				//rotZ
					   );
	planetaryOrbits.push(orb);
}


// Moons and orbits
/* 
Moon: name, type, diameter(1000s of km to 2sf), orbitalRadiusAu(AU to 1 dp), orbitalRadiusKm (1000s of km) period(relative to 1 earth year), eccentricity, inclination(degrees), axial tilt, axial rotation(relative to 1 earth day)
Orbit: orbitID, parent, radius, eccentricity, period, startThetaOffset, rotX, rotY, rotZ
*/
var moons = [];
var moonOrbits = [];

let luna = new StellarObject("Luna", "Moon", 3.4, 0.00257, 384, 0.08, 0.05, 5.14, -6.68, 1);
moons.push(luna);
let lunaOrbit = new Orbit("LunaOrbit",
						  planetaryOrbits[2],
						  moons[0].getOrbitalRadiusKm(),
						  0, //moons[0].getEccentricity()*14960,
						  moons[0].getPeriod()*1000,
						  0,
						  0,
						  0,
						  moons[0].getInclination()
						 );
moonOrbits.push(lunaOrbit);


// Placeholder  - Moons are too small/fast to be seen on this scale, so ignoring for the sake of performance
/*
let io = new StellarObject("Io", "Moon", 3.6, 0, 422, 0.005, 0, 2, 0, 0);
moons.push(io);
let ioOrbit = new Orbit("IoOrbit",
						  planetaryOrbits[4],
						  moons[1].getOrbitalRadiusKm(),
						  0,
						  moons[1].getPeriod()*1000,
						  0,
						  0,
						  0,
						  moons[1].getInclination()
						 );
moonOrbits.push(ioOrbit);

let europa = new StellarObject("Europa", "Moon", 3.1, 0, 671, 0.01, 0, 1.7, 0, 0);
moons.push(europa);
let europaOrbit = new Orbit("EuropaOrbit",
						  planetaryOrbits[4],
						  moons[2].getOrbitalRadiusKm(),
						  0,
						  moons[2].getPeriod()*1000,
						  0,
						  0,
						  0,
						  moons[2].getInclination()
						 );
moonOrbits.push(europaOrbit);
*/


// Instantiate resources and set button boost values
let resourceOne = new Resource("Nuclear", 0, 0.1);
let resourceTwo = new Resource("Photonic", 0, 0.05);
let resourceOneBoost = 1;
let resourceTwoBoost = 1;


// Instantiate upgradeEvents and create related function triggers
// (eventId, name, planet, prereqEvent, prereqOne, prereqTwo, costOne, costTwo, deltaShiftOne, deltaShiftTwo, unique, displayed, done, count, flavourText, storyText)
var upgradeEvents = [];
let aBeginning = new UpgradeEvent(0,"A beginning", "earth", -1, 0, 0, 0, 0, 0, 0, true, false, false, 0, "", "The first steps");
upgradeEvents.push(aBeginning);
function upgradeevent_0() {
}

let nuclearPowerStation = new UpgradeEvent(1, "Nuclear Power Station", "earth", -1, 20, 0, 50, 0, 0.2, 0, false, false, false, 0, "Adds <span class='Nuclear'>2</span>TJ/s", "You can now purchase surface based nuclear power stations for Earth.");
upgradeEvents.push(nuclearPowerStation);
function upgradeevent_1() {
	updateResources(1);
}

let solarPowerFarm = new UpgradeEvent(2, "Solar Power Farm", "earth", -1, 0, 10, 10, 50, 0, 0.1, false, false, false, 0, "Adds <span class='Photonic'>1</span>TJ/s", "You can now purchase surface based solar farms for Earth.");
upgradeEvents.push(solarPowerFarm);
function upgradeevent_2() {
	updateResources(2);
}

let superConductors = new UpgradeEvent(3, "Make superconductors available", "earth", -1, 15, 15, 4, 5, 0, 0, true, false, false, 0, "Unlocks further technologies", "Certain technologies, such as nuclear fusion reactors require very precise control of powerful magnetic fields. Such fields are generated using electromagnets, but to have enough power and precision the material conducting the electricity has to have a very low resistance. Usually this is done by taking a metal and cooling it to extremely low temperatures. e.g. Niobium has to be cooled to 9.3&#176;K (-263.7&#176;C) ");
upgradeEvents.push(superConductors);
function upgradeevent_3() {
	updateResources(3);
}

let fusionReactor = new UpgradeEvent(4, "Fusion Reactor", "earth", 3, 15, 15, 1000, 0, 0, 0, true, false, false, 0, "Reactor adds 10 <span class='Nuclear'>1</span>TJ per click", "A fusion reactor, rather than smashing atoms apart, harnesses the energy released when elements of two atoms combine to form a different element. This is the same kind of reaction that occurs in a star. The plasma produced by such a reaction is difficult to keep stable and is typically held in position by a series of magnetic fields.");
upgradeEvents.push(fusionReactor);
function upgradeevent_4() {
	resourceOneBoost = 10;
	updateResources(4);
	document.getElementById("n_boost_amount").innerHTML = "10";
}


///////////////////////////
// Game functions  ////////
///////////////////////////

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
	} else {
		upgradeEvents[i].isDone();
		document.getElementById("upgradeevent_" + i).style.display = "none";
	}
}

// Update the values on the upgrade buttons after a click
function updateButtonVals(eventId) {
	document.getElementById("upgradeeventcount_"+eventId).innerHTML = "(x" + upgradeEvents[eventId].getCount() +")";
	document.getElementById("nuclearcost_"+eventId).innerHTML = upgradeEvents[eventId].getCostOne();
	document.getElementById("photoniccost_"+eventId).innerHTML = upgradeEvents[eventId].getCostTwo();
}

// Event listeners
document.getElementById(resourceOne.getName()+"_booster").addEventListener("click", function(){resourceOne.addAmount(resourceOneBoost);});
document.getElementById(resourceTwo.getName()+"_booster").addEventListener("click", function(){resourceTwo.addAmount(resourceTwoBoost);});

document.getElementById("system_button")
	.addEventListener("click", function(){
										currentPlanet = "system";
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
										currentPlanet = planet;
										loadPlanetaryData(planet);
										showHidePlanetaryData("show");
										showHideUpgrades("show");
										toggleCameraZoom();
										});
}

// Camera zoom listener
document.getElementById("camera_control").addEventListener("click", function(){
																	if (cameraToggle==="standard"){
																		cameraToggle="zoomed";
																	} else {
																		cameraToggle="standard";
																	}
																	toggleCameraZoom();});

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
			document.getElementById("pd_avgdist_km").innerHTML = (planets[i].getOrbitalRadiusKm()*1000).toLocaleString();
			document.getElementById("pd_avgdist_au").innerHTML = planets[i].getOrbitalRadiusAu();
			document.getElementById("pd_eccentricity").innerHTML = planets[i].getEccentricity();
			document.getElementById("pd_inclination").innerHTML = planets[i].getInclination();
			document.getElementById("pd_period").innerHTML = planets[i].getPeriod();
			break;
		}
	}
}

// Make planetbutton visible for explored planets
function planetExplored(planet){
	document.getElementById(planet).style.visibility = "visible";
	fadein(planet);
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

// Add upgradeEvents array for triggered events to the UI, if they are non-unique or are unique and have not previously been displayed
function addUpgradeEvents() {
	for (let i=0, len=upgradeEvents.length; i<len; i++) {
		let prereqEvent = upgradeEvents[i].getPrereqEvent();
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

// Checks for location and affordability of upgrades and disables/enables visibility and interaction appropriately
function checkUpgradeDisplay(planet) {
	let upgradebuttons = document.getElementsByClassName("upgradeevent");

	for (let i=0,len=upgradebuttons.length; i<len; i++) {
		let eventId = upgradebuttons[i].id.substring('upgradeevent_'.length);
		if (planet.toUpperCase()!==upgradeEvents[eventId].getPlanet().toUpperCase()) {
			document.getElementById('upgradeevent_'+eventId).style.display = "none";
		} else if (upgradeEvents[eventId].getUnique()===false || (upgradeEvents[eventId].getUnique()===true && upgradeEvents[eventId].getDone()===false)) {
			document.getElementById('upgradeevent_'+eventId).style.display = "block";
			if((resourceOne.getAmount() - upgradeEvents[eventId].getCostOne() >= 0) && (resourceTwo.getAmount() - upgradeEvents[eventId].getCostTwo() >= 0)){
				document.getElementById('upgradeevent_'+eventId).style.opacity = 1;
				document.getElementById('upgradeevent_'+eventId).style.pointerEvents = "auto";
			} else {
				document.getElementById('upgradeevent_'+eventId).style.opacity = 0.4;
				document.getElementById('upgradeevent_'+eventId).style.pointerEvents = "none";
			}
		}
	}
}

// Updates the UI values for the booster areas
function updateBoosters() {
	document.getElementById("n_boost_amount").innerHTML = resourceOneBoost;
	document.getElementById("p_boost_amount").innerHTML = resourceTwoBoost;
}

// Scrolls the story pane to the top of the next item automatically
function scrollStory(identifier) {
	document.querySelector("#"+identifier).scrollIntoView({behavior:'smooth'});
}

// fades an item in from opacity 0 to opacity 1
function fadein(identifier){
	document.querySelector("#"+identifier).style.visibility = "visible";
	document.querySelector("#"+identifier).style.opacity = 1;
}

// fades an item in from opacity 0 to opacity 1
function fadeout(identifier){
	document.querySelector("#"+identifier).style.opacity = 0;
	document.querySelector("#"+identifier).style.visibility = "hidden";
}

// Initial screen layout, centred on Earth
var currentPlanet = "earth";
loadPlanetaryData(currentPlanet);
showHidePlanetaryData("show");
showHideUpgrades("show");
fadein("ui");
//planetExplored("earth");

// Update rate, once every 10th of a second
setInterval(gameMain, 100);

///////////////////////////////////
// Main function //////////////////
///////////////////////////////////

function gameMain(){
	incrementResources();
	addUpgradeEvents();
	checkUpgradeDisplay(currentPlanet);
	updateBoosters();
}

///////////////////////////////////
// Viewer code ////////////////////
///////////////////////////////////

// Set the renderer and assign it to a div
var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
var targetDiv = document.getElementById("viewer");
renderer.setSize(targetDiv.clientWidth, targetDiv.clientHeight);
targetDiv.appendChild(renderer.domElement);

// Create the scene and camera
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, targetDiv.clientWidth / targetDiv.clientHeight, 0.1, 5500000);
var cameraToggle = "standard";
var cameraDist = 150;

// Add lights
var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
var light = new THREE.PointLight(0xffffff);
light.position.set(0,0,0).normalize();
scene.add(ambientLight);
scene.add(light);

// Add sun
var sunGeometry = new THREE.SphereGeometry(sol.getDiameter()/2, 32, 32);
var sunMaterial = new THREE.MeshBasicMaterial();
sunMaterial.map = THREE.ImageUtils.loadTexture("images/sunmap.jpg");
var sunModel = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sunModel);

var textureFlare = THREE.ImageUtils.loadTexture("images/lensflare.jpg");
var flareColour = new THREE.Color( 0xffffff );
var sunFlare = new THREE.LensFlare(textureFlare, sol.getDiameter()/16, 0, THREE.AdditiveBlending, flareColour);
sunFlare.position.set(light.position.x, light.position.y + 500, light.position.z);
scene.add(sunFlare);

// Skybox (Sphere)
var skyboxGeometry = new THREE.SphereGeometry(100000000000, 32, 32);
var skyboxMaterial = new THREE.MeshBasicMaterial();
skyboxMaterial.map = THREE.ImageUtils.loadTexture("images/eso_milkyway.jpg");
skyboxMaterial.side = THREE.BackSide;
var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
skybox.rotateZ((60*Math.PI)/180);
skybox.rotateY((-75*Math.PI)/180);
scene.add(skybox);


// Planets and planet paths
var planetModels = [];
var planetMaps = [];
var orbitalEllipses = [];
var planetEllipses = [];
for (let i=0, len=planets.length; i<len; i++) {
	let planetGeometry = new THREE.SphereGeometry((planets[i].getDiameter()/2), 64, 64);
	let planetMap = new THREE.MeshPhongMaterial();
	planetMap.side = THREE.Frontside;
	planetMap.map   = THREE.ImageUtils.loadTexture("images/" + planets[i].getName().toLowerCase() + "map.jpg");
	planetMaps.push(planetMap);
	planetModels[i] = new THREE.Mesh(planetGeometry, planetMaps[i]);
	planetModels[i].rotateZ(planets[i].getAxialTilt()*(Math.PI/180));
	scene.add(planetModels[i]);
	

	let orbitalEllipse = new THREE.EllipseCurve(
	planetaryOrbits[i].getParent().getX(),  planetaryOrbits[i].getParent().getZ(),	// ax, aY
	planetaryOrbits[i].getAphe(), planetaryOrbits[i].getPeri(),           			// xRadius, yRadius
	0,  2 * Math.PI,  // aStartAngle, aEndAngle
	false,            // aClockwise
	0                 // aRotation
	);
	let ellipsePath = new THREE.Path(orbitalEllipse.getPoints(500));
	let ellipseGeometry = ellipsePath.createPointsGeometry(500);
	let ellipseMaterial = new THREE.LineBasicMaterial({color : 0x008800, linewidth:1});
	let orbEllipse = new THREE.Line(ellipseGeometry, ellipseMaterial);
	orbitalEllipses.push(orbEllipse);
	orbEllipse.rotateX(90*(Math.PI/180)+planetaryOrbits[i].getRotX());
	orbEllipse.rotateY(planets[i].getInclination()*(Math.PI/180));
	scene.add(orbitalEllipses[i]);

	
	let planetEllipse = new THREE.EllipseCurve(
	0, 0,             // ax, aY
	12000,12000, 	  //planets[i].getDiameter()*5, planets[i].getDiameter()*5,           // xRadius, yRadius
	0,  2 * Math.PI,  // aStartAngle, aEndAngle
	false,            // aClockwise
	0                 // aRotation
	);
	let planEllipsePath = new THREE.Path(planetEllipse.getPoints(50));
	let planEllipseGeometry = planEllipsePath.createPointsGeometry(50);
	let planEllipseMaterial = new THREE.LineBasicMaterial({color : 0x00ff00, linewidth:1});
	let planEllipse = new THREE.Line(planEllipseGeometry, planEllipseMaterial);
	planEllipse.rotateX(-15*(Math.PI/180));
	planetEllipses.push(planEllipse);
	scene.add(planetEllipses[i]);
}

// Moons
var moonModels = [];
for (let i=0, len=moons.length; i<len; i++) {
	let moonGeometry = new THREE.SphereGeometry((moons[i].getDiameter()/2), 32, 32);
	let moonMap = new THREE.MeshPhongMaterial();
	// planetMap.side = THREE.Frontside;
	// planetMap.map   = THREE.ImageUtils.loadTexture("images/" + planets[i].getName().toLowerCase() + "map.jpg");
	// planetMaps.push(planetMap);
	moonModels[i] = new THREE.Mesh(moonGeometry, moonMap);
	moonModels[i].rotateZ(moons[i].getAxialTilt()*(Math.PI/180));
	scene.add(moonModels[i]);
}

// redraws the camera and renderer on a window resize
window.addEventListener('resize', function(){
	renderer.setSize(0,0);
	renderer.setSize(targetDiv.offsetWidth, targetDiv.offsetHeight);
	camera.aspect = targetDiv.offsetWidth / targetDiv.clientHeight;
	camera.updateProjectionMatrix();
});

// Toggles the camera zoom when looking at a planet
function toggleCameraZoom() {
	if (cameraToggle==="zoomed") {
		for (let i=0, len=planets.length; i<len; i++) {
			if (currentPlanet.toUpperCase()===planets[i].getName().toUpperCase()) {
				cameraDist = planets[i].getDiameter()*2;
			}
		}
	} else {
		cameraDist = 150;
	}
}

// Main viewer loop
function animate() {
		
	for (let i=0, len=planets.length; i<len; i++) {
		
		if (currentPlanet.toUpperCase()==="SYSTEM") {
			camera.position.set(0, 350000, 1500000);
			camera.rotation.set(-15*(Math.PI)/180,0,0);
			fadeout("camera_control");
			planetEllipses[i].position.set(planetaryOrbits[i].getX(), planetaryOrbits[i].getY(), planetaryOrbits[i].getZ());
			orbitalEllipses[i].position.set(0,0,0);
			sunFlare.position.set(light.position.x, light.position.y + 500, light.position.z);
		} else if (currentPlanet.toUpperCase()===planets[i].getName().toUpperCase()) {
			for(let i=0, len=planets.length; i<len; i++) {
				planetEllipses[i].position.set(0,10000000,0);
				orbitalEllipses[i].position.set(0,10000000,0);
			}
			sunFlare.position.set(0,100000000,0);
			fadein("camera_control");
			document.getElementById("camera_dist").innerHTML = (cameraDist*1000).toLocaleString() + "km (" + cameraToggle + ")";
			camera.position.set(planetaryOrbits[i].getX(), planetaryOrbits[i].getY(), cameraDist + planetaryOrbits[i].getZ());
			camera.rotation.set(0, 0, 0);
		}
		planetModels[i].position.set(planetaryOrbits[i].getX(), planetaryOrbits[i].getY(), planetaryOrbits[i].getZ());
		planetModels[i].rotateY(0.01/planets[i].getRotationPeriod());
		planetaryOrbits[i].update();
		
		
	}
	
	for (let i=0, len=moons.length; i<len; i++) {
		moonModels[i].position.set(moonOrbits[i].getX(), moonOrbits[i].getY(), moonOrbits[i].getZ());
		moonModels[i].rotateY(0.01/moons[i].getRotationPeriod());
		moonOrbits[i].update();
	}
	
	
	camera.updateProjectionMatrix();
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}
animate();