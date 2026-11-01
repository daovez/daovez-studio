import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { d as createComponent, i as createImageAsset, n as $$Image, u as createAstro } from "./_astro_assets_CPOf41Gu.mjs";
import { t as actions } from "./_astro_actions_E2z5RvxP.mjs";
import { _ as createRenderInstruction, g as addAttribute, h as renderHead, m as maybeRenderHead, p as renderTemplate, s as renderComponent, u as renderSlot } from "./console_P7_SNA55.mjs";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
// node_modules/astro/dist/runtime/server/render/script.js
/**
* Relies on the `renderScript: true` compiler option
* @experimental
*/
async function renderScript(result, id) {
	const inlined = result.inlinedScripts.get(id);
	let content = "";
	if (inlined != null) {
		if (inlined) content = `<script type="module">${inlined}<\/script>`;
	} else {
		const resolved = await result.resolve(id);
		content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
	}
	return createRenderInstruction({
		type: "script",
		id,
		content
	});
}
// src/layouts/Layout.astro
createAstro("https://astro.build");
var $$Layout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Layout;
	const { title = "Daovez Studio — Automatización que escala contigo", description = "Diseñamos sistemas digitales y automatizaciones que convierten operaciones complejas en procesos claros, medibles y escalables.", canonical } = Astro.props;
	return renderTemplate`<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro.generator, "content")}><meta name="description"${addAttribute(description, "content")}><meta name="theme-color" content="#050505">${canonical && renderTemplate`<link rel="canonical"${addAttribute(canonical, "href")}>`}<link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"><title>${title}</title>${renderHead($$result)}</head><body>${renderSlot($$result, $$slots["default"])}</body></html>`;
}, "C:/Users/David/proyectos/daovez-studio/src/layouts/Layout.astro", void 0);
// src/assets/daovez-studio-logo.png
var daovez_studio_logo_default = createImageAsset({
	"src": "/_astro/daovez-studio-logo.QjR5C5qr.png",
	"width": 2172,
	"height": 724,
	"format": "png"
}, "C:/Users/David/proyectos/daovez-studio/src/assets/daovez-studio-logo.png", false);
// src/components/Brand.astro
var $$Brand = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<a class="brand" href="/" aria-label="Daovez Studio, inicio">${renderComponent($$result, "Image", $$Image, {
		"class": "brand-logo",
		"src": daovez_studio_logo_default,
		"alt": "DAOVEZ STUDIO",
		"widths": [
			240,
			480,
			720
		],
		"sizes": "(max-width: 760px) 180px, 240px",
		"width": 240,
		"height": 80,
		"loading": "eager"
	})}</a>`;
}, "C:/Users/David/proyectos/daovez-studio/src/components/Brand.astro", void 0);
// src/components/Navbar.astro
createAstro("https://astro.build");
var $$Navbar = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Navbar;
	const pathname = Astro.url.pathname.replace(/\/$/, "") || "/";
	return renderTemplate`${maybeRenderHead($$result)}<header class="site-header nav-header">${renderComponent($$result, "studio-navigation", "studio-navigation", {}, { "default": ($$result) => renderTemplate`<nav class="container nav" aria-label="Navegación principal"${addAttribute(pathname, "data-pathname")}>${renderComponent($$result, "Brand", $$Brand, {})}<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-links" aria-label="Abrir menú de navegación"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path class="nav-hamburger" d="M4 7h16M4 12h16M4 17h16"></path><path class="nav-close" d="m6 6 12 12M18 6 6 18"></path></svg></button><div class="nav-links" id="primary-links"><a class="nav-link" href="/#soluciones" data-section="soluciones">Soluciones</a><a class="nav-link" href="/demos"${addAttribute(pathname === "/demos" ? "page" : void 0, "aria-current")}>Demos</a><a class="nav-link" href="/#metodologia" data-section="metodologia">Método</a></div><a class="button button-small nav-contact" href="/contacto"${addAttribute(pathname === "/contacto" ? "page" : void 0, "aria-current")}>Hablemos <span aria-hidden="true">↗</span></a></nav>` })}</header>${renderScript($$result, "C:/Users/David/proyectos/daovez-studio/src/components/Navbar.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/David/proyectos/daovez-studio/src/components/Navbar.astro", void 0);
// src/components/Footer.astro
var $$Footer = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<footer class="footer"><div class="container footer-inner"><div>${renderComponent($$result, "Brand", $$Brand, {})}<p class="footer-note">Sistemas digitales para negocios<br>que quieren moverse mejor.</p></div><div class="footer-links"><a href="/demos">Demos</a><a href="/contacto">Contacto</a><a href="mailto:hola@daovezstudio.com">hola@daovezstudio.com</a></div></div><div class="container footer-bottom"><span>© ${(/* @__PURE__ */ new Date()).getFullYear()} Daovez Studio</span><span class="mono">Hecho con intención.</span></div></footer>`;
}, "C:/Users/David/proyectos/daovez-studio/src/components/Footer.astro", void 0);
// src/components/AuditForm.tsx
function AuditForm() {
	const [status, setStatus] = useState("idle");
	const [message, setMessage] = useState("");
	async function handleSubmit(event) {
		event.preventDefault();
		setStatus("sending");
		setMessage("");
		const form = new FormData(event.currentTarget);
		const result = await actions.submitAudit({
			name: String(form.get("name") ?? ""),
			email: String(form.get("email") ?? ""),
			company: String(form.get("company") ?? ""),
			challenge: String(form.get("challenge") ?? ""),
			website: String(form.get("website") ?? "")
		});
		if (result.error) {
			setStatus("error");
			setMessage(result.error.message);
			return;
		}
		setStatus("success");
		setMessage("Gracias. Hemos recibido tu solicitud y te responderemos pronto.");
		event.currentTarget.reset();
	}
	return /* @__PURE__ */ jsxs("form", {
		className: "audit-form",
		onSubmit: handleSubmit,
		noValidate: true,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "form-row",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "field",
					children: [/* @__PURE__ */ jsx("label", {
						htmlFor: "name",
						children: "NOMBRE"
					}), /* @__PURE__ */ jsx("input", {
						id: "name",
						name: "name",
						required: true,
						autoComplete: "name"
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "field",
					children: [/* @__PURE__ */ jsx("label", {
						htmlFor: "email",
						children: "EMAIL"
					}), /* @__PURE__ */ jsx("input", {
						id: "email",
						name: "email",
						type: "email",
						required: true,
						autoComplete: "email"
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "field",
				children: [/* @__PURE__ */ jsx("label", {
					htmlFor: "company",
					children: "EMPRESA"
				}), /* @__PURE__ */ jsx("input", {
					id: "company",
					name: "company",
					required: true,
					autoComplete: "organization"
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "field",
				children: [/* @__PURE__ */ jsx("label", {
					htmlFor: "challenge",
					children: "¿QUÉ QUIERES MEJORAR?"
				}), /* @__PURE__ */ jsx("textarea", {
					id: "challenge",
					name: "challenge",
					required: true,
					minLength: 20,
					maxLength: 2e3,
					placeholder: "Cuéntanos brevemente qué proceso o reto tienes en mente."
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "honeypot",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ jsx("label", {
					htmlFor: "website",
					children: "Website"
				}), /* @__PURE__ */ jsx("input", {
					id: "website",
					name: "website",
					tabIndex: -1,
					autoComplete: "off"
				})]
			}),
			/* @__PURE__ */ jsxs("button", {
				className: "button",
				type: "submit",
				disabled: status === "sending",
				children: [
					status === "sending" ? "Enviando..." : "Solicitar auditoría",
					" ",
					/* @__PURE__ */ jsx("span", {
						"aria-hidden": "true",
						children: "↗"
					})
				]
			}),
			/* @__PURE__ */ jsx("p", {
				className: `form-status ${status}`,
				role: "status",
				"aria-live": "polite",
				children: message
			})
		]
	});
}
// src/assets/daovez-studio-isotype.png
var daovez_studio_isotype_default = createImageAsset({
	"src": "/_astro/daovez-studio-isotype.ma6F-wGE.png",
	"width": 455,
	"height": 480,
	"format": "png"
}, "C:/Users/David/proyectos/daovez-studio/src/assets/daovez-studio-isotype.png", false);
// src/pages/contacto.astro
var contacto_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Contacto,
	file: () => $$file,
	url: () => $$url
});
var $$Contacto = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Contacto — Daovez Studio",
		"description": "Cuéntanos qué proceso quieres mejorar y solicita una auditoría inicial."
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Navbar", $$Navbar, {})}${maybeRenderHead($$result)}<main class="page-shell container contact-page"><div class="contact-layout"><div class="contact-editorial">${renderComponent($$result, "Image", $$Image, {
		"class": "contact-isotype",
		"src": daovez_studio_isotype_default,
		"alt": "",
		"width": 48,
		"height": 48,
		"loading": "eager"
	})}<p class="eyebrow">Primer paso</p><h1>Hablemos de lo<br><span>que sigue.</span></h1><div class="contact-aside"><p>No necesitas tener la solución definida. Solo el reto. Analizamos el contexto y te ayudamos a encontrar el siguiente movimiento.</p><span class="mono">Respuesta en 1–2 días laborables</span></div></div>${renderComponent($$result, "AuditForm", AuditForm, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/David/proyectos/daovez-studio/src/components/AuditForm.tsx",
		"client:component-export": "default"
	})}</div></main>${renderComponent($$result, "Footer", $$Footer, {})}` })}`;
}, "C:/Users/David/proyectos/daovez-studio/src/pages/contacto.astro", void 0);
var $$file = "C:/Users/David/proyectos/daovez-studio/src/pages/contacto.astro";
var $$url = "/contacto";
// \0virtual:astro:page:src/pages/contacto@_@astro
var page = () => contacto_exports;
export { page };
