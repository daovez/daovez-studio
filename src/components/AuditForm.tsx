import { useState, type FormEvent } from 'react';
import { actions } from 'astro:actions';

type Status = 'idle' | 'sending' | 'success' | 'error';

const topics = [
	{ value: 'automation', label: 'Automatización', detail: 'n8n / APIs', icon: '🤖' },
	{ value: 'ai', label: 'Inteligencia Artificial', detail: 'Bots', icon: '🧠' },
	{ value: 'web-apps', label: 'Desarrollo Web', detail: '& Apps', icon: '💻' },
	{ value: 'security', label: 'Ciberseguridad', detail: '& Servidores', icon: '🔒' }
] as const;

export default function AuditForm() {
	const [status, setStatus] = useState<Status>('idle');
	const [message, setMessage] = useState('');
	const [selectedTopic, setSelectedTopic] = useState('');

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!selectedTopic) {
			setStatus('error');
			setMessage('Selecciona el área que quieres mejorar.');
			return;
		}
		setStatus('sending');
		setMessage('');
		const form = new FormData(event.currentTarget);
		const result = await actions.submitAudit({
			name: String(form.get('name') ?? ''),
			email: String(form.get('email') ?? ''),
			company: String(form.get('company') ?? ''),
			topic: selectedTopic,
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
		setSelectedTopic('');
	}

	return (
		<form className="audit-form" onSubmit={handleSubmit} noValidate>
			<div className="form-row">
				<div className="field"><label htmlFor="name">NOMBRE</label><input id="name" name="name" required autoComplete="name" /></div>
				<div className="field"><label htmlFor="email">EMAIL</label><input id="email" name="email" type="email" required autoComplete="email" /></div>
			</div>
			<div className="field"><label htmlFor="company">EMPRESA</label><input id="company" name="company" required autoComplete="organization" /></div>
			<fieldset className="topic-field">
				<legend>¿EN QUÉ PODEMOS AYUDARTE?</legend>
				<div className="topic-options">
					{topics.map((topic) => (
						<button
							className={`topic-option${selectedTopic === topic.value ? ' is-selected' : ''}`}
							type="button"
							aria-pressed={selectedTopic === topic.value}
							key={topic.value}
							onClick={() => {
								setSelectedTopic(topic.value);
								if (status === 'error') {
									setStatus('idle');
									setMessage('');
								}
							}}
						>
							<span className="topic-icon" aria-hidden="true">{topic.icon}</span>
							<span className="topic-copy"><strong>{topic.label}</strong><small>{topic.detail}</small></span>
						</button>
					))}
				</div>
				<input type="hidden" name="topic" value={selectedTopic} />
			</fieldset>
			<div className="field"><label htmlFor="challenge">¿QUÉ QUIERES MEJORAR?</label><textarea id="challenge" name="challenge" required minLength={20} maxLength={2000} placeholder="Cuéntanos brevemente qué proceso o reto tienes en mente." /></div>
			<div className="honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
			<button className="button" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando...' : 'Solicitar auditoría'}</button>
			<p className="form-privacy">Al enviar este formulario, puedes escribirnos a <a href="mailto:yo@daovez.com">yo@daovez.com</a> para consultar cómo tratamos tu solicitud.</p>
			<p className={`form-status ${status}`} role="status" aria-live="polite">{message}</p>
		</form>
	);
}
