import "./styles.css"; // keep this here!

// naimportujte vše co je potřeba z BabylonJS
import {
  Engine,
  Scene,
  UniversalCamera,
  MeshBuilder,
  Path3D,
  StandardMaterial,
  DirectionalLight,
  Vector3,
  Math,
  Axis,
  Space,
  Color3,
  SceneLoader,
  DeviceOrientationCamera,
  Mesh,
  Animation
} from "@babylonjs/core";
import "@babylonjs/inspector";
import { shadowOnlyPixelShader } from "@babylonjs/materials/shadowOnly/shadowOnly.fragment";

//canvas je grafické okno, to rozáhneme přes obrazovku
const canvas = document.getElementById("renderCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const engine = new Engine(canvas, true);

//scéna neměnit
const scene = new Scene(engine);
// Default Environment

//vytoření kamery v pozici -5 (dozadu)
const camera = new DeviceOrientationCamera(
  "kamera",
  new Vector3(1, 1, 10),
  scene
);

//zaměřit kameru do středu
camera.setTarget(new Vector3(0, 1, 0));

//spojení kamery a grafikcého okna
camera.attachControl(canvas, true);

//zde přídáme cyklus for

//světlo
const light1 = new DirectionalLight(
  "DirectionalLight",
  new Vector3(-1, -1, -1),
  scene
);

//vytvoření cesty

//vykreslení křivky
var sword = MeshBuilder.CreateCylinder("sword", { diameter: 0.00001 });

SceneLoader.ImportMesh("", "public/", "MineCraftSword.stl", scene, function (
  newMesh
) {
  newMesh[0].rotate(new Vector3(-1, 0, 0), 80);
  newMesh[0].position = new Vector3(-1, 2, 0);
  sword = newMesh[0];
  shadowOnlyPixelShader.scaling = new Vector3(1, 1, 1);
});

//úhly a rotace

var x = 0;
scene.registerBeforeRender(function () {
  if (sword.position.y < 3 && x == 0) {
    sword.position.y += 0.05;
  }

  if (sword.position.y > 1 && x == 1) {
    sword.position.y -= 0.05;
  }

  if (sword.position.y == 3) {
    x = 1;
  }

  if (sword.position.y == 1) {
    x = 0;
  }

  sword.rotate(new Vector3(0, 0, 1), (sword.rotation.y = 0.01));
});

//animace

// povinné vykreslování
engine.runRenderLoop(function () {
  scene.render();
});
const environment1 = scene.createDefaultEnvironment({
  enableGroundShadow: true
});
// zde uděláme VR prostředí

scene.debugLayer.show();
