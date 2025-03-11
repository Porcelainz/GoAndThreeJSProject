import * as THREE from 'three';
import { getObjects } from './api.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// 創建 Three.js 場景
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 10000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("webgl"), alpha: true });
renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var x = 0;
var y = 0;
var z = 0;
var a = 0;
var b = 0;
var c = 0;
var i = 0;
var j = 0;
var k = 0;
var g = 0;
var o = 0;
var p = 0;
// 加載物件
let cubeArr = [];
let rotationSpeeds = [];
getObjects().then(objects => {
    objects.forEach(obj => {
        const geometry = createGeometry(obj); // 根據 type 創建不同形狀的 geometry
        const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff }); // 隨機顏色

        const shape = new THREE.Mesh(geometry, material);

        // 解析 position，並設置物體的位置
        //const position = JSON.parse(obj.position);
        if (obj.Quadrant === 1) {
        shape.position.set(x, y, z);
        x += 50;
        y += 25;
        z += 1;
        }
        else if ((obj.Quadrant === 2)) {
            i += 50;
            j -= 25;
            k -= 1;
            shape.position.set(i, j, k);
        }
        else if ((obj.Quadrant === 3)) {
            g -= 50;
            o += 25;
            p -= 1;
            shape.position.set(g, o, p);
        }
        else {
            a -= 50;
            b -= 25;
            c -= 1;
            shape.position.set(a, b, c);
        }
        cubeArr.push(shape);
        rotationSpeeds.push({
            x: Math.random() * 0.02, // Random speed between 0 and 0.02 for X-axis
            y: Math.random() * 0.02  // Random speed between 0 and 0.02 for Y-axis
        });
    });
    scene.add(...cubeArr);
   
});

// 創建不同形狀的 geometry
function createGeometry(obj) {
    switch(obj.Type) {
        case 1: // Cube
            return new THREE.BoxGeometry(obj.Position_x, obj.Position_y, obj.Position_z); // 方塊
        case 2: // Sphere
            return new THREE.SphereGeometry(obj.Position_x, obj.Position_y, obj.Position_z); // 圓形
        case 3: // Cone
            return new THREE.ConeGeometry(obj.Position_x, obj.Position_y, obj.Position_z); // 圓錐
        // 其他形狀可以在這裡擴展
        default:
            return new THREE.BoxGeometry(obj.Position_x, obj.Position_y, obj.Position_z); // 默認為方塊
    }
}

camera.position.set(0, 0, 200);

// 創建 OrbitControls，讓相機可用鼠標控制
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 啟用阻尼（平滑效果）
controls.dampingFactor = 0.25; // 阻尼的強度
controls.screenSpacePanning = false; // 禁用屏幕空間平移

// 渲染循環
function animate() {
    requestAnimationFrame(animate);
    cubeArr.forEach((obj, index) => {
        obj.rotation.x += rotationSpeeds[index].x;
        obj.rotation.y += rotationSpeeds[index].y;
    });

    controls.update(); // 更新 controls
    renderer.render(scene, camera);
}
animate();