/*properties
    appendChild, createDocument, createElement, dockOpen, hOffset, opacity,
    setAttribute, setDockItem, src, vOffset
*/

function buildVitality(bg, icon, hr, mn, degree) {
	var d, v, dock_bg, dock_icon, u, t, w;

	if (!widget.dockOpen) { return; }

	d = XMLDOM.createDocument();
	v = d.createElement("dock-item");
	v.setAttribute("version", "1.0");
	d.appendChild(v);

	dock_icon = d.createElement("image");
	dock_icon.setAttribute("src", icon);
	dock_icon.setAttribute("hOffset", 26);
	dock_icon.setAttribute("vOffset", 37);
	dock_icon.setAttribute("width", 25);
	dock_icon.setAttribute("height", 16);
	dock_icon.setAttribute("style", "opacity: " + icon.opacity / 200);
	v.appendChild(dock_icon);

	dock_bg = d.createElement("image");
	dock_bg.setAttribute("src", bg);
	dock_bg.setAttribute("hOffset", 0);
	dock_bg.setAttribute("vOffset", 0);
	v.appendChild(dock_bg);

	w = d.createElement("text");
	w.setAttribute("hOffset", "33");
	w.setAttribute("vOffset", "36");
	w.setAttribute("hAlign", "right");
	w.setAttribute("style", "text-align: right;font-family: 'Times New Roman'; font-stretch: condensed; font-size: 36px; color: #ffffff; -kon-shadow: 0px -1px rgba( 0, 0, 0, 0.7 )");
        w.setAttribute("data",  hr);
	v.appendChild(w);

	t = d.createElement("text");
	t.setAttribute("hOffset", "78");
	t.setAttribute("vOffset", "36");
	t.setAttribute("hAlign", "right");
	t.setAttribute("style", "text-align: right;font-family: 'Times New Roman'; font-stretch: condensed; font-size: 36px; color: #ffffff; -kon-shadow: 0px -1px rgba( 0, 0, 0, 0.7 )");
        t.setAttribute("data",  ":" + mn);
	v.appendChild(t);

	widget.setDockItem(d, "fade");
}
