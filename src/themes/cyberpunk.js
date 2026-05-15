import { isoProject } from "../city/projection.js";

export default {
    name: "cyberpunk",
    
    defs: `
        <linearGradient id="cyberSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#090514" />
            <stop offset="50%" stop-color="#140c2b" />
            <stop offset="100%" stop-color="#2a0a3a" />
        </linearGradient>
    `,
    backgroundFill: "url(#cyberSky)",

    top: contribution => {
        if (contribution === 0) return "#150e26"; 
        if (contribution <= 3) return "#271642";
        if (contribution <= 6) return "#401c6b";
        if (contribution <= 9) return "#672391";
        return "#8a145c";
    },
    left: contribution => {
        if (contribution === 0) return "#0e091a";
        if (contribution <= 3) return "#1c0e30";
        if (contribution <= 6) return "#2e124f";
        if (contribution <= 9) return "#4c166e";
        return "#6e0c47";
    },
    right: contribution => {
        if (contribution === 0) return "#090514";
        if (contribution <= 3) return "#120921";
        if (contribution <= 6) return "#1e0b36";
        if (contribution <= 9) return "#340d4d";
        return "#4f0731";
    },

    windowColor: contribution => {
        const colors = ["#42f5e8", "#f542a1", "#f7d959", "#b542f5"];
        return colors[Math.floor(Math.random() * colors.length)];
    },

    extraBackground: (buildings) => {
        if (!buildings || buildings.length < 2) return "";

        let numCars = Math.floor(buildings.length / 5);
        
        let trafficSVG = "";
        const trafficColors = ["#42f5e8", "#f542a1", "#f7d959"]; 

        for (let i = 0; i < numCars; i++) {
            const b1 = buildings[Math.floor(Math.random() * buildings.length)];
            let b2 = buildings[Math.floor(Math.random() * buildings.length)];
            
            while (b1 === b2) {
                b2 = buildings[Math.floor(Math.random() * buildings.length)];
            }

            const z1 = 2 + Math.random() * (b1.height || 5);
            const z2 = 2 + Math.random() * (b2.height || 5);

            const p1 = isoProject(b1.x, b1.y, z1);
            const p2 = isoProject(b2.x, b2.y, z2);

            const color = trafficColors[Math.floor(Math.random() * trafficColors.length)];
            const dur = 4 + Math.random() * 5; 
            const delay = Math.random() * 5;     

            trafficSVG += `
                <line
                    x1="${p1.x}" y1="${p1.y}"
                    x2="${p2.x}" y2="${p2.y}"
                    stroke="${color}"
                    stroke-width="1.2"
                    opacity="0.75"
                    pathLength="100"
                    stroke-dasharray="1.5 100"
                >
                    <animate
                        attributeName="stroke-dashoffset"
                        from="100"
                        to="-2"
                        dur="${dur}s"
                        begin="${delay}s"
                        repeatCount="indefinite"
                    />
                </line>
            `;
        }

        return trafficSVG;
    }
};