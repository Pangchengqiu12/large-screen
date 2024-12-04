// import.meta.glob('../../assets/image/*.png', { eager: true }); //导入首页所有图片
// export function open(url: string): any {
//   return import.meta.env.VITE_GLOB_IMG + url;
// }
export function open(url: string): any {
  console.log(new URL(`./assets${url}`, import.meta.url), url)
  return new URL(`../../assets${url}`, import.meta.url)
}
export function getWether(url: string): any {
  console.log(new URL(`./assets${url}`, import.meta.url), url)
  return new URL(`../assets/image/weather/${url}`, import.meta.url)
}
export function getLargeScreenImg(url: string): any {
  console.log(new URL(`./assets${url}`, import.meta.url), url)
  return new URL(`../assets/largeScreen/${url}`, import.meta.url)
}
