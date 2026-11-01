export interface AuditRequest {
	name: string;
	email: string;
	company: string;
	topic: 'automation' | 'ai' | 'web-apps' | 'security';
	challenge: string;
}

export interface AutomationService {
	submitAudit(request: AuditRequest): Promise<{ status: 'received' | 'queued' }>;
}

export function createAutomationService(): AutomationService | null {
	return null;
}
