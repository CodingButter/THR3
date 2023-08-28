export class Loader{
    static ASSETS = new Map()
    storeAsset(path,asset){
        Loader.ASSETS.set(path,asset);
    }
}