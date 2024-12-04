import * as Cesium from 'cesium';
import _ from 'lodash';
const token = '07e1574cc772de3981196a7240279957';
// 服务域名
const tdtUrl = 'https://t{s}.tianditu.gov.cn/';
// 服务负载子域
const subdomains = ['0', '1', '2', '3', '4', '5', '6', '7'];

import zhoushan from '@/assets/zhoushan.json'; //舟山

const config = {
  center: [122.106844, 30.019795],
  height: 50000,
};
const errroMessage = 'viewer 未初始化,请先执行initCesium方法';
let viewer: InstanceType<typeof Cesium.Viewer> | undefined; //cesium实例
export function useCesium() {
  Cesium.Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ZGRiMjUzZS1jZWNlLTRjMDYtODU5Mi05MjNiZDRjOGUwNTIiLCJpZCI6NDMxMDUsImlhdCI6MTY0NjI3MDQ2M30.ZH81WWILiz6RytEPHTdeRV-_Au5QuYN6JzJ8LsNqzLw';
  /**
   * ## 初始化地图
   * @param {boolean} [isClear=false] 是否清空地图
   */
  function initCesium(isClear: boolean = false) {
    if (viewer) {
      console.log('isClear', isClear);
      isClear && clearMap();
      return viewer;
    }
    // Initialize a new Cesium Viewer with customized options
    viewer = new Cesium.Viewer('cesiumContainer', {
      terrain: Cesium.Terrain.fromWorldTerrain(), //地形
      baseLayerPicker: false, //右上角底图选择
      fullscreenButton: false,
      homeButton: false, //右上角小房子按钮
      infoBox: false, //右上角信息框
      sceneModePicker: false, //右上角地图3d/2d切换
      navigationHelpButton: false, //右上角帮助按钮
      navigationInstructionsInitiallyVisible: false, //右上角指南
      selectionIndicator: false, //选中指示器
      shadows: false, //阴影
      timeline: false, //时间轴
      animation: false,
      geocoder: false, //搜索框
    });
    // 获取 ScreenSpaceCameraController
    const cameraController = viewer.scene.screenSpaceCameraController;

    // 设置俯仰角度限制（例如限制为 45 度）
    cameraController.maximumTiltAngle = Cesium.Math.toRadians(80);
    // 取消默认的双击事件
    viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
      Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    );
    //设置按住鼠标左键拖拽，鼠标滚轮缩放
    viewer.scene.screenSpaceCameraController.tiltEventTypes = [
      Cesium.CameraEventType.PINCH,
      Cesium.CameraEventType.RIGHT_DRAG,
    ];
    viewer.cesiumWidget.creditContainer.style.display = 'none'; // 隐藏版权
    // viewer.terrainProvider = await Cesium.createWorldTerrainAsync() // 加载地形
    // viewer.scene.globe.depthTestAgainstTerrain = true
    viewer.imageryLayers.removeAll();
    window.addEventListener('resize', resize);
    loadTianDi('img_w');
    flyToCenter();
    // loadTianDi({
    //   type: 'cia_w',
    // });
    return viewer;
  }
  //  加载天地图瓦片
  async function loadTianDi(type: 'img_w' | 'cia_w') {
    if (!viewer) return new Error(errroMessage);
    const layerProvider = new Cesium.UrlTemplateImageryProvider({
      url: tdtUrl + `DataServer?T=${type}&x={x}&y={y}&l={z}&tk=${token}`,
      subdomains: subdomains,
      tilingScheme: new Cesium.WebMercatorTilingScheme(),
      maximumLevel: 18,
    });
    viewer.imageryLayers.addImageryProvider(layerProvider);
    // 叠加地形服务
    const terrainUrls = [];

    for (let i = 0; i < subdomains.length; i++) {
      const url =
        tdtUrl.replace('{s}', subdomains[i]) +
        'mapservice/swdx?T=elv_c&tk=' +
        token;
      terrainUrls.push(url);
    }
    const terrainProvider = await Cesium.CesiumTerrainProvider.fromUrl(
      'https://www.supermapol.com/realspace/services/3D-stk_terrain/rest/realspace/datas/info/data/path'
    );

    // 添加为地形图层
    viewer.scene.terrainProvider = terrainProvider;
  }

  /**
   * ## 加载3Dtiles
   */
  async function load3DTileset() {
    if (!viewer) return new Error(errroMessage);
    let tileset = await Cesium.Cesium3DTileset.fromUrl(
      'http://localhost:5173/hefei/tileset.json',
      {
        preferLeaves: true,
        //【重要】内存建议显存大小的50%左右，内存分配变小有利于倾斜摄影数据回收，提升性能体验
        cullWithChildrenBounds: true,
        skipLevelOfDetail: true,
      }
    );
    viewer.scene.primitives.add(tileset);
    viewer.scene.globe.depthTestAgainstTerrain = false;
    viewer.flyTo(tileset);
  }
  /**
   * ## 清空地图
   */
  function clearMap() {
    // viewer.dataSources.removeAll();
    if (viewer) {
      viewer.entities.removeAll();
    }
  }
  /**
   * ## 飞行到中心
   */
  function flyToCenter() {
    if (!viewer) return new Error(errroMessage);
    let position = Cesium.Cartesian3.fromDegrees(
      config.center[0],
      config.center[1],
      config.height
    );
    viewer.camera.flyTo({
      destination: position,
      duration: 2, // 飞行持续时间（秒）
      orientation: {
        heading: Cesium.Math.toRadians(10), // 方位角，从正北开始顺时针计算
        pitch: Cesium.Math.toRadians(-80), // 俯仰角，-90为垂直向下看，0为水平看
        roll: 0, // 滚动角，通常保持为0
      },
    });
  }
  /**
   * ## 销毁viewer
   */
  function destroyedViewer() {
    if (viewer) {
      viewer.destroy();
      viewer = undefined;
      window.removeEventListener('resize', resize);
    }
  }
  const resize = _.debounce(() => {
    if (viewer) viewer.resize();
  }, 500);
  return {
    initCesium,
    load3DTileset,
    destroyedViewer,
    clearMap,
  };
}
