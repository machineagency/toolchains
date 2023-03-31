export function exportSVG(state) {
  const serializer = new XMLSerializer();
  const svg = document.querySelector("svg").cloneNode(true);

  svg.setAttributeNS(
    "http://www.w3.org/2000/xmlns/",
    "xmlns:xlink",
    "http://www.w3.org/1999/xlink"
  );

  const source = serializer.serializeToString(svg);
  const svgURL =
    "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);

  return svgURL;
  // const downloadLink = document.createElement("a");
  // downloadLink.href = svgURL;
  // downloadLink.download = "anon.svg";
  // document.body.appendChild(downloadLink);
  // downloadLink.click();

  // document.body.removeChild(downloadLink);
}
