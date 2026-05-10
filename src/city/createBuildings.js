export default function createBuildings(heightMap) {
    const buildings = [];

    for (let x = 0; x < heightMap.length; x++) {
        
        for (let y = 0; y < heightMap[x].length; y++) {
            const contribution = heightMap[x][y];

            const height = contribution === 0 ? 2 : 4 + contribution * 1.5;

            buildings.push({
                x,
                y,
                contribution,
                height,
                depth: x + y
            });
        }
    }

    return buildings;
}