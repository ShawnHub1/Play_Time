import { EventEmitter } from "events";
import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { assertSubset } from "../test-utils.js";
import { testPlaylists, testTracks, beethoven, mozart, concerto, testUsers } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Track Model tests", () => {
  let testPlaylist;

  setup(async () => {
    db.init("mongo");

    await db.trackStore.deleteAllTracks();
    await db.playlistStore.deleteAllPlaylists();

    testPlaylist = await db.playlistStore.addPlaylist({
      title: "Test Playlist",
    });

    await db.trackStore.addTrack(testPlaylist._id, testTracks[0]);
    await db.trackStore.addTrack(testPlaylist._id, testTracks[1]);
    await db.trackStore.addTrack(testPlaylist._id, testTracks[2]);
  });

  test("create a track", async () => {
    const track = await db.trackStore.addTrack(
      testPlaylist._id,
      testTracks[0]
    );

    assertSubset(testTracks[0], track);
    assert.isDefined(track._id);
  });

  test("delete all tracks", async () => {
    let returnedTracks = await db.trackStore.getAllTracks();
    assert.equal(returnedTracks.length, 3);
    await db.trackStore.deleteAllTracks();
    returnedTracks = await db.trackStore.getAllTracks();
    assert.equal(returnedTracks.length, 0);
  });

  test("get a track - success", async () => {
    const tracks = await db.trackStore.getAllTracks();
    const returnedTrack = await db.trackStore.getTrackById(
      tracks[0]._id
    );

    assertSubset(testTracks[0], returnedTrack);
  });

  test("delete One Track - success", async () => {
    const tracks = await db.trackStore.getAllTracks();
    const id = tracks[0]._id;
    await db.trackStore.deleteTrack(id);
    const returnedTracks = await db.trackStore.getAllTracks();
    assert.equal(returnedTracks.length, 2);
    const deletedTrack = await db.trackStore.getTrackById(id);
    assert.isNull(deletedTrack);
  });

  test("get a track - bad params", async () => {
    assert.isNull(await db.trackStore.getTrackById(""));
    assert.isNull(await db.trackStore.getTrackById());
  });

  test("delete One Track - fail", async () => {
    await db.trackStore.deleteTrack("bad-id");
    const allTracks = await db.trackStore.getAllTracks();
    assert.equal(allTracks.length, 3);
  });
});