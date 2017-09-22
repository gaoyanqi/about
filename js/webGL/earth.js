function Earth(container, width, height) {
	this.container = container;
	this.width = width;
	this.height = height;

	var stats;
	var camera, scene, renderer;
	var group;
	var mouseX = 0, mouseY = 0;

	this.windowHalfX = this.width / 2;
	this.windowHalfY = this.height / 2;

	var that = this;

	this.init = function() {
		camera = new THREE.PerspectiveCamera(60, this.width / this.height, 1, 2000);
		camera.position.z = 500;

		scene = new THREE.Scene();
		scene.background = new THREE.Color(0xf1f2f6);

		group = new THREE.Group();
		scene.add(group);

		// earth
		var loader = new THREE.TextureLoader();
		loader.load('images/land_ocean_ice_cloud_2048.jpg', function(texture) {
			var geometry = new THREE.SphereGeometry(200, 20, 20);

			var material = new THREE.MeshBasicMaterial({
				map: texture,
				overdraw: 0.5
			});
			var mesh = new THREE.Mesh(geometry, material);
			group.add(mesh);
		});

		// shadow
		var canvas = document.createElement('canvas');
		canvas.width = 128;
		canvas.height = 128;

		var context = canvas.getContext('2d');
		var gradient = context.createRadialGradient(
			canvas.width / 2,
			canvas.height / 2,
			0,
			canvas.width / 2,
			canvas.height / 2,
			canvas.width / 2
			);
		gradient.addColorStop(0.1, 'rgba(210, 210, 210, 1)');
		gradient.addColorStop(1, 'rgba(241, 242, 246, 1)');

		context.fillStyle = gradient;
		context.fillRect(0, 0, canvas.width, canvas.height);

		var texture = new THREE.CanvasTexture(canvas);

		var geometry = new THREE.PlaneBufferGeometry(300, 300, 3, 3);
		var material = new THREE.MeshBasicMaterial({
			map: texture,
			overdraw: 0.5
		});

		var mesh = new THREE.Mesh(geometry, material);

		mesh.position.y = - 250;
		mesh.rotation.x = - Math.PI / 2;
		group.add(mesh);

		renderer = new THREE.CanvasRenderer({ alpha: true });
		renderer.setClearColor(0x000000, 0);
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(this.width, this.height);
		this.container.appendChild(renderer.domElement);

		//stats = new Stats();
		//this.container.appendChild(stats.dom);

		document.addEventListener('resize', this.onWindowResize, false);
	}

	this.onWindowResize = function() {
		this.windowHalfX = this.width / 2;
		this.windowHalfY = this.height / 2;


		camera.aspect = this.width / this.height;
		camera.updateProjectionMatrix();

		renderer.setSize(this.width, this.height);
	}

	function animate() {
		requestAnimationFrame(animate);

		that.render();
		//stats.update();
	}

	this.render = function() {
		camera.position.x += (mouseX - camera.position.x) * 0.05;
		camera.position.y += (- mouseY - camera.position.y) * 0.05;
		camera.lookAt(scene.position);

		group.rotation.y -= 0.005;

		renderer.render(scene, camera);
	}

	this.init();
	animate();
}