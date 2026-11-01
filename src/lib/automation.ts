export interface AuditRequest {
	name: string;
	email: string;
	company: string;
	challenge: string;
}

export interface AutomationService {
	submitAudit(request: AuditRequest): Promise<{ status: 'received' | 'queued' }>;
}

export function createAutomationService(): AutomationService | null {
	return null;
}
