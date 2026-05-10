export default {
    name: "cityNight",
    // 夜空渐变定义
    defs: `
        <linearGradient id="nightSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#050810" />
            <stop offset="100%" stop-color="#0a1226" />
        </linearGradient>
    `,
    backgroundFill: "url(#nightSky)",

    top: contribution => {
        if (contribution === 0) return "#1e2233";
        if (contribution <= 3) return "#272d42";
        if (contribution <= 6) return "#323a54";
        if (contribution <= 9) return "#404a6b";
        return "#505c85";
    },

    left: contribution => {
        if (contribution === 0) return "#151826";
        if (contribution <= 3) return "#1c2130";
        if (contribution <= 6) return "#242a3e";
        if (contribution <= 9) return "#2e364f";
        return "#3a4463";
    },

    right: contribution => {
        if (contribution === 0) return "#0d0f1a";
        if (contribution <= 3) return "#121521";
        if (contribution <= 6) return "#171b2b";
        if (contribution <= 9) return "#1e2336";
        return "#252b42";
    },

    windowColor: contribution => {
        if (contribution <= 3) return "#f7d959"; // 黄
        if (contribution <= 6) return "#42f5e8"; // 青
        if (contribution <= 9) return "#f542a1"; // 粉
        return "#ff2a2a"; // 红
    }
};