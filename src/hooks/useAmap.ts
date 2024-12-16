// import AMapLoader from '@amap/amap-jsapi-loader';
// let map: any = null;
// let AMap: any = null;

export function useAmap() {
  function init() {
    // AMapLoader.load({
    //   key: '443ab2c39fcf134961fccd380eed4e4c', // 申请好的Web端开发者Key，首次调用 load 时必填
    //   version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    //   plugins: ['3DTilesLayer'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    // })
    //   .then((AMap) => {
    //     AMap = AMap;
    //     map = new AMap.Map('cesiumContainer', {
    //       // 设置地图容器id
    //       viewMode: '3D', // 是否为3D地图模式
    //       zoom: 11, // 初始化地图级别
    //       center: [120.9764683, 31.3869323], // 初始化地图中心点位置
    //       pitch: 52,
    //     });
    //     let tiles = new AMap['3DTilesLayer']({
    //       map: map,
    //       url: 'http://192.168.5.149:9966/3dtils/tileset.json', // 3DTiles入口文件地址
    //     });
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    var map = new AMap.Map('cesiumContainer', {
      resizeEnable: true,
      viewMode: '3D',
      center: [120.9764683, 31.3869323],
      pitch: 90,
      rotation: -50,
      zoom: 16,
      features: ['bg', 'road'],
    });

    // 创建 3DTilesLayer
    const layer = new AMap.ThreeLayer(map);
    layer.on('complete', () => {
      const light = new THREE.AmbientLight('#ffffff', 1);
      layer.add(light);
      const tiles = new AMap.Layer3DTiles(layer, {
        url: 'http://192.168.5.149:9966/3dtils/tileset.json',
        position: [116.405242513021, 39.909402940539],
      });
      tiles.setRotation({
        x: 0,
        y: 0,
        z: 0,
      });
      tiles.setTranslate({ x: 15, y: 15, z: 0 });
      tiles.on('click', (e) => {
        console.log('click: ', e);
      });
      console.log('layer: ', layer);
      console.log('tiles: ', tiles);
    });
  }
  return { init };
}
