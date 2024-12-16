/*
 * @Description:
 * @Author: maizi
 * @Date: 2023-04-03 17:36:41
 * @LastEditTime: 2023-04-03 21:02:36
 * @LastEditors: maizi
 */
import gcoord from 'gcoord';
import * as Cesium from 'cesium';

class AmapMercatorTilingScheme extends Cesium.WebMercatorTilingScheme {
  constructor(options) {
    super(options);
    let projection = new Cesium.WebMercatorProjection();
    this._projection.project = function (cartographic, result) {
      //WGS84转GCJ02坐标
      result = gcoord.transform(
        [
          Cesium.Math.toDegrees(cartographic.longitude),
          Cesium.Math.toDegrees(cartographic.latitude),
        ],
        gcoord.WGS84,
        gcoord.GCJ02
      );
      result = projection.project(
        new Cesium.Cartographic(
          Cesium.Math.toRadians(result[0]),
          Cesium.Math.toRadians(result[1])
        )
      );
      return new Cesium.Cartesian2(result.x, result.y);
    };
    this._projection.unproject = function (cartesian, result) {
      let cartographic = projection.unproject(cartesian);
      //GCJ02转WGS84坐标
      result = gcoord.transform(
        [
          Cesium.Math.toDegrees(cartographic.longitude),
          Cesium.Math.toDegrees(cartographic.latitude),
        ],
        gcoord.GCJ02,
        gcoord.WGS84
      );

      return new Cesium.Cartographic(
        Cesium.Math.toRadians(result[0]),
        Cesium.Math.toRadians(result[1])
      );
    };
  }
}
export default AmapMercatorTilingScheme;
