import { mainController } from "./controllers/main-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";

export const webRoutes = [
    { method: "GET", path: "/", config: mainController.index },
    { method: "GET", path: "/dashboard", config: dashboardController.index },
    { method: "GET", path: "/about", config: aboutController.index },
    { method: "POST", path: "/dashboard/addplaylist", config: dashboardController.addPlaylist }

];
