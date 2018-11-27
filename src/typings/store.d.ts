declare namespace  StoreState {
    export interface ListItem {
        bitrate: number,
        extname: string,
        feetype: number,
        filename: string,
        hash: string,
        isnew: number,
        owner: number,
        size: number,
        timelength: number,
        [propName: string]: any
    }
    export interface SongList {
        status: number, 
        recordcount: number,
        data:ListItem[],
        [propName: string]: any
    }
}