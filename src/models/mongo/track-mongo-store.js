import Mongoose from "mongoose";
import { Track } from "./track.js";


export const trackMongoStore = {
  async getAllTracks() {
    const tracks = await Track.find().lean();
    return tracks;
  },
  
async addTrack(playlistId, track) {
  const newTrack = new Track({
    ...track,
    playlistId,
  });

  const trackObj = await newTrack.save();

  return trackObj.toObject();
},

  async getTracksByPlaylistId(id) {
    const tracks = await Track.find({ playlistId: id }).lean();
    return tracks;
  },

  async getTrackById(id) {
  if (Mongoose.isValidObjectId(id)) {
    const track = await Track.findOne({ _id: id }).lean();
    return track;
  }

  return null;
  },

  async getPlaylistTracks(playlistId) {
    const tracks = await Track.find({ playlistId: playlistId }).lean();
    return tracks;
  },

  async deleteTrack(id) {
  if (Mongoose.isValidObjectId(id)) {
    await Track.findOneAndDelete({ _id: id });
  }
  },

  async deleteAllTracks() {
    await Track.deleteMany({});
  },

  async updateTrack(track, updatedTrack) {
    Object.assign(track, updatedTrack);
    await track.save();
  },
};
        