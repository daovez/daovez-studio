import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { n as getActionContext } from "./server_wuQ_QGiF.mjs";
// node_modules/astro/dist/actions/runtime/entrypoints/route.js
var route_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var POST = async (context) => {
	const { action, serializeActionResult } = getActionContext(context);
	if (action?.calledFrom !== "rpc") return new Response("Not found", { status: 404 });
	const serialized = serializeActionResult(await action.handler());
	if (serialized.type === "empty") return new Response(null, { status: serialized.status });
	return new Response(serialized.body, {
		status: serialized.status,
		headers: { "Content-Type": serialized.contentType }
	});
};
// \0virtual:astro:page:node_modules/astro/dist/actions/runtime/entrypoints/route@_@js
var page = () => route_exports;
export { page };
