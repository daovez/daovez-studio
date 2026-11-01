import { useState, type FormEvent } from 'react';
import { actions } from 'astro:actions';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function AuditForm() {
	const [status, setStatus] = useState<Status>('idle');
	const [message, setMessage] = useState('');

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setStatus('sending');
		setMessage('');
		const form = new FormData(event.currentTarget);
		const result = await actions.submitAudit({
			name: String(form.get('name') ?? ''),
			email: String(form.get('email') ?? ''),
			company: String(form.get('company') ?? ''),
			challenge: String(form.get('challenge') ?? ''),
			website: String(form.get('website') ?? '')
		});
		if (result.error) {
			setStatus('error');
			setMessage(result.error.message);
			return;
		}
		setStatus('success');
		setMessage('Gracias. Hemos recibido tu solicitud y te responderemos pronto.');
		event.currentTarget.reset();
	}

	return (
		<form className="audit-form" onSubmit={handleSubmit} noValidate>
			<div className="form-row">
				<div className="field"><label htmlFor="name">NOMBRE</label><input id="name" name="name" required autoComplete="name" /></div>
				<div className="field"><label htmlFor="email">EMAIL</label><input id="email" name="email" type="email" required autoComplete="email" /></div>
			</div>
			<div className="field"><label htmlFor="company">EMPRESA</label><input id="company" name="company" required autoComplete="organization" /></div>
			<div className="field"><label htmlFor="challenge">¿QUÉ QUIERES MEJORAR?</label><textarea id="challenge" name="challenge" required minLength={20} maxLength={2000} placeholder="Cuéntanos brevemente qué proceso o reto tienes en mente." /></div>
			<div className="honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
			<button className="button" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando...' : 'Solicitar auditoría'} <span aria-hidden="true">↗</span></button>
			<p className={`form-status ${status}`} role="status" aria-live="polite">{message}</p>
		</form>
	);
}
