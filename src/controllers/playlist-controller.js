import { db } from "../models/db.js";

export const playlistController = {
  index: {
    handler: async function (request, h) {
      return h.view("playlist", { title: "Playlist" });
    },
  },
  addPlaylist: {
    handler: async function (request, h) {
      const newPlayList = {
        title: request.payload.title,
      };
      await db.playlistStore.addPlaylist(newPlayList);
      return h.redirect("/dashboard");
    },
  },
  addTrack: {
    handler: async function (request, h) {
      const newTrack = {
        title: request.payload.title,
        playlistId: request.params.id
      };
      await db.trackStore.addTrack(newTrack);
      return h.redirect("/playlist");
    },
  },  
};
