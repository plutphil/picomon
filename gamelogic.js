let creaturetypes = [];
const alltraits = [
    "water",
    "fire",
    "electric",
    "earth",
    "plant",
    "air",
    "ice",
    "light",
    "dark",
    "metal",
    "poison",
    "psychic",
    "shadow",
    "fairy",
    "stone",
    "cosmic"
];
const traitsWithColors = {
    water: "#4A90E2",
    fire: "#E94E77",
    electric: "#F5C518",
    earth: "#A67B5B",
    plant: "#4CAF50",
    air: "#9ACEEB",
    ice: "#A1DFF7",
    light: "#FFF176",
    dark: "#4A4A4A",
    metal: "#B0BEC5",
    poison: "#7E57C2",
    psychic: "#FF4081",
    shadow: "#2C3E50",
    fairy: "#F8BBD0",
    stone: "#8D6E63",
    cosmic: "#6A1B9A"
};
const biomes = {
    forest: ["plant", "earth", "fairy", "poison"],
    desert: ["fire", "stone", "light", "shadow"],
    ocean: ["water", "ice", "electric"],
    mountain: ["stone", "earth", "metal"],
    sky: ["air", "light", "cosmic"],
    tundra: ["ice", "dark", "shadow"],
    swamp: ["poison", "dark", "water"],
};

const timeOfDay = {
    morning: ["light", "plant", "fairy", "air"],
    afternoon: ["fire", "electric", "stone", "earth"],
    evening: ["shadow", "dark", "poison", "cosmic"],
    night: ["dark", "shadow", "psychic", "ice"],
};

for (let i = 0; i < 100; i++) {
    let numtraits = Math.floor(Math.random() * 2) + 1;
    let traits = [];
    for (let X = 0; X < numtraits; X++) {
        traits.push(pickRandom(alltraits));
    }
    creaturetypes.push({
        name: generateName(),
        img: generateCreatureBase64(),
        width: 1 + Math.random() * 10,
        height: 1 + Math.random() * 10,
        weight: 1 + Math.random() * 10,
        strength: 1 + Math.random() * 10,
        rareness: 1 + Math.random() * 10,
        traits: traits
    })
}
console.log(creaturetypes);

function generateIndividual(c) {
    return {
        name: c.name,
        type: c,
        width: c.width + Math.random(),
        height: c.height + Math.random(),
        weight: c.weight + Math.random(),
        strength: c.strength + Math.random(),
        rareness: c.rareness + Math.random(),
        timecatched:new Date().toLocaleString()
    };
}
