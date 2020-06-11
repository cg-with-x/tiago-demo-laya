export function avatarImg(url: string){
  const image = new Laya.Browser.window.Image() as HTMLImageElement;
  image.crossOrigin = "";
  image.src = url;
  // // @ts-ignore 让Laya.Loader存储引用防止释放
  // Laya.Loader._imgCache[fileNativeUrl] = image;
  let tex: Laya.Texture2D = new Laya.Texture2D(image.width, image.height, 1, false, false);
  tex.wrapModeU = Laya.BaseTexture.WARPMODE_CLAMP;
  tex.wrapModeV = Laya.BaseTexture.WARPMODE_CLAMP;
  tex.loadImageSource(image, true);
  tex._setCreateURL(url);
  // _this.onLoaded(tex);

  let reTex: Laya.Texture = new Laya.Texture(tex)
  return reTex;
}