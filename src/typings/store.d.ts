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
    export interface SongInfo {
        audio_name:string,
        author_name: string,
        filesize: number,
        hash: string,
        img:string,
        play_url:string,
        lyrics:string,
        timelength: number
    }
}