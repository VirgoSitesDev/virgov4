<script lang="ts">
	let name = $state('');
	let surname = $state('');
	let company = $state('');
	let website = $state('');
	let message = $state('');
	let email = $state('');
	let phone = $state('');
	let contactPreference = $state('email');
	let showSuccessPopup = $state(false);
	let showErrorPopup = $state(false);

	const sendReq = async (e: Event) => {
		e.preventDefault();
		try {
			const data = {
				name,
				surname,
				company,
				website,
				subject: message,
				contact: contactPreference === 'email' ? email : phone
			};
			const response = await fetch('/.netlify/functions/mail', {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify(data)
			});
			if (response.ok) {
				showSuccessPopup = true;
				name = '';
				surname = '';
				company = '';
				website = '';
				message = '';
				email = '';
				phone = '';
				contactPreference = 'email';
				setTimeout(() => (showSuccessPopup = false), 3000);
			} else {
				showErrorPopup = true;
				setTimeout(() => (showErrorPopup = false), 3000);
			}
		} catch (error) {
			console.error('Error:', error);
			showErrorPopup = true;
			setTimeout(() => (showErrorPopup = false), 3000);
		}
	};
</script>

<section class="contact" id="contact">
	<div class="contact-container">
		<h2>Hai un progetto? Costruiamolo insieme.</h2>
		<p class="contact-subtitle">
			Raccontaci la tua idea. Che si tratti di un sito web, di un e-commerce o di un software
			personalizzato,<br />ti accompagneremo passo dopo passo — dall'analisi alla messa online —
			con la qualità e la precisione del metodo Virgo.
		</p>

		<form class="contact-form" onsubmit={sendReq}>
			<div class="form-row">
				<div class="form-group">
					<label for="nome">Nome</label>
					<input
						type="text"
						id="nome"
						name="nome"
						placeholder="Inserisci qui il tuo nome"
						bind:value={name}
						required
					/>
				</div>
				<div class="form-group">
					<label for="azienda">Azienda</label>
					<input
						type="text"
						id="azienda"
						name="azienda"
						placeholder="Se hai un'azienda inseriscila qui"
						bind:value={company}
					/>
				</div>
			</div>

			<div class="form-row">
				<div class="form-group">
					<label for="cognome">Cognome</label>
					<input
						type="text"
						id="cognome"
						name="cognome"
						placeholder="Inserisci qui il tuo cognome"
						bind:value={surname}
						required
					/>
				</div>
				<div class="form-group">
					<label for="sitoWeb">Sito Web</label>
					<input
						type="url"
						id="sitoWeb"
						name="sitoWeb"
						placeholder="Se hai un sito web inseriscilo qui"
						bind:value={website}
					/>
				</div>
			</div>

			<div class="form-group full-width">
				<label for="messaggio">Di cosa hai bisogno?</label>
				<textarea
					id="messaggio"
					name="messaggio"
					placeholder="Raccontaci qualcosa delle tue idee"
					bind:value={message}
					required
				></textarea>
			</div>

			<div class="form-group full-width">
				<label>Come preferisci essere ricontattato?</label>
				<div class="contact-options">
					<label class="contact-option">
						<input
							type="radio"
							name="contattoPreferito"
							value="email"
							bind:group={contactPreference}
						/>
						<span>Email</span>
					</label>
					<label class="contact-option">
						<input
							type="radio"
							name="contattoPreferito"
							value="telefono"
							bind:group={contactPreference}
						/>
						<span>Telefono</span>
					</label>
				</div>
			</div>

			{#if contactPreference === 'email'}
				<div class="form-group full-width">
					<input
						type="email"
						id="email"
						name="email"
						placeholder="Inserisci qui la tua email"
						bind:value={email}
						required
					/>
				</div>
			{:else}
				<div class="form-group full-width">
					<input
						type="tel"
						id="telefono"
						name="telefono"
						placeholder="Inserisci qui il tuo numero"
						bind:value={phone}
						required
					/>
				</div>
			{/if}

			<div class="submit-wrapper">
				<button type="submit" class="submit-btn">Invia</button>
			</div>
		</form>
	</div>
</section>

{#if showSuccessPopup}
	<div class="popup-overlay">
		<div class="popup-container popup-success">
			<div class="popup-icon">✓</div>
			<h3 class="popup-title">Messaggio inviato!</h3>
			<p class="popup-message">Ti risponderemo al più presto.</p>
		</div>
	</div>
{/if}

{#if showErrorPopup}
	<div class="popup-overlay">
		<div class="popup-container popup-error">
			<div class="popup-icon">✕</div>
			<h3 class="popup-title">Errore</h3>
			<p class="popup-message">Qualcosa è andato storto. Riprova più tardi.</p>
		</div>
	</div>
{/if}

<style>
	/* Contact Section */
	.contact {
		padding: 70px 0;
		background-color: #fafafa;
	}

	.contact-container {
		background: #f8f8f8;
		border: 1px solid #d6d6d6;
		border-radius: 24px;
		padding: 60px 40px;
		width: calc(100% - 120px);
		max-width: 100%;
		margin: 0 auto;
	}

	.contact-container h2 {
		font-family: 'IBM Plex Mono', monospace;
		font-size: clamp(22px, 2.8vw, 32px);
		font-weight: 600;
		margin-bottom: 20px;
		text-align: center;
		color: #000000;
	}

	.contact-subtitle {
		font-family: 'IBM Plex Sans', sans-serif;
		font-size: 20px;
		line-height: 1.4;
		color: #000000;
		text-align: center;
		margin-bottom: 60px;
	}

	.contact-form {
		display: grid;
		gap: 30px;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 30px;
	}

	.form-group {
		display: flex;
		flex-direction: column;
	}

	.form-group.full-width {
		grid-column: 1 / -1;
	}

	.form-group label {
		font-family: 'IBM Plex Sans', sans-serif;
		font-size: 16px;
		margin-bottom: 10px;
		color: #333333;
		font-weight: 500;
	}

	.form-group input:not([type='radio']),
	.form-group textarea {
		background: #ffffff;
		border: 1px solid #d0d0d0;
		border-radius: 12px;
		padding: 12px 15px;
		color: #000000;
		font-size: 16px;
		transition: all 0.3s ease;
		font-family: 'IBM Plex Sans', sans-serif;
	}

	.form-group input:not([type='radio']):focus,
	.form-group textarea:focus {
		outline: none;
		border-color: #f20050;
		box-shadow: 0 0 0 3px rgba(242, 0, 80, 0.1);
	}

	.form-group textarea {
		min-height: 120px;
		resize: vertical;
	}

	.contact-options {
		display: flex;
		gap: 30px;
		margin-top: 10px;
	}

	.contact-option {
		font-family: 'IBM Plex Sans', sans-serif;
		display: flex;
		align-items: center;
		gap: 10px;
		cursor: pointer;
		font-size: 16px;
		color: #333333;
	}

	.contact-option input[type='radio'] {
		width: 18px;
		height: 18px;
		accent-color: #f20050;
		-webkit-appearance: radio;
		appearance: radio;
		background-color: transparent;
		border: none;
		box-shadow: none;
		color: #f20050;
	}

	.contact-option input[type='radio']:focus {
		outline: none;
		box-shadow: none;
		ring: none;
		--tw-ring-color: transparent;
	}

	.contact-option input[type='radio']:checked {
		background-color: transparent;
		border-color: transparent;
		background-image: none;
	}

	.submit-wrapper {
		display: flex;
		justify-content: center;
	}

	.submit-btn {
		background: #f20050;
		color: #fafafa;
		border: none;
		border-radius: 12px;
		padding: 12px 24px;
		font-family: 'IBM Plex Mono', monospace;
		font-size: 20px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		text-decoration: none;
		width: 380px;
		height: 48px;
	}

	.submit-btn:hover {
		background: #d9004a;
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(242, 0, 80, 0.25);
	}

	/* Popup Styles */
	.popup-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
		animation: fadeIn 0.3s ease;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.popup-container {
		background: #fafafa;
		border: 1px solid #d6d6d6;
		border-radius: 16px;
		padding: 40px;
		max-width: 400px;
		text-align: center;
		animation: slideUp 0.3s ease;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
	}

	@keyframes slideUp {
		from {
			transform: translateY(20px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.popup-icon {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto 20px;
		font-size: 32px;
		font-weight: 600;
	}

	.popup-success .popup-icon {
		background: #f20050;
		color: #fafafa;
	}

	.popup-error .popup-icon {
		background: #ff4444;
		color: #fafafa;
	}

	.popup-title {
		font-family: 'IBM Plex Sans', sans-serif;
		font-size: 24px;
		font-weight: 600;
		color: #000000;
		margin-bottom: 10px;
	}

	.popup-message {
		font-family: 'IBM Plex Sans', sans-serif;
		font-size: 18px;
		color: #666666;
		line-height: 1.4;
		margin: 0;
	}

	/* Responsive - Tablet */
	@media (max-width: 1024px) {
		.contact-container {
			width: calc(100% - 80px);
			margin: 20px auto;
			padding: 40px;
		}
	}

	/* Responsive - Mobile */
	@media (max-width: 768px) {
		.contact {
			padding: 35px 0;
		}

		.contact-container {
			width: calc(100% - 40px);
			padding: 30px 20px;
		}

		.contact-subtitle {
			font-size: 15px;
		}

		.form-row {
			grid-template-columns: 1fr;
		}

		.submit-btn {
			width: 100%;
		}
	}
</style>
