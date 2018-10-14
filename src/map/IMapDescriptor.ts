export interface IMapDescriptor extends Array<IMapLine>{}
export interface IMapLine extends Array<IMapCell>{}
export interface IMapCell extends Array<IMapTuil>{}
export interface IMapTuil {
    id : number;
    x ?: number;
    y ?: number;
    z ?: number;
}