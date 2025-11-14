<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	let { children } = $props();

	//* FOOTER IMPORTS *//
	import logo_ext_3 from '$lib/assets/svgs/QST3_LOGHI/QST3_EXTENDED_2.svg';
	import { Footer, FooterBrand, FooterLinkGroup, FooterLink } from 'flowbite-svelte';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Virgo</title>
</svelte:head>

{@render children?.()}

<!--* FOOTER *-->
<Footer footerType="socialmedia" class="bg-gray-50 dark:bg-black">
	<hr class="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />
	<div class="flex flex-col gap-12 pb-40 lg:flex-row lg:gap-24 lg:pr-24">
		<div class="mr-24">
			<FooterBrand href="/" src={logo_ext_3} alt="Virgo" aClass="flex mb-6" />
			<p class=" text-gray-600 dark:text-gray-400">People Beyond AI</p>
			<p class=" text-gray-600 dark:text-gray-400">
				VIRGO S.r.l. Strada comunale delle Corti, 54 - 31100 TREVISO - TV - P.IVA: 05543270267
			</p>
		</div>
		<div>
			<h2 class="mb-6 text-sm font-semibold text-gray-400 uppercase dark:text-white">Brands</h2>
			<FooterLinkGroup>
				<FooterLink target="_blank" class="mb-4" href="https://qdesign.it/">Q Design</FooterLink>
			</FooterLinkGroup>
		</div>
		<div>
			<h2 class="mb-6 text-sm font-semibold text-gray-400 uppercase dark:text-white">Social</h2>
			<FooterLinkGroup>
				<FooterLink target="_blank" class="mb-4" href="https://www.instagram.com/virgo.solutions/"
					>Instagram</FooterLink
				>
				<FooterLink
					target="_blank"
					class="mb-4"
					href="https://www.linkedin.com/company/virgosolutions/posts/?feedView=all"
					>LinkedIn</FooterLink
				>
				<FooterLink target="_blank" class="mb-4" href="https://wa.me/393333218804"
					>WhatsApp</FooterLink
				>
			</FooterLinkGroup>
		</div>

		<!-- <div>
			<h2 class="mb-6 text-sm font-semibold uppercase text-gray-400 dark:text-white">Legal</h2>
			<FooterLinkGroup>
				<FooterLink
					class="mb-4"
					href="https://github.com/themesberg/flowbite-svelte-blocks/blob/main/License"
					>LICENSE</FooterLink
				>
			</FooterLinkGroup>
		</div> -->

		<!--
		IUBENDA INTEGRATION
		-->
		<div>
			<h2 class="mb-6 text-sm font-semibold text-gray-400 uppercase dark:text-white">Legals</h2>
			<FooterLinkGroup>
				<FooterLink
					target="_blank"
					class="mb-4"
					href="https://www.iubenda.com/privacy-policy/51115786"
					title="Privacy Policy ">Privacy Policy</FooterLink
				>
				<script type="text/javascript">
					(function (w, d) {
						var loader = function () {
							var s = d.createElement('script'),
								tag = d.getElementsByTagName('script')[0];
							s.src = 'https://cdn.iubenda.com/iubenda.js';
							tag.parentNode.insertBefore(s, tag);
						};
						if (w.addEventListener) {
							w.addEventListener('load', loader, false);
						} else if (w.attachEvent) {
							w.attachEvent('onload', loader);
						} else {
							w.onload = loader;
						}
					})(window, document);
				</script>
				<FooterLink
					target="_blank"
					class="mb-4"
					href="https://www.iubenda.com/privacy-policy/51115786/cookie-policy"
					title="Cookie Policy ">Cookie Policy</FooterLink
				><script type="text/javascript">
					(function (w, d) {
						var loader = function () {
							var s = d.createElement('script'),
								tag = d.getElementsByTagName('script')[0];
							s.src = 'https://cdn.iubenda.com/iubenda.js';
							tag.parentNode.insertBefore(s, tag);
						};
						if (w.addEventListener) {
							w.addEventListener('load', loader, false);
						} else if (w.attachEvent) {
							w.attachEvent('onload', loader);
						} else {
							w.onload = loader;
						}
					})(window, document);
				</script>
			</FooterLinkGroup>
		</div>
	</div>
</Footer>
