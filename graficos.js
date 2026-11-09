/* ============================================================
   GRÁFICOS SVG sin dependencias externas.
   Todos devuelven un string SVG listo para insertar en la página.
   Los colores usan variables CSS para funcionar en modo oscuro.
   ============================================================ */
(function () {
  "use strict";

  function esc(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c];
    });
  }

  function polar(cx, cy, r, ang) {
    return [cx + r * Math.cos(ang), cy + r * Math.sin(ang)];
  }

  function fmt(n) { return (Math.round(n * 10) / 10).toString(); }

  /* ---------- radar ---------- */
  function radar(datos, o) {
    o = o || {};
    var W = o.ancho || 360, H = o.alto || 340;
    var cx = W / 2, cy = H / 2 + 4;
    var R = Math.min(W, H) / 2 - (o.margen || 56);
    var n = datos.length;
    var arranque = -Math.PI / 2;
    var out = [];
    out.push('<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.titulo || "Gráfico de radar") + '" class="grafico grafico-radar">');
    // anillos
    [0.2, 0.4, 0.6, 0.8, 1].forEach(function (k) {
      var pts = [];
      for (var i = 0; i < n; i++) {
        var p = polar(cx, cy, R * k, arranque + (i * 2 * Math.PI) / n);
        pts.push(fmt(p[0]) + "," + fmt(p[1]));
      }
      out.push('<polygon points="' + pts.join(" ") + '" class="g-anillo' + (k === 1 ? " g-borde" : "") + '"/>');
    });
    // ejes y etiquetas
    datos.forEach(function (d, i) {
      var ang = arranque + (i * 2 * Math.PI) / n;
      var p = polar(cx, cy, R, ang);
      out.push('<line x1="' + fmt(cx) + '" y1="' + fmt(cy) + '" x2="' + fmt(p[0]) + '" y2="' + fmt(p[1]) + '" class="g-eje"/>');
      var q = polar(cx, cy, R + 16, ang);
      var anchor = Math.abs(Math.cos(ang)) < 0.2 ? "middle" : (Math.cos(ang) > 0 ? "start" : "end");
      var dy = Math.sin(ang) > 0.5 ? 10 : (Math.sin(ang) < -0.5 ? -2 : 4);
      out.push('<text x="' + fmt(q[0]) + '" y="' + fmt(q[1] + dy) + '" text-anchor="' + anchor + '" class="g-etiqueta">' + esc(d.etiqueta) + '</text>');
    });
    // polígono de datos
    var pol = datos.map(function (d, i) {
      var p = polar(cx, cy, R * Math.max(0.02, d.valor / 100), arranque + (i * 2 * Math.PI) / n);
      return fmt(p[0]) + "," + fmt(p[1]);
    });
    out.push('<polygon points="' + pol.join(" ") + '" class="g-datos"/>');
    datos.forEach(function (d, i) {
      var p = polar(cx, cy, R * Math.max(0.02, d.valor / 100), arranque + (i * 2 * Math.PI) / n);
      out.push('<circle cx="' + fmt(p[0]) + '" cy="' + fmt(p[1]) + '" r="4.5" fill="' + (d.color || "var(--acento)") + '" class="g-punto"/>');
    });
    out.push("</svg>");
    return out.join("");
  }

  /* ---------- barras horizontales ---------- */
  function barras(items, o) {
    o = o || {};
    var W = o.ancho || 360;
    var fila = o.fila || 44;
    var etiquetaAncho = o.etiquetaAncho || 128;
    var pad = 8;
    var H = items.length * fila + pad * 2;
    var largo = W - etiquetaAncho - 54;
    var out = [];
    out.push('<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.titulo || "Gráfico de barras") + '" class="grafico grafico-barras">');
    items.forEach(function (it, i) {
      var y = pad + i * fila;
      var v = Math.max(0, Math.min(100, it.valor));
      out.push('<text x="0" y="' + (y + 22) + '" class="g-etiqueta g-etiqueta-b">' + esc(it.etiqueta) + '</text>');
      out.push('<rect x="' + etiquetaAncho + '" y="' + (y + 10) + '" width="' + largo + '" height="16" rx="8" class="g-pista"/>');
      out.push('<rect x="' + etiquetaAncho + '" y="' + (y + 10) + '" width="' + fmt(Math.max(8, largo * v / 100)) + '" height="16" rx="8" fill="' + (it.color || "var(--acento)") + '" class="g-barra"/>');
      out.push('<text x="' + (etiquetaAncho + largo + 8) + '" y="' + (y + 23) + '" class="g-valor">' + Math.round(v) + (o.sufijo || "%") + '</text>');
    });
    out.push("</svg>");
    return out.join("");
  }

  /* ---------- escala bipolar (dos extremos) ---------- */
  function bipolar(items, o) {
    o = o || {};
    var W = o.ancho || 360;
    var fila = o.fila || 64;
    var pad = 6;
    var H = items.length * fila + pad * 2;
    var x0 = 6, x1 = W - 6, largo = x1 - x0;
    var out = [];
    out.push('<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.titulo || "Escalas") + '" class="grafico grafico-bipolar">');
    items.forEach(function (it, i) {
      var y = pad + i * fila;
      // valor: 0 = polo izquierdo, 100 = polo derecho
      var v = Math.max(0, Math.min(100, it.valor));
      var px = x0 + largo * v / 100;
      out.push('<text x="' + x0 + '" y="' + (y + 14) + '" class="g-etiqueta g-polo">' + esc(it.izq) + '</text>');
      out.push('<text x="' + x1 + '" y="' + (y + 14) + '" text-anchor="end" class="g-etiqueta g-polo">' + esc(it.der) + '</text>');
      if (it.titulo) out.push('<text x="' + (W / 2) + '" y="' + (y + 14) + '" text-anchor="middle" class="g-etiqueta g-centro">' + esc(it.titulo) + '</text>');
      out.push('<rect x="' + x0 + '" y="' + (y + 26) + '" width="' + largo + '" height="12" rx="6" class="g-pista"/>');
      out.push('<line x1="' + fmt(W / 2) + '" y1="' + (y + 22) + '" x2="' + fmt(W / 2) + '" y2="' + (y + 42) + '" class="g-marca"/>');
      out.push('<circle cx="' + fmt(px) + '" cy="' + (y + 32) + '" r="10" fill="' + (it.color || "var(--acento)") + '" class="g-punto"/>');
      if (it.nota) out.push('<text x="' + fmt(Math.min(Math.max(px, 40), W - 40)) + '" y="' + (y + 58) + '" text-anchor="middle" class="g-nota">' + esc(it.nota) + '</text>');
    });
    out.push("</svg>");
    return out.join("");
  }

  /* ---------- anillo de porcentaje ---------- */
  function anillo(valor, o) {
    o = o || {};
    var S = o.tam || 160;
    var r = S / 2 - 14;
    var c = 2 * Math.PI * r;
    var v = Math.max(0, Math.min(100, valor));
    return '<svg viewBox="0 0 ' + S + ' ' + S + '" role="img" aria-label="' + esc(o.titulo || "Porcentaje") + '" class="grafico grafico-anillo">' +
      '<circle cx="' + S / 2 + '" cy="' + S / 2 + '" r="' + r + '" class="g-pista-anillo" fill="none" stroke-width="14"/>' +
      '<circle cx="' + S / 2 + '" cy="' + S / 2 + '" r="' + r + '" fill="none" stroke="' + (o.color || "var(--acento)") + '" stroke-width="14" stroke-linecap="round" ' +
      'stroke-dasharray="' + fmt(c * v / 100) + " " + fmt(c) + '" transform="rotate(-90 ' + S / 2 + " " + S / 2 + ')"/>' +
      '<text x="' + S / 2 + '" y="' + (S / 2 + 2) + '" text-anchor="middle" class="g-anillo-num">' + Math.round(v) + '%</text>' +
      (o.etiqueta ? '<text x="' + S / 2 + '" y="' + (S / 2 + 24) + '" text-anchor="middle" class="g-nota">' + esc(o.etiqueta) + '</text>' : "") +
      "</svg>";
  }

  /* ---------- ranking de posiciones (valores) ---------- */
  function puntos(items, o) {
    o = o || {};
    var W = o.ancho || 360;
    var fila = o.fila || 40;
    var H = items.length * fila + 10;
    var out = ['<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(o.titulo || "Ranking") + '" class="grafico grafico-puntos">'];
    var mx = Math.max.apply(null, items.map(function (i) { return Math.abs(i.valor); })) || 1;
    var cx = W / 2 + 36;
    var ancho = (W - 180) / 2;
    items.forEach(function (it, i) {
      var y = 6 + i * fila;
      var len = Math.abs(it.valor) / mx * ancho;
      var x = it.valor >= 0 ? cx : cx - len;
      out.push('<text x="0" y="' + (y + 21) + '" class="g-etiqueta g-etiqueta-b">' + esc(it.etiqueta) + '</text>');
      out.push('<rect x="' + fmt(x) + '" y="' + (y + 8) + '" width="' + fmt(Math.max(3, len)) + '" height="16" rx="6" fill="' + (it.color || "var(--acento)") + '" opacity="' + (it.valor >= 0 ? 1 : 0.45) + '"/>');
    });
    out.push('<line x1="' + cx + '" y1="2" x2="' + cx + '" y2="' + (H - 2) + '" class="g-marca"/>');
    out.push("</svg>");
    return out.join("");
  }

  window.Graficos = { radar: radar, barras: barras, bipolar: bipolar, anillo: anillo, puntos: puntos, esc: esc };
})();
