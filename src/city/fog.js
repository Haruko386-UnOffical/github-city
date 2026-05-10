export default function fogOpacity(depth) {

    return Math.max(
        0.35,
        1 - depth * 0.015
    );

}