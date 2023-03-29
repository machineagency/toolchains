import{y as i}from"./index-56a203ca.js";const r={inports:{sketch:{type:"javascript",value:null}},outports:{},state:{},ui:{displayName:"P5 Sketch Viewer",width:300,height:300,resize:"both"}};function s(t){return`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sketch</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.js"><\/script>
    <style>
      html, body {
        height: 100%;
        margin: 0;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <script>
${t}
    <\/script>
  </body>
</html>`}function o(t,c,a){function e(){return i` <style>
        #sketch {
          display: block;
          border: none;
          height: 100%;
          width: 100%;
        }
      </style>
      <iframe id="sketch" srcdoc=${s(t.sketch.value)}></iframe>`}return{render:e}}const h={config:r,tool:o};export{h as default};
