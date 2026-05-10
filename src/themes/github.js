export default {
    name: "github",
    defs: "", // 经典主题不需要特殊滤镜或渐变
    backgroundFill: "#ffffff", // 纯白背景

    top: contribution => {
        if (contribution === 0) return "#ebedf0";
        if (contribution <= 3) return "#9be9a8";
        if (contribution <= 6) return "#40c463";
        if (contribution <= 9) return "#30a14e";
        return "#216e39";
    },

    left: contribution => {
        if (contribution === 0) return "#e1e4e8";
        if (contribution <= 3) return "#8ad596";
        if (contribution <= 6) return "#39b25a";
        if (contribution <= 9) return "#2b9146";
        return "#1e6233";
    },

    right: contribution => {
        if (contribution === 0) return "#d1d5da";
        if (contribution <= 3) return "#7ac284";
        if (contribution <= 6) return "#319f50";
        if (contribution <= 9) return "#25803d";
        return "#19562d";
    }
};