// import * as Cesium from 'cesium';
import zhoushan from '@/assets/zhoushan_wgs84.json'; //舟山
import { ref } from 'vue';

const token = '07e1574cc772de3981196a7240279957';
// 服务域名
const tdtUrl = 'https://t{s}.tianditu.gov.cn/';
// 服务负载子域
const subdomains = ['0', '1', '2', '3', '4', '5', '6', '7'];

let isint: boolean = false; //是否首次加载

declare let Cesium: any;

//舟山中心点，主要是相机初始化的配置
const config = {
  center: [122.106844, 30.019795],
  height: 500,
};

let viewer = ref();
export function useCesium() {
  function initCesium() {
    // destroyedViewer();
    // cesium 初始化
    viewer.value = new Cesium.Map('cesiumContainer', {
      shouldAnimate: true, //是否允许动画
      selectionIndicator: false,
      baseLayerPicker: false,
      fullscreenButton: false,
      geocoder: false,
      homeButton: false,
      infoBox: false,
      sceneModePicker: false,
      timeline: false,
      navigationHelpButton: false,
      navigationInstructionsInitiallyVisible: false,
      showRenderLoopErrors: false,
      shadows: false,
    });

    // 抗锯齿
    viewer.value.scene.fxaa = true;
    viewer.value.scene.postProcessStages.fxaa.enabled = false;
    // 水雾特
    viewer.value.scene.globe.showGroundAtmosphere = false;
    // 设置最大俯仰角，[-90,0]区间内，默认为-30，单位弧度
    viewer.value.scene.screenSpaceCameraController.constrainedPitch =
      Cesium.Math.toRadians(-20);
    viewer.value.scene.screenSpaceCameraController.autoResetHeadingPitch =
      false;
    viewer.value.scene.screenSpaceCameraController.inertiaZoom = 0.5;
    viewer.value.scene.screenSpaceCameraController.minimumZoomDistance = 50;
    viewer.value.scene.screenSpaceCameraController.maximumZoomDistance = 20000000;
    viewer.value.scene.screenSpaceCameraController.zoomEventTypes = [
      Cesium.CameraEventType.RIGHT_DRAG,
      Cesium.CameraEventType.WHEEL,
      Cesium.CameraEventType.PINCH,
    ];
    viewer.value.scene.screenSpaceCameraController.tiltEventTypes = [
      Cesium.CameraEventType.MIDDLE_DRAG,
      Cesium.CameraEventType.PINCH,
      {
        eventType: Cesium.CameraEventType.LEFT_DRAG,
        modifier: Cesium.KeyboardEventModifier.CTRL,
      },
      {
        eventType: Cesium.CameraEventType.RIGHT_DRAG,
        modifier: Cesium.KeyboardEventModifier.CTRL,
      },
    ];
    // 取消默认的双击事件
    viewer.value.cesiumWidget.screenSpaceEventHandler.removeInputAction(
      Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    );
    //设置按住鼠标左键拖拽，鼠标滚轮缩放
    viewer.value.scene.screenSpaceCameraController.tiltEventTypes = [
      Cesium.CameraEventType.PINCH,
      Cesium.CameraEventType.RIGHT_DRAG,
    ];
    viewer.value.cesiumWidget.creditContainer.style.display = 'none'; // 隐藏版权

    // 叠加影像服务
    const imgMap = new Cesium.UrlTemplateImageryProvider({
      url: tdtUrl + 'DataServer?T=img_w&x={x}&y={y}&l={z}&tk=' + token,
      subdomains: subdomains,
      tilingScheme: new Cesium.WebMercatorTilingScheme(),
      maximumLevel: 18,
    });
    viewer.value.imageryLayers.addImageryProvider(imgMap);

    // 叠加地形服务
    const terrainUrls = [];

    for (let i = 0; i < subdomains.length; i++) {
      const url =
        tdtUrl.replace('{s}', subdomains[i]) +
        'mapservice/swdx?T=elv_c&tk=' +
        token;
      terrainUrls.push(url);
    }

    const provider = new Cesium.GeoTerrainProvider({
      urls: terrainUrls,
    });

    viewer.value.terrainProvider = provider;

    loadBoundary();

    // viewer.value.terrainProvider = await Cesium.createWorldTerrainAsync() // 加载地形
    // viewer.value.scene.globe.depthTestAgainstTerrain = true
    // viewer.value.imageryLayers.removeAll();
  }

  /**
   * ## 加载舟山边界
   */
  function loadBoundary() {
    // 加载GeoJSON数据并设置边界样式
    Cesium.GeoJsonDataSource.load(zhoushan, {
      stroke: Cesium.Color.fromCssColorString('#00203f'), // 边界线颜色
      strokeWidth: 10, // 边界线宽度
      fill: Cesium.Color.fromAlpha(Cesium.Color.BLUE, 0), // 填充颜色和透明度
    })
      .then((dataSource) => {
        // 将GeoJSON数据添加到地图中
        // dataSource.entities.values.forEach(function (entity) {
        //   if (entity.polygon) {
        //     entity.polygon.outline = false;

        //     var positions = entity.polygon.hierarchy._value.positions;
        //     entity.polyline = {
        //       positions: positions,
        //       width: 2,
        //       material: Cesium.Color.fromCssColorString('#00203f'),
        //     };
        //   } else if (entity.polyline) {
        //     // 设置线的颜色和宽度
        //     entity.polyline.material = new Cesium.ColorMaterialProperty(Cesium.Color.RED);
        //     entity.polyline.width = 2;
        //   }
        // });
        viewer.value.dataSources.add(dataSource);

        // 让视图聚焦到GeoJSON区域

        if (!isint) {
          viewer.value.flyTo(dataSource, {
            duration: 2, // 飞行持续时间（秒）
            offset: new Cesium.HeadingPitchRange(
              0, // heading（航向角）：0 表示朝北
              Cesium.Math.toRadians(-70), // pitch（俯仰角）：负值表示向下看，-45度
              500000 // range（距离）：米
            ),
          });
          isint = true;
        } else {
          viewer.value.zoomTo(dataSource);
        }
      })
      .catch((error) => {
        console.error('加载GeoJSON失败:', error);
      });
  }

  /**
   * ## 销毁viewer
   */
  function destroyedViewer() {
    if (viewer.value) {
      try {
        console.log(viewer.value.destroy, 22);
        viewer.value.destroy();
      } catch (error) {
        viewer.value = null;
      }
    }
  }
  return {
    initCesium,
    loadBoundary,
    destroyedViewer,
    viewer,
  };
}
