	var targetDiv = document.getElementById("viewer");
	
	
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 75, targetDiv.offsetWidth / targetDiv.clientHeight, 0.1, 1000 );
	camera.position.z = 5;
	
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( targetDiv.clientWidth, targetDiv.clientHeight );
	targetDiv.appendChild( renderer.domElement );
	
	var geometry = new THREE.SphereGeometry( 2, 32, 32 );
	var material = new THREE.MeshPhongMaterial();
	var planetSphere = new THREE.Mesh( geometry, material );
	scene.add( planetSphere );

	var light = new THREE.DirectionalLight( 0xffffff );
	light.position.set( 1, 0, 1 ).normalize();
	scene.add(light);

	window.addEventListener('resize', function(){
		renderer.setSize(0,0);
		renderer.setSize(targetDiv.offsetWidth, targetDiv.offsetHeight);
		camera.aspect = targetDiv.offsetWidth / targetDiv.clientHeight;
		camera.updateProjectionMatrix();
	});
	
	function animate() {
		requestAnimationFrame( animate );
		planetSphere.rotation.x += 0.001;
		//cube.rotation.y += 0.1;
		renderer.render( scene, camera );
	}
	animate();