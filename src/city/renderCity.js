import renderBuilding from "./building.js";
import createBuildings from "./createBuildings.js";
import depthSort from "./depthSort.js";

export default function renderCity(heightMap, theme) {
    let buildings = createBuildings(heightMap);
    buildings = depthSort(buildings);

    let svgBuildings = "";

    for (const building of buildings) {
        svgBuildings += `
            <g>
                ${renderBuilding(building, theme)}
            </g>
        `;
    }

    const defsBlock = theme.defs ? `<defs>${theme.defs}</defs>` : "";

    return `
<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1200 800"
>
    ${defsBlock}
    <rect
        width="100%"
        height="100%"
        fill="${theme.backgroundFill}"
    />

    <g transform="translate(140, 100)">
        ${svgBuildings}
    </g>
</svg>
`;
}