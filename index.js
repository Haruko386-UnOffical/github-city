import fs from "fs";
import fetchContributions from "./src/github/fetchContributions.js";
import createHeightMap from "./src/city/heightmap.js";
import renderCity from "./src/city/renderCity.js";

const themeName = process.env.THEME || "github"; // Set the theme name via an environment variable, defaulting to "github"

let theme;
try {
    const themeModule = await import(`./src/themes/${themeName}.js`);
    theme = themeModule.default;
} catch (error) {
    console.warn(`No theme found '${themeName}', falling back to 'github' theme.`);
    const fallback = await import(`./src/themes/github.js`);
    theme = fallback.default;
}

console.log(`using [${theme.name}] ...`);

const weeks = await fetchContributions();
const map = createHeightMap(weeks);
const svg = renderCity(map, theme);

fs.writeFileSync("city.svg", svg);
console.log("done: city.svg");