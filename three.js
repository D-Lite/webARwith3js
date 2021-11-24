var camera, scene, renderer, geometry, material, mesh, ambientLight, directonalLight;

init();
// animate();

function init() {
    scene = new THREE.Scene();

    ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    directonalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directonalLight.position.set(200, 500, 300);
    scene.add(directonalLight);

    const aspectRatio = window.innerWidth / window.innerHeight;
    const cameraWidth = 150;
    const cameraHeight = cameraWidth / aspectRatio;

    camera = new THREE.OrthographicCamera(
        cameraWidth / -2, // left
        cameraWidth / 2, // right
        cameraHeight / 2, //top
        cameraHeight / -2, // bottom
        0, // near plane
        1000 // far plane
    );

    camera.position.set(200, 200, 200);
    camera.lookAt(0, 10, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);

    document.body.appendChild(renderer.domElement);
     
}

// function animate() {
//     requestAnimationFrame(animate)

//     mesh.rotation.x += 0.01;
//     mesh.rotation.y += 0.02;

//     renderer.render(scene, camera)
// }


createWheels = () => {
    geometry = new THREE.BoxBufferGeometry(12, 12, 33);
    material = new THREE.MeshLambertMaterial({ color: 0x333333 });
    const wheel = new THREE.Mesh(geometry, material);

    return wheel;
}

createCar = () => {
    const car = new THREE.Group();

    const backWheel = createWheels();
    backWheel.position.y = 6;
    backWheel.position.x = -18;
    car.add(backWheel)

    const frontWheel = createWheels();
    frontWheel.position.y = 6;
    frontWheel.position.x  = 18;
    car.add(frontWheel)

    const main = new THREE.Mesh(
        new THREE.BoxBufferGeometry(60, 15, 30),
        new THREE.MeshLambertMaterial({ color: 0x78b14b })
    );

    main.position.y = 12;
    car.add(main);

    const carFrontTexture = getCarFrontTexture();
    
    const carBackTexture = getCarFrontTexture();
    
    const carRightSideTexture = getCarSideTexture();
    
    var carLeftSideTexture = getCarSideTexture();

    carLeftSideTexture = new THREE.Vector2(0.5, 0.5);
    carLeftSideTexture.rotation = Math.PI
    carLeftSideTexture.flipY = false;


    const cabin = new THREE.Mesh(
        new THREE.BoxBufferGeometry(33, 12, 24), [
            new THREE.MeshLambertMaterial({ map: carFrontTexture }),
            new THREE.MeshLambertMaterial({ map: carBackTexture }),
            new THREE.MeshLambertMaterial({color: 0xffffff}), // top
            new THREE.MeshLambertMaterial({color: 0xffffff}), // bottom
            new THREE.MeshLambertMaterial({ map: carRightSideTexture }),
            new THREE.MeshLambertMaterial({ map: carLeftSideTexture })
        ]
    );

    cabin.position.x = -6;
    cabin.position.y = 25.5;
    car.add(cabin)

    return car
}

const car = createCar();
scene.add(car);

renderer.render(scene, camera)

function getCarFrontTexture() {
    const canvas = document.createElement("canvas");
    canvas.width =  64
    canvas.height = 32

    const context = canvas.getContext("2d")

    context.fillStyle  = "#ffffff"
    context.fillRect(0, 0, 64, 32)

    context.fillStyle  = "#666666"
    context.fillRect(0, 0, 64, 32)

    return new THREE.CanvasTexture(canvas)
}

function getCarSideTexture() {
    const canvas = document.createElement("canvas");
    canvas.width =  128
    canvas.height = 32

    const context = canvas.getContext("2d")

    context.fillStyle  = "#ffffff"
    context.fillRect(0, 0, 128, 32)

    context.fillStyle  = "#666666"
    context.fillRect(10, 8, 38, 24)
    context.fillRect(58, 8, 60, 24)

    return new THREE.CanvasTexture(canvas)
}