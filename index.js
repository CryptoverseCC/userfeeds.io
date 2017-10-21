// import 'normalize.css';
import * as THREE from 'three';
import throttle from 'lodash/throttle';

import './scss/style.scss';
import headsUp from './header.js';
// import './hero.js';

var _ = require('lodash');
var renderer, scene, camera, composer, skelet;

window.onload = function() {
  if (document.getElementById('ThreeJS')) {
    init();
    animate();
  }

  // Instantiate HeadsUp
  new headsUp( '.main-header' );
}

let renderer, scene, camera, composer, skelet;
function initThree() {
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  renderer.setClearColor(0x000000, 0.0);
  document.getElementById('ThreeJS').appendChild(renderer.domElement);

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0F131D, 1, 1000);

  camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 820;
  camera.position.x = 0;
  camera.position.y = 0;
  scene.add(camera);

  skelet = new THREE.Object3D();
  scene.add(skelet);

  skelet.position.y = 0;

  var geom = new THREE.IcosahedronGeometry(15, 2);
  var bones = new THREE.MeshPhongMaterial({
    color: 0x3F424A,
    wireframe: true,
    side: THREE.DoubleSide
  });

  var mesh = new THREE.Mesh(geom, bones);
  mesh.scale.x = mesh.scale.y = mesh.scale.z = 25;
  skelet.add(mesh);

  var ambientLight = new THREE.AmbientLight(0x0F131D);
  scene.add(ambientLight);

  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);

  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  skelet.rotation.z -= .001;
  skelet.rotation.y = 0;
  skelet.rotation.x = 0;
  renderer.clear();

  renderer.render( scene, camera );
};

