import type { Context } from '@netlify/functions';

const toEmail = 'website@virgosites.com';

const emailTemplate = (params: {
	name: string;
	surname: string;
	company: string;
	website: string;
	subject: string;
	contact: string;
}) => `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${params.subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
<div style="width:100%;background-color:#f4f4f6">
<table role="presentation" cellspacing="0" cellpadding="0" width="100%">
<tr><td style="padding:28px 16px">
<table role="presentation" style="width:100%;max-width:680px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden" cellspacing="0" cellpadding="0">
<tr><td style="padding:22px 24px">
	<h1 style="font-size:18px;margin:0 0 12px 0;color:#111111">Ciao da ${params.name} ${params.surname},</h1>
	<p style="margin:0 0 12px 0;font-size:16px;color:#111111;font-weight:600">${params.subject}</p>
	<p style="font-size:15px;line-height:1.55;color:#333333;margin:0 0 16px 0">
		Questo messaggio &egrave; inviato da <strong>${params.company}</strong>.<br/>
		Per qualsiasi informazione puoi contattarci a: ${params.contact}<br/>
		o visitare il nostro sito: ${params.website}
	</p>
	<p style="margin:18px 0 0 0">
		<a href="${params.website}" target="_blank" style="display:inline-block;padding:12px 18px;text-decoration:none;border-radius:6px;background:#f20050;color:#ffffff;font-weight:600">Visita il sito</a>
	</p>
</td></tr>
<tr><td style="padding:18px 24px;font-size:13px;color:#7a7a7a;background:#fafafa">
	<p style="margin:0 0 4px 0">Ricevuto da landing VirgoV4</p>
</td></tr>
</table>
</td></tr>
</table>
</div>
</body>
</html>`;

export default async (request: Request, _context: Context) => {
	if (request.method !== 'POST') {
		return new Response(JSON.stringify('Method not allowed'), { status: 405 });
	}

	const requestBody = await request.json() as {
		name: string;
		surname: string;
		company: string;
		website: string;
		subject: string;
		contact: string;
	};

	const domain = process.env.NETLIFY_EMAILS_MAILGUN_DOMAIN as string;
	const apiKey = process.env.NETLIFY_EMAILS_PROVIDER_API_KEY as string;
	const region = process.env.NETLIFY_EMAILS_MAILGUN_HOST_REGION || 'eu';
	const baseUrl = region === 'eu' ? 'https://api.eu.mailgun.net' : 'https://api.mailgun.net';

	const html = emailTemplate({
		name: requestBody.name,
		surname: requestBody.surname,
		company: requestBody.company || '',
		website: requestBody.website || '',
		subject: requestBody.subject,
		contact: requestBody.contact
	});

	const formData = new URLSearchParams();
	formData.append('from', `Virgo Website <postmaster@${domain}>`);
	formData.append('to', toEmail);
	formData.append('subject', `From website - ${requestBody.name}`);
	formData.append('html', html);

	const res = await fetch(`${baseUrl}/v3/${domain}/messages`, {
		method: 'POST',
		headers: {
			Authorization: 'Basic ' + btoa(`api:${apiKey}`)
		},
		body: formData
	});

	if (!res.ok) {
		const errorBody = await res.text();
		console.error('Mailgun error:', res.status, errorBody);
		return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
	}

	return new Response(JSON.stringify('Email sent!'), { status: 200 });
};
