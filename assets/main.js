import params from "@params";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin, ScrollTrigger);

/**
 * @param {string | object | Element} paths
 * @returns {SVGPathElement[]}
 */
function splitPaths(paths) {
  /** @type {SVGPathElement[]} */
  let toSplit = gsap.utils.toArray(paths);
  /** @type {SVGPathElement[]} */
  let newPaths = [];

  if (toSplit.length > 1) {
    toSplit.forEach((path) => newPaths.push(...splitPaths(path)));
  } else {
    let path = toSplit[0];
    let rawPath = MotionPathPlugin.getRawPath(path);
    let parent = path.parentNode;
    /** @type {Array.<{ nodeName: string, nodeValue: string }>} */
    let attributes = [].slice.call(path.attributes);

    newPaths = rawPath.map(
      (/** @type {number[] & {closed: boolean}} */ segment) => {
        let newPath = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path",
        );

        let i = attributes.length;

        while (i--) {
          newPath.setAttributeNS(
            null,
            attributes[i].nodeName,
            attributes[i].nodeValue,
          );
        }

        newPath.setAttributeNS(
          null,
          "d",
          "M" +
            segment[0] +
            "," +
            segment[1] +
            "C" +
            segment.slice(2).join(",") +
            (segment.closed ? "z" : ""),
        );
        parent.insertBefore(newPath, path);
        return newPath;
      },
    );

    parent.removeChild(path);
  }

  return newPaths;
}

let logoTl = gsap.timeline({
  scrollTrigger: {
    markers: params.isDev,
    once: true,
    scrub: false,
    start: "bottom bottom",
    trigger: "footer .logo",
  },
});

let paths = splitPaths("footer .logo path");
let duration = 1.5;
let distance = 0;

for (let i = 0; i < paths.length; i++) {
  distance += paths[i].getTotalLength();
}

for (let i = 0; i < paths.length; i++) {
  let segment = paths[i];

  logoTl.fromTo(
    segment,
    {
      drawSVG: 0,
    },
    {
      drawSVG: true,
      duration: duration * (segment.getTotalLength() / distance),
      ease: "power1.inOut",
    },
  );
}

if (params.isDev) {
  console.log("Main JS bundle loaded");
}
