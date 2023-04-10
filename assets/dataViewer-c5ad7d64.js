import{y}from"./lit-html-b7b68613.js";import{n as j,e as w}from"./ref-cfc580af.js";import{s as k,t as u,L as S,a as R,b as v,i as $,c as Q,f as V,d as T,E as C,e as h,g as x}from"./editor-7887b23b.js";import"./index-e63d0e3e.js";const N=k({String:u.string,Number:u.number,"True False":u.bool,PropertyName:u.propertyName,Null:u.null,",":u.separator,"[ ]":u.squareBracket,"{ }":u.brace}),W=S.deserialize({version:14,states:"$bOVQPOOOOQO'#Cb'#CbOnQPO'#CeOvQPO'#CjOOQO'#Cp'#CpQOQPOOOOQO'#Cg'#CgO}QPO'#CfO!SQPO'#CrOOQO,59P,59PO![QPO,59PO!aQPO'#CuOOQO,59U,59UO!iQPO,59UOVQPO,59QOqQPO'#CkO!nQPO,59^OOQO1G.k1G.kOVQPO'#ClO!vQPO,59aOOQO1G.p1G.pOOQO1G.l1G.lOOQO,59V,59VOOQO-E6i-E6iOOQO,59W,59WOOQO-E6j-E6j",stateData:"#O~OcOS~OQSORSOSSOTSOWQO]ROePO~OVXOeUO~O[[O~PVOg^O~Oh_OVfX~OVaO~OhbO[iX~O[dO~Oh_OVfa~OhbO[ia~O",goto:"!kjPPPPPPkPPkqwPPk{!RPPP!XP!ePP!hXSOR^bQWQRf_TVQ_Q`WRg`QcZRicQTOQZRQe^RhbRYQR]R",nodeNames:"⚠ JsonText True False Null Number String } { Object Property PropertyName ] [ Array",maxTerm:25,nodeProps:[["openedBy",7,"{",12,"["],["closedBy",8,"}",13,"]"]],propSources:[N],skippedNodes:[0],repeatNodeCount:2,tokenData:"(p~RaXY!WYZ!W]^!Wpq!Wrs!]|}$i}!O$n!Q!R$w!R![&V![!]&h!}#O&m#P#Q&r#Y#Z&w#b#c'f#h#i'}#o#p(f#q#r(k~!]Oc~~!`Upq!]qr!]rs!rs#O!]#O#P!w#P~!]~!wOe~~!zXrs!]!P!Q!]#O#P!]#U#V!]#Y#Z!]#b#c!]#f#g!]#h#i!]#i#j#g~#jR!Q![#s!c!i#s#T#Z#s~#vR!Q![$P!c!i$P#T#Z$P~$SR!Q![$]!c!i$]#T#Z$]~$`R!Q![!]!c!i!]#T#Z!]~$nOh~~$qQ!Q!R$w!R![&V~$|RT~!O!P%V!g!h%k#X#Y%k~%YP!Q![%]~%bRT~!Q![%]!g!h%k#X#Y%k~%nR{|%w}!O%w!Q![%}~%zP!Q![%}~&SPT~!Q![%}~&[ST~!O!P%V!Q![&V!g!h%k#X#Y%k~&mOg~~&rO]~~&wO[~~&zP#T#U&}~'QP#`#a'T~'WP#g#h'Z~'^P#X#Y'a~'fOR~~'iP#i#j'l~'oP#`#a'r~'uP#`#a'x~'}OS~~(QP#f#g(T~(WP#i#j(Z~(^P#X#Y(a~(fOQ~~(kOW~~(pOV~",tokenizers:[0],topRules:{JsonText:[0,1]},tokenPrec:0}),Z=v.define({name:"json",parser:W.configure({props:[$.add({Object:Q({except:/^\s*\}/}),Array:Q({except:/^\s*\]/})}),V.add({"Object Array":T})]}),languageData:{closeBrackets:{brackets:["[","{",'"']},indentOnInput:/^\s*[\}\]]$/}});function X(){return new R(Z)}var g=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,o,P,Y={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},f;function b(O){return g.lastIndex=0,g.test(O)?'"'+O.replace(g,function(s){var n=Y[s];return typeof n=="string"?n:"\\u"+("0000"+s.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+O+'"'}function d(O,s,n){var r,a,i,c,l=o,t,e=s[O];switch(e&&typeof e=="object"&&typeof e.toJSON=="function"&&(e=e.toJSON(O)),typeof f=="function"&&(e=f.call(s,O,e)),typeof e){case"string":return b(e);case"number":return isFinite(e)?String(e):"null";case"boolean":case"null":return String(e);case"object":if(!e)return"null";if(o+=P,t=[],Object.prototype.toString.apply(e)==="[object Array]"){for(c=e.length,r=0;r<c;r+=1)t[r]=d(r,e,n)||"null";return i=t.length===0?"[]":o?o.length+t.join(", ").length+4>n?`[
`+o+t.join(`,
`+o)+`
`+l+"]":"[ "+t.join(", ")+" ]":"["+t.join(",")+"]",o=l,i}if(f&&typeof f=="object")for(c=f.length,r=0;r<c;r+=1)typeof f[r]=="string"&&(a=f[r],i=d(a,e,n),i&&t.push(b(a)+(o?": ":":")+i));else for(a in e)Object.prototype.hasOwnProperty.call(e,a)&&(i=d(a,e,n),i&&t.push(b(a)+(o?": ":":")+i));return i=t.length===0?"{}":o?o.length+t.join(", ").length+4>n?`{
`+o+t.join(`,
`+o)+`
`+l+"}":"{ "+t.join(", ")+" }":"{"+t.join(",")+"}",o=l,i}}function q(O,s,n,r){var a;if(o="",P="",r||(r=0),typeof r!="number")throw new Error("beaufifier: limit must be a number");if(typeof n=="number")for(a=0;a<n;a+=1)P+=" ";else typeof n=="string"&&(P=n);if(f=s,s&&typeof s!="function"&&(typeof s!="object"||typeof s.length!="number"))throw new Error("beautifier: wrong replacer parameter");return d("",{"":O},r)}var E=q;const L={inports:{in:{type:"any",value:null}},outports:{},state:{mode:"json"},ui:{displayName:"Data Viewer",resize:"both",width:400,height:500}};function U(O,s,n,r){let a=w(),i;function c(){return h.create({doc:E(O.in.value,null,2,100),extensions:[x,X(),h.readOnly.of(!0)]})}function l(){i=new C({parent:a.value,state:c()})}function t(){i.setState(c())}function e(){i.requestMeasure()}function m(){let p=r.panZoom.scale();return y`
      <style>
        #editor {
          height: 100%;
          display: flex;
          overflow: auto;
        }
        .cm-editor {
          flex: 1;
          border: 0;
          outline: none;
        }
        .cm-editor.cm-focused {
          outline: none;
          border: 0;
        }

        /* Prepare yourself for the jankiest CSS ever written */
        /* This is because Codemirror doesn't behave properly when
         inside something that has been transformed with CSS */
        .cm-gutter {
          transform-origin: 0 0;
          transform: scale(${1/p});
        }
        .cm-gutter > * {
          transform-origin: 0 0;
          transform: scale(${p});
        }
        .cm-cursorLayer {
          transform-origin: 0 0;
          transform: scale(${1/p});
        }
        .cm-selectionLayer {
          /* transform-origin: 0 0; */
          transform: scale(${1/p});
        }
        /* Works on Firefox */
        * {
          scrollbar-width: thin;
          scrollbar-color: blue var(--purple);
        }

        /* Works on Chrome, Edge, and Safari */
        *::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }

        *::-webkit-scrollbar-track {
          background: var(--black);
        }

        *::-webkit-scrollbar-thumb {
          background-color: var(--purple);
          border: none;
        }
      </style>
      <div id="editor" ${j(a)}></div>
    `}return{render:m,postInit:l,inportsUpdated:t,onZoom:e}}const I={config:L,tool:U};export{I as default};
