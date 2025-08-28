import * as THREE from 'three';

const group = new THREE.Group();

const spriteMaterial = new THREE.SpriteMaterial({
    color: 'orange'
});

const sprite = new THREE.Sprite(spriteMaterial);

group.add(sprite);

export default group;