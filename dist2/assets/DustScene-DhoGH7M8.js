import{r as e}from"./rolldown-runtime-XKyaHtl9.js";import{a as t,s as n}from"./motion-Pq3BkiKD.js";import{a as r,c as i,i as a,o}from"./three-C1Ll1rE3.js";var s=e(n(),1),c=t(),l=`
  uniform float uTime;
  uniform float uPixelRatio;
  uniform vec2 uMouse;
  attribute float aScale;
  attribute float aSpeed;
  attribute float aOffset;
  varying float vAlpha;
  varying float vTint;

  // simple 3d hash noise for drift
  float hash(float n) { return fract(sin(n) * 43758.5453123); }

  void main() {
    vec3 p = position;
    float t = uTime * aSpeed;
    p.y += sin(t * 0.35 + aOffset) * 0.6 + mod(t * 0.08 + aOffset, 7.0) - 3.5;
    p.x += cos(t * 0.27 + aOffset * 1.7) * 0.5;
    p.z += sin(t * 0.21 + aOffset * 0.9) * 0.4;

    // parallax: deeper particles move less
    float depth = (p.z + 6.0) / 12.0;
    p.xy += uMouse * depth * 0.9;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aScale * uPixelRatio * (28.0 / -mv.z);
    vAlpha = smoothstep(-9.0, -2.0, mv.z) * (0.35 + 0.65 * hash(aOffset));
    vTint = hash(aOffset * 3.1);
  }
`,u=`
  varying float vAlpha;
  varying float vTint;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float core = smoothstep(0.5, 0.0, d);
    float glow = pow(core, 2.6);
    vec3 gold = vec3(0.737, 0.6, 0.365);
    vec3 cream = vec3(0.965, 0.92, 0.847);
    vec3 col = mix(gold, cream, vTint * 0.6);
    gl_FragColor = vec4(col, glow * vAlpha * 0.9);
  }
`;function d({count:e=2600}){let t=(0,s.useRef)(null),n=(0,s.useRef)(new i(0,0)),a=(0,s.useRef)(new i(0,0)),{gl:d}=o(),{positions:f,scales:p,speeds:m,offsets:h}=(0,s.useMemo)(()=>{let t=new Float32Array(e*3),n=new Float32Array(e),r=new Float32Array(e),i=new Float32Array(e);for(let a=0;a<e;a++)t[a*3]=(Math.random()-.5)*18,t[a*3+1]=(Math.random()-.5)*10,t[a*3+2]=(Math.random()-.5)*12,n[a]=Math.random()<.9?.6+Math.random()*1.4:2.4+Math.random()*3.2,r[a]=.4+Math.random()*.9,i[a]=Math.random()*100;return{positions:t,scales:n,speeds:r,offsets:i}},[e]);return r((e,r)=>{t.current&&(t.current.uniforms.uTime.value+=r,a.current.set(e.pointer.x,e.pointer.y),n.current.lerp(a.current,.04),t.current.uniforms.uMouse.value.copy(n.current))}),(0,c.jsxs)(`points`,{children:[(0,c.jsxs)(`bufferGeometry`,{children:[(0,c.jsx)(`bufferAttribute`,{attach:`attributes-position`,args:[f,3]}),(0,c.jsx)(`bufferAttribute`,{attach:`attributes-aScale`,args:[p,1]}),(0,c.jsx)(`bufferAttribute`,{attach:`attributes-aSpeed`,args:[m,1]}),(0,c.jsx)(`bufferAttribute`,{attach:`attributes-aOffset`,args:[h,1]})]}),(0,c.jsx)(`shaderMaterial`,{ref:t,vertexShader:l,fragmentShader:u,transparent:!0,depthWrite:!1,blending:2,uniforms:{uTime:{value:0},uPixelRatio:{value:Math.min(d.getPixelRatio(),2)},uMouse:{value:new i}}})]})}function f({className:e}){return(0,c.jsx)(`div`,{className:e,"aria-hidden":!0,children:(0,c.jsx)(a,{dpr:[1,1.8],camera:{position:[0,0,7],fov:50},gl:{antialias:!1,alpha:!0,powerPreference:`high-performance`},style:{position:`absolute`,inset:0},children:(0,c.jsx)(d,{})})})}export{f as DustScene};