import { t as defineAction } from "./server_wuQ_QGiF.mjs";
import "./_astro_actions_E2z5RvxP.mjs";
import { z } from "zod";
// src/actions/index.ts
var recentRequests = /* @__PURE__ */ new Map();
var requestSchema = z.object({
	name: z.string().trim().min(2, "Indica tu nombre.").max(80),
	email: z.string().trim().email("Indica un email válido.").max(160),
	company: z.string().trim().min(2, "Indica tu empresa.").max(120),
	challenge: z.string().trim().min(20, "Cuéntanos un poco más sobre tu reto.").max(2e3),
	website: z.string().max(0).optional()
});
var server = { submitAudit: defineAction({
	input: requestSchema,
	handler: async (input, context) => {
		if (input.website) throw new Error("Solicitud no válida.");
		const ip = context.request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
		const now = Date.now();
		const previous = recentRequests.get(ip);
		if (previous && now - previous < 6e4) throw new Error("Espera un minuto antes de enviar otra solicitud.");
		recentRequests.set(ip, now);
		if (recentRequests.size > 5e3) {
			for (const [key, timestamp] of recentRequests) if (now - timestamp > 3e5) recentRequests.delete(key);
		}
		return { status: "received" };
	}
}) };
export { server };
