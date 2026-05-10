export const TILE_WIDTH = 40;
export const TILE_HEIGHT = 20;

export function isoProject(x, y, z = 0) {

    return {
        x: (x - y) * TILE_WIDTH / 2,
        y: (x + y) * TILE_HEIGHT / 2 - z
    };

}