
import turf from 'turf';

class App {

  load() {

    var points = [];
    //ZdcTileServers = 'map.e-map.ne.jp';
    var zdcEmapMapUserLyr = new ZdcUserLayer();
    var point1   = new ZdcPoint(139.0950472 ,35.6863167);

    var map = new ZdcMap(document.getElementById('Map'), point1 , 7);

    points.push(point1);
    addMarkerToLayer(zdcEmapMapUserLyr, point1);

    var point2   = new ZdcPoint(139.0050472 ,35.4863167);
    points.push(point2);
    addMarkerToLayer(zdcEmapMapUserLyr, point2);

    var point3   = new ZdcPoint(139.5950472 ,35.2863167);
    points.push(point3);
    addMarkerToLayer(zdcEmapMapUserLyr, point3);

    var point4   = new ZdcPoint(139.5950472 ,35.7863167);
    points.push(point4);
    points.push(point1); // ポリゴンを閉じる
    addMarkerToLayer(zdcEmapMapUserLyr, point4);

    map.addUserLayer(zdcEmapMapUserLyr);

    map.addShapeLayer(createPolygonLayer(points));

    var geo = new ZdcGeometric();
    var area = geo.AreaCal(points);
    console.log(area);

    console.log(calculateAreaByTurf(points));
  }
}

function addMarkerToLayer(layer, point) {
  var icon = new ZdcIcon();
  var mrk = new ZdcMarker(point, icon);
  layer.addMarker(mrk);
}

function createPolygonLayer(points) {
  const slay = new ZdcShape.Layer();
  const pg = new ZdcShape.Polygon();
  points.forEach(function (point) {
    pg.addPoint(point);
  });
  pg.strokeColor = '#0000FF';
  pg.strokeWeight = '1px';
  pg.fillType = '#FFff00';
  pg.opacity = 0.5;
  slay.addShape(pg);
  return slay;
}


function calculateAreaByTurf(points) {

  console.log(points);
  const coords = points.map(point => {
    return [point.lon, point.lat];
  });
  console.log(coords);

  // var polygon = turf.polygon([[[125, -15], [113, -22], [154, -27], [144, -15], [125, -15]]]);
  const polygon = turf.polygon([coords]);
  return turf.area(polygon);

}

export default App;
window.App = App;