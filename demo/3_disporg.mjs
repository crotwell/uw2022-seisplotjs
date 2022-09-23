// snip start import
import * as seisplotjs from '../seisplotjs_3.0.0-alpha.1_standalone.mjs';
// snip start setup
const queryTimeWindow = new seisplotjs.util.startEnd('2022-09-01', '2022-09-30');
const donut = new seisplotjs.fdsncommon.LatLonRadius(48.0, -124.7, 0, 1);
const stadonut = new seisplotjs.fdsncommon.LatLonRadius(47.5, -122.0, 0, 0.5);
const eventQuery = new seisplotjs.fdsnevent.EventQuery()
  .timeWindow(queryTimeWindow)
  .minMag(2)
  .latLonRegion(donut);
const nslc = new seisplotjs.fdsnsourceid.NslcId('UW', '*', '*', 'HH?');
const stationQuery = new seisplotjs.fdsnstation.StationQuery()
  .nslcCodes(nslc)
  .latLonRegion(stadonut)
  .timeWindow(queryTimeWindow);
const loader = new seisplotjs.seismogramloader.SeismogramLoader(stationQuery, eventQuery);
// default start is relative to P, end relative to S
loader.startOffsetSeconds(-30);
loader.endOffsetSeconds(60);
loader.markedPhaseList = "p,s";
// snip start promise
loader.loadSeismograms().then( seismogramDataList => {
  let graph = document.querySelector('sp-organized-display');
  graph.seisData = seismogramDataList;
});
