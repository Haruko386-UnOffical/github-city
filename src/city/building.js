import { isoProject } from "./projection.js";

function polygon(points, fill, extraAttributes = "") {
    return `<polygon points="${points}" fill="${fill}" stroke="rgba(0,0,0,0.3)" stroke-width="0.5" ${extraAttributes}/>`;
}

function createWindows(x, y, size, height, contribution, theme) {
    if (contribution === 0 || height < 5) return "";

    let windowsSVG = "";
    const rows = Math.floor((height - 2) / 3);
    const cols = 2;

    const lightProb = Math.min(0.2 + contribution * 0.15, 0.9);
    const winColor = theme.windowColor(contribution);

    for (let r = 0; r < rows; r++) {
        const z = 2 + r * 3;
        const wz = 1.8; 

        for (let c = 0; c < cols; c++) {
            const opacity = 0.5 + Math.random() * 0.5;
            const anim = `<animate attributeName="opacity" values="${opacity};1;${opacity/2};${opacity}" dur="${2 + Math.random() * 4}s" repeatCount="indefinite"/>`;

            if (Math.random() <= lightProb) {

                const lx1 = x + 0.15 + c * 0.3;
                const lx2 = lx1 + 0.2;
                const ly = y + size; 

                const lp1 = isoProject(lx1, ly, z);
                const lp2 = isoProject(lx2, ly, z);
                const lp3 = isoProject(lx2, ly, z + wz);
                const lp4 = isoProject(lx1, ly, z + wz);

                const points = `${lp1.x},${lp1.y} ${lp2.x},${lp2.y} ${lp3.x},${lp3.y} ${lp4.x},${lp4.y}`;
                windowsSVG += `<polygon points="${points}" fill="${winColor}" opacity="${opacity}">${anim}</polygon>`;
            }

            if (Math.random() <= lightProb) {
                const rx = x + size;
                const ry1 = y + size - 0.15 - c * 0.3;
                const ry2 = ry1 - 0.2;

                const rp1 = isoProject(rx, ry1, z);
                const rp2 = isoProject(rx, ry2, z);
                const rp3 = isoProject(rx, ry2, z + wz);
                const rp4 = isoProject(rx, ry1, z + wz);

                const points = `${rp1.x},${rp1.y} ${rp2.x},${rp2.y} ${rp3.x},${rp3.y} ${rp4.x},${rp4.y}`;
                windowsSVG += `<polygon points="${points}" fill="${winColor}" opacity="${opacity}">${anim}</polygon>`;
            }
        }
    }
    return windowsSVG;
}

export default function renderBuilding(building, theme) {
    const { x, y, height, contribution } = building;
    const size = 0.8;

    const t1 = isoProject(x, y, height);
    const t2 = isoProject(x + size, y, height);
    const t3 = isoProject(x + size, y + size, height);
    const t4 = isoProject(x, y + size, height);

    const p1 = isoProject(x, y);
    const p2 = isoProject(x + size, y);
    const p3 = isoProject(x + size, y + size);
    const p4 = isoProject(x, y + size);

    const topPoints = `${t1.x},${t1.y} ${t2.x},${t2.y} ${t3.x},${t3.y} ${t4.x},${t4.y}`;
    const leftPoints = `${t4.x},${t4.y} ${t3.x},${t3.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`;
    const rightPoints = `${t3.x},${t3.y} ${t2.x},${t2.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`;

    const windowsSVG = (contribution > 0 && typeof theme.windowColor === 'function')
        ? createWindows(x, y, size, height, contribution, theme)
        : "";

    return `
        ${polygon(leftPoints, theme.left(contribution))}
        ${polygon(rightPoints, theme.right(contribution))}
        ${polygon(topPoints, theme.top(contribution))}
        ${windowsSVG}
    `;
}