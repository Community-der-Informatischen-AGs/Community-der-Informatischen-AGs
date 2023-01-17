
export interface ImageData {
  url: string
  height?: number
  width?: number
  title: string
}

// extend this interface to add an optional image
export interface HasOptionalImage {
  image?: ImageData
}

export type SCSSStyleSheet = {
  readonly [key: string]: string;
}

// extend this interface to include optional stylesheets, changing the style
export interface HasOptionalStyleSheet {
  stylesheet?: SCSSStyleSheet
}