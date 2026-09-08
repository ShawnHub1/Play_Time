import { mainController } from "./controllers/main-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { playlistController } from "./controllers/playlist-controller.js";

export const webRoutes = [
    { method: "GET", path: "/", config: mainController.index },
    { method: "GET", path: "/dashboard", config: dashboardController.index },
    { method: "GET", path: "/about", config: aboutController.index },
    { method: "GET", path: "/playlist", config: playlistController.index },
    { method: "POST", path: "/dashboard/addplaylist", config: playlistController.addPlaylist },
    { method: "POST", path: "/playlist/{id}/addtrack", config: playlistController.addTrack },
];
