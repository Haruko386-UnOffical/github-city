export default function depthSort(buildings) {

    return buildings.sort((a, b) => {
        return a.depth - b.depth;
    });

}