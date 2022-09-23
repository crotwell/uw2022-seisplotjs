// snip start import
import * as seisplotjs from '../seisplotjs_3.0.0-alpha.1_standalone.mjs';
// snip start setup
const queryTimeWindow = new seisplotjs.util.startEnd('2022-09-01', '2022-09-30');
const donut = new seisplotjs.fdsncommon.LatLonRadius(35, -118, 0, 35);
const eventQuery = new seisplotjs.fdsnevent.EventQuery()
  .timeWindow(queryTimeWindow)
  .minMag(7)
  .latLonRegion(donut);
//const nslc = new seisplotjs.fdsnsourceid.NslcId('CO', 'HODGE', '00', 'LH?');
const nslc = new seisplotjs.fdsnsourceid.NslcId('UW', 'DONK', '', 'HH?');
const stationQuery = new seisplotjs.fdsnstation.StationQuery()
  .nslcCodes(nslc)
  .timeWindow(queryTimeWindow);
const loader = new seisplotjs.seismogramloader.SeismogramLoader(stationQuery, eventQuery);
// default start is relative to P, end relative to S
loader.startOffsetSeconds(-300);
loader.endOffsetSeconds(1200);
loader.withFedCatalog = false;
loader.markedPhaseList = "PcP,SS";
// snip start promise
loader.loadSeismograms().then( seismogramDataList => {
  let graph = document.querySelector('sp-seismograph');
  graph.seisData = seismogramDataList;
});
