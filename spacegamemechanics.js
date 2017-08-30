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


// Instantiate resources and set button boost values
let resourceOne = new Resource("Nuclear", 0, 0.0);
let resourceTwo = new Resource("Photonic", 0, 0.0);
let resourceOneBoost = 1;
let resourceTwoBoost = 1;


// Instantiate upgradeEvents and create related function triggers
// (eventId, name, planet, prereqEvent, prereqOne, prereqTwo, costOne, costTwo, deltaShiftOne, deltaShiftTwo, unique, displayed, done, count, flavourText, storyText)
var upgradeEvents = [];

let begin = new UpgradeEvent(0,"begin", "earth", -1, 0, 0, 0, 0, 0, 0, true, true, false, 0, "", "");
upgradeEvents.push(begin);
function upgradeevent_0() {
	upgradeEvents[0].isDone();
	fadeout("begin");
	document.getElementById("begin").innerHTML = "NEXT";
	document.getElementById("begin").addEventListener("click", function(){upgradeevent_1();});
	fadein("begin");
}

let aBeginning = new UpgradeEvent(1,"A beginning", "earth", 0, 0, 0, 0, 0, 0, 0, true, false, false, 0, "", "Earth.<br><br>'The pale blue dot' of Carl Sagan's poem. It's fascinating, but far from the only planet in our solar system.<br><br>It would be great to visit them all, but getting to each one takes a certain amount of effort. We're tracking the Earth's orbit right now, so you may see the Sun appear to fly by in the distance. We're the ones moving around it though. The Sun is HUGE, you could fit 109 Earths across it, but it's so far away that it appears as a small dot from here.");
upgradeEvents.push(aBeginning);
function upgradeevent_1() {	
	upgradeEvents[1].isDone();
	fadeout("begin");
	document.getElementById("begin").addEventListener("click", function(){upgradeevent_2();});
	fadein("begin");
}

let lightsOn = new UpgradeEvent(2,"Lights On", "earth", 1, 0, 0, 0, 0, 0, 0, true, false, false, 0, "", "But first of all, lets determine what exactly we are doing up here in the first place.<br><br>We must be looking down on Earth from some kind of camera, but you don't just get cameras up in space without some sort of spacecraft.<br><br> Lets turn on the lights in the ship.");
upgradeEvents.push(lightsOn);
function upgradeevent_2() {
	upgradeEvents[2].isDone();
	fadeout("begin");
	document.getElementById("begin").addEventListener("click", function(){revealReactors();});
	fadein("upgrades");
	fadein("begin");
}

function revealReactors() {
	fadeout("begin");
	fadein("resource1");
	fadein("resource2");
	fadein("Nuclear_booster");
	fadein("Photonic_booster");
}

let firstUpgrade = new UpgradeEvent(3,"The first upgrade", "earth", 2, 0, 0, 5, 5, 0, 0, true, false, false, 0, "Turn on the ship lights", "So, there's our first upgrade... turning on the lights.<br><br>Notice how the upgrade is greyed out at the moment? We can't do anything without power.<br><br>Those numbers indicate the cost in <span class='Nuclear'>nuclear</span> and <span class='Photonic'>photonic</span> (light) energy. Luckily, we have an onboard reactor and a set of solar cells on the outside of the ship.<br><br>Automated systems are down though, so to start with we'll have to trigger the energy generation ourselves.<br><br>Try to generate 5 of each type of energy, then turn on the lights...");
upgradeEvents.push(firstUpgrade);
function upgradeevent_3() {
	updateResources(3);
	fadein("toparea");
	fadein("planetary_data");
	document.getElementById("upgrades").style.backgroundImage = "url('images/sidepanel_join_topleft.png'), url('images/sidepanel_join_bottomleft.png'), url('images/sidepanel_leftborder.png')";
	document.getElementById("upgrades").style.backgroundPosition = "top left, bottom left, left";
	document.getElementById("upgrades").style.backgroundRepeat = "no-repeat, no-repeat, repeat-y";
	document.getElementById("upgrades").style.backgroundColor = "rgba(0,0,0,0.5)";
	
	document.getElementById("storybox").style.backgroundImage = "url('images/sidepanel_join_topright.png'), url('images/sidepanel_rightborder.png'),	url('images/sidepanel_join_topleft.png'), url('images/sidepanel_leftborder.png'), url('images/topbar_border.png')";
	document.getElementById("storybox").style.backgroundPosition = "top right, top right, top left, left, top";
	document.getElementById("storybox").style.backgroundRepeat = "no-repeat, repeat-y, no-repeat, repeat-y, repeat-x";
	document.getElementById("storybox").style.backgroundColor = "linear-gradient(to bottom left, #222222, #000000 80%)";
	fadein("earth");
}


let powerUp = new UpgradeEvent(4,"Radio telescope", "earth", 3, 0, 0, 100, 100, 0, 0, true, false, false, 0, "Enables the System view", "Ahha! The lights are on!<br><br>Do you see how the energy cost was removed from your stores?<br><br>Well, there's a bonus, seems our planetary data scanner (left) and system navigation menu (top) are online too.<br><br>Lets build a powerful radio telescope and add a system view to the navigation menu, it'll allow us to see the orbits of all of the planets.");
upgradeEvents.push(powerUp);
function upgradeevent_4() {
	updateResources(4);
	fadein("system_button");
}


let nuclearPlant = new UpgradeEvent(5,"Nuclear power plant", "earth", 3, 10, 0, 10, 0, 0.1, 0, false, false, false, 0, "Adds <span class='Nuclear'>1</span>TJ/s", "It's going to get very tedious if we have to generate all of this energy ourselves.<br><br>Lets use some of our stored energy to create an automatic income of <span class='Nuclear'>1</span>TJ/s by building a nuclear power plant on Earth.<br><br>We can build as many of these as we want, but the cost will go up each time!");
upgradeEvents.push(nuclearPlant);
function upgradeevent_5() {
	updateResources(5);
}

let solarFarm = new UpgradeEvent(6,"Solar energy farm", "earth", 3, 0, 10, 5, 15, 0, 0.1, false, false, false, 0, "Adds <span class='Photonic'>1</span>TJ/s", "A lot of sunlight is hitting the earth's surface.<br><br>Lets build a solar farm on Earth and gain an automatic income of <span class='Photonic'>1</span>TJ/s.<br><br>Solar farms are expensive, but we can build as many as we want!<br><br>Each one is slightly more expensive than the last.");
upgradeEvents.push(solarFarm);
function upgradeevent_6() {
	updateResources(6);
}

let orbitalTech = new UpgradeEvent(7,"Research orbital launch tech", "earth", 4, 0, 0, 150, 150, 0, 0, true, false, false, 0, "Enables orbital technologies", "Excellent, now we have added a 'System view' button to our navigation menu (top) and can see where all of the planets are! (Though not yet which one is which...)<br><br>If we want to visit them to gather more information we're going to need much better technology and far more energy than this.<br><br>Lets start by developing our ability to put things into orbit.");
upgradeEvents.push(orbitalTech);
function upgradeevent_7() {
	updateResources(7);
}

let orbNukePlant = new UpgradeEvent(8,"Orbital nuclear research", "earth", 7, 0, 0, 80, 150, 0, 0, true, false, false, 0, "Orbital nuclear research", "We've reached the limit of what we can do on Earth with nuclear power.<br><br>Fission is the best we can manage there, we need to build an orbital research station to investigate the possbility of nuclear fusion at lower gravity.<br><br>Getting it into orbit should be easy, but it'll need a big input of solar energy to power all of those computers and research systems.");
upgradeEvents.push(orbNukePlant);
function upgradeevent_8() {
	updateResources(8);
}

let orbSolarFarm = new UpgradeEvent(9,"Orbital solar farm", "earth", 7, 0, 0, 150, 20, 0, 0.3, false, false, false, 0, "Adds <span class='Photonic'>3</span>TJ/s", "All of those clouds get in the way of our precious sunlight.<br><br>Lets build a solar farm in orbit for <span class='Photonic'>5</span>TJ/s.<br><br>It will take an investment of high density nuclear energy to get each satellite into orbit first though.");
upgradeEvents.push(orbSolarFarm);
function upgradeevent_9() {
	updateResources(9);
}


let superConductors = new UpgradeEvent(10, "Make superconductors available", "earth", 8, 0, 0, 250, 500, 0, 0, true, false, false, 0, "Unlocks further technologies", "Certain technologies, such as nuclear fusion reactors, require very precise control of powerful magnetic fields. Such fields are generated using electromagnets, but to have enough power and precision the material conducting the electricity has to have a very low resistance.<br><br>Usually this is done by taking a metal and cooling it to extremely low temperatures. e.g. Niobium, which has to be cooled to 9.3&#176;K (-263.7&#176;C)");
upgradeEvents.push(superConductors);
function upgradeevent_10() {
	updateResources(10);
}

let fusionReactor = new UpgradeEvent(11, "Prototype Fusion Reactor", "earth", 10, 15, 15, 500, 100, 0, 0, true, false, false, 0, "Reactor adds <span class='Nuclear'>10</span>TJ per click", "A prototype fusion reactor for this craft.<br><br>Rather than smashing atoms apart, fusion harnesses the energy released when elements of two atoms combine to form a different element. This is the same kind of reaction that occurs in a star. The plasma produced by such a reaction is difficult to keep stable and is typically held in position by a series of magnetic fields.<br><br>Your onboard nuclear reactor now adds <span class='Nuclear'>10</span>TJ per click.");
upgradeEvents.push(fusionReactor);
function upgradeevent_11() {
	resourceOneBoost = 10;
	updateResources(11);
	document.getElementById("n_boost_amount").innerHTML = "10";
}

let orbFusionReactor = new UpgradeEvent(12, "Orbital Fusion Reactor", "earth", 11, 0, 0, 300, 200, 1, 0, false, false, false, 0, "Adds <span class='Nuclear'>10</span>TJ/s", "Now that the prototype fusion reactor is installed and working, we can expand the technology to other space bound platforms<br><br>This will help generate a more regular income of nuclear energy.");
upgradeEvents.push(orbFusionReactor);
function upgradeevent_12() {
	updateResources(12);
}

let marsLander = new UpgradeEvent(13, "Mars Lander", "earth", 12, 0, 0, 3500, 2000, 0, 0, true, false, false, 0, "Send an unmanned mission to Mars", "With all of this abundant energy, it's about time we considered heading to another planet.<br><br>Lets send a robotic lander out to Mars to gather data.<br><br>This will unlock Mars as a planet you can view in the system navigation bar above.");
upgradeEvents.push(marsLander);
function upgradeevent_13() {
	updateResources(13);
	fadein("mars");
}

let demoUnlock = new UpgradeEvent(14, "Welcome to Mars", "mars", 13, 0, 0, 100, 100, 0, 0, true, false, false, 0, "Unlock all planets", "Congratulations, you can now view Mars and unlock the rest of the planet navigation to browse the solar system.<br><br>You've made it to the end of the demo content.<br><br>If you could offer some <a href='https://goo.gl/forms/HHOVaTXTIoKG3Hlr1'>feedback</a> on this demo, that would be very much appreciated.");
upgradeEvents.push(demoUnlock);
function upgradeevent_14() {
	updateResources(14);
	fadein("mercury");
	fadein("venus");
	fadein("jupiter");
	fadein("saturn");
	fadein("neptune");
	fadein("uranus");
	fadein("pluto");
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
		upgradeEvents[i].isDone();
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
document.getElementById("begin").addEventListener("click", function(){upgradeevent_0();});

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
	planetMap.map = THREE.ImageUtils.loadTexture("images/" + planets[i].getName().toLowerCase() + "map.jpg");
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
			camera.position.set(planetaryOrbits[i].getX(), cameraDist/3.5 + planetaryOrbits[i].getY(), cameraDist + planetaryOrbits[i].getZ());
			camera.rotation.set(-15*(Math.PI)/180, 0, 0);
		}
		planetModels[i].position.set(planetaryOrbits[i].getX(), planetaryOrbits[i].getY(), planetaryOrbits[i].getZ());
		planetModels[i].rotateY(0.01/planets[i].getRotationPeriod());
		planetaryOrbits[i].update();
	}
	
	camera.updateProjectionMatrix();
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}
animate();