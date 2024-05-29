export interface ProcessedImage {
    id: string;
    filename: string;
    size: number;
    type: string;
    data: ImageMetadata;
    width: number;
    height: number;
} 

export interface NaiveImage {
    id: string;
    filename: string;
    size: number;
    type: string;
    url: string;
    width: number;
    height: number;
} 