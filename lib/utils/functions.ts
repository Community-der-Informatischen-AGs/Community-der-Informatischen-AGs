import { SCSSStyleSheet } from "./types"

/**
 * processes an optional stylesheet. If exist, then return, if no, then empty object. ez.
 */
export const processOptStyleSheet = (optStylesheet: SCSSStyleSheet | undefined) => {

  let stylesheet: SCSSStyleSheet = {}
  if (optStylesheet != null) {
    stylesheet = optStylesheet
  }

  return stylesheet;

}
