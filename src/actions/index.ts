import { defineAction } from 'astro:actions';
import { z } from 'zod';

const recentRequests = new Map<string, number>();
const requestSchema = z.object({
	name: z.string().trim().min(2, 'Indica tu nombre.').max(80),
	email: z.string().trim().email('Indica un email válido.').max(160),
	company: z.string().trim().min(2, 'Indica tu empresa.').max(120),
	challenge: z.string().trim().min(20, 'Cuéntanos un poco más sobre tu reto.').max(2000),
	website: z.string().max(0).optional()
});

export const server = {
	submitAudit: defineAction({
		input: requestSchema,
		handler: async (input, context) => {
			if (input.website) throw new Error('Solicitud no válida.');
			const ip = context.request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
			const now = Date.now();
			const previous = recentRequests.get(ip);
			if (previous && now - previous < 60_000) throw new Error('Espera un minuto antes de enviar otra solicitud.');
			recentRequests.set(ip, now);
			if (recentRequests.size > 5000) {
				for (const [key, timestamp] of recentRequests) if (now - timestamp > 300_000) recentRequests.delete(key);
			}
			// Deliberately no external call or persistence until an integration is configured.
			return { status: 'received' as const };
		}
	})
};
