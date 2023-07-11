/* eslint-disable @typescript-eslint/no-explicit-any */

interface Element
  extends Node,
    Animatable,
    ChildNode,
    InnerHTML,
    NonDocumentTypeChildNode,
    ParentNode,
    Slottable {
  mozRequestFullScreen: any;
  msRequestFullscreen: any;
  webkitRequestFullScreen: any;
}
interface Document
  extends Node,
    DocumentOrShadowRoot,
    GlobalEventHandlers,
    NonElementParentNode,
    ParentNode,
    XPathEvaluatorBase {
  mozCancelFullScreen: any;
  msExitFullscreen: any;
  msExiFullscreen: any;
  webkitCancelFullScreen: any;
  webkitFullscreenElement: Element | null;
  mozFullScreenElement: any;
}
