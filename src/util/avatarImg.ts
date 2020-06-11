import { resolve } from 'dns';
import { reject, PromiseState } from 'q';

export function loadAvatarImg(url: string): Promise<Laya.Texture>{
  return new Promise((resolve,reject)=>{
    const image = new window.Image() as HTMLImageElement;
    image.crossOrigin = "anonymous";
    image.src = url;
    image.onload = (result)=>{
        let tex: Laya.Texture2D = new Laya.Texture2D(image.width, image.height, (Laya as any).Texture2D.FORMAT_R8G8B8A8);
        tex.wrapModeU = Laya.BaseTexture.WARPMODE_CLAMP;
        tex.wrapModeV = Laya.BaseTexture.WARPMODE_CLAMP;

        tex.loadImageSource(image);
        tex._setCreateURL(url);
        // _this.onLoaded(tex);
        let reTex: Laya.Texture = Laya.Texture.create(tex,0,0,image.width,image.height) 
        Laya.loader.cacheRes(url, reTex)
        resolve(reTex);
    }
    // @ts-ignore 让Laya.Loader存储引用防止释放
    Laya.Loader._imgCache[url] = image;
    
  })

}