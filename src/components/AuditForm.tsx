import { useState, type FormEvent } from 'react';
import { actions } from 'astro:actions';

type Status = 'idle' | 'sending' | 'success' | 'error';

const topics = [
	{ value: 'automation', label: 'Automatización', icon: 'automation' },
	{ value: 'ai', label: 'Inteligencia Artificial', icon: 'ai' },
	{ value: 'web-apps', label: 'Desarrollo Web', icon: 'web' },
	{ value: 'security', label: 'Ciberseguridad', icon: 'security' }
] as const;

function TopicIcon({ name }: { name: (typeof topics)[number]['icon'] }) {
	const paths = {
		automation: <><path d="M5 7h6a2 2 0 0 1 2 2v2" /><path d="M19 17h-6a2 2 0 0 1-2-2v-2" /><path d="m8 4-3 3 3 3" /><path d="m16 14 3 3-3 3" /></>,
		ai: <><path d="M12 3a4 4 0 0 0-4 4v1a4 4 0 0 0 0 8h8a4 4 0 0 0 0-8V7a4 4 0 0 0-4-4Z" /><path d="M9 12h.01M15 12h.01M10 15h4" /></>,
		web: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="m7 9 2 2-2 2M12 13h5" /></>,
		security: <><path d="M12 3 19 6v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" /><path d="m9 12 2 2 4-4" /></>
	};

	return <svg className="topic-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

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
							<TopicIcon name={topic.icon} />
							<span className="topic-copy"><strong>{topic.label}</strong></span>
						</button>
					))}
				</div>
				<input type="hidden" name="topic" value={selectedTopic} />
			</fieldset>
			<div className="field"><label htmlFor="challenge">¿QUÉ QUIERES MEJORAR?</label><textarea id="challenge" name="challenge" required minLength={20} maxLength={2000} placeholder="Cuéntanos brevemente qué proceso o reto tienes en mente." /></div>
			<div className="honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
			<button className="button" type="submit" disabled={status === 'sending'}><span>{status === 'sending' ? 'Enviando...' : 'Enviar consulta'}</span><span className="button-arrow" aria-hidden="true">→</span></button>
			<p className="form-privacy">Al enviar este formulario, puedes escribirnos a <a href="mailto:yo@daovez.com">yo@daovez.com</a> para consultar cómo tratamos tu solicitud.</p>
			<p className={`form-status ${status}`} role="status" aria-live="polite">{message}</p>
		</form>
	);
}
