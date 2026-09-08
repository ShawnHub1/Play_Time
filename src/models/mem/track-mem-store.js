import { v4 } from "uuid";

let tracks = [];


export const trackMemStore = {
  async getAllTracks() {
    return tracks;
  },

  async addTrack(track) {
    track._id = v4();
    tracks.push(track);
    return track;
  },

  async getTrackById(id) {
    return tracks.find((track) => track._id === id);
  },

  async deleteTrackById(id) {
    const index = tracks.findIndex((track) => track._id === id);
    tracks.splice(index, 1);
  },

  async deleteAllTracks() {
    tracks = [];
  },
};
