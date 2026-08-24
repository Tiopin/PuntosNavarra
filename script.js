const menuToggle = document.querySelector('.menu-toggle');
const siteNavigation = document.querySelector('.site-navigation');
const menuCourses = document.querySelector('.site-navigation__courses');
const menuCoursesToggle = document.querySelector('.site-navigation__courses-toggle');
const menuCoursesPanel = document.querySelector('#menu-courses-panel');
const menuCoursesList = document.querySelector('#menu-courses-list');
const menuCoursesStatus = document.querySelector('#menu-courses-status');
const heroMapLink = document.querySelector('#hero-map-link');
const schoolSection = document.querySelector('.school-section');
const schoolToggle = document.querySelector('.school-section__toggle');
const schoolPanel = document.querySelector('#school-section-panel');
const schoolMapToggle = document.querySelector('.school-map__toggle');
const schoolMapPanel = document.querySelector('#school-map-panel');
let navigationInProgress = false;
let navigationTarget = null;
let openedFromContact = false;

function cerrarMenuCursos() {
	if (!menuCoursesToggle || !menuCoursesPanel) {
		return;
	}

	menuCoursesToggle.setAttribute('aria-expanded', 'false');
	menuCoursesPanel.hidden = true;
}

if (menuCourses && menuCoursesToggle && menuCoursesPanel) {
	menuCoursesToggle.addEventListener('click', () => {
		const isOpen = menuCoursesToggle.getAttribute('aria-expanded') !== 'true';
		menuCoursesToggle.setAttribute('aria-expanded', String(isOpen));
		menuCoursesPanel.hidden = !isOpen;
	});

	document.addEventListener('keydown', event => {
		if (event.key === 'Escape') {
			cerrarMenuCursos();
		}
	});

	document.addEventListener('click', event => {
		if (!menuCourses.contains(event.target)) {
			cerrarMenuCursos();
		}
	});
}

if (menuToggle && siteNavigation) {
	menuToggle.addEventListener('click', () => {
		const isOpen = siteNavigation.classList.toggle('is-open');

		menuToggle.setAttribute('aria-expanded', String(isOpen));
		menuToggle.querySelector('.sr-only').textContent = isOpen ? 'Cerrar menú' : 'Abrir menú';

		if (!isOpen) {
			cerrarMenuCursos();
		}
	});
}

const pointsCard = document.querySelector('.support-card--points');
const pointsInfoPanel = document.querySelector('#points-info-panel');
const permitCard = document.querySelector('.support-card--permit');
const permitInfoPanel = document.querySelector('#permit-info-panel');
const sensibilizacionCard = document.querySelector('.advantage--sensibilizacion');
const sensibilizacionInfoPanel = document.querySelector('#sensibilizacion-info-panel');

if (pointsCard && pointsInfoPanel) {
	const togglePointsInfo = () => {
		const isOpen = pointsCard.getAttribute('aria-expanded') !== 'true';

		pointsCard.setAttribute('aria-expanded', String(isOpen));
		pointsInfoPanel.hidden = !isOpen;

		if (isOpen) {
			pointsInfoPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	pointsCard.addEventListener('click', togglePointsInfo);
	pointsCard.addEventListener('keydown', event => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			togglePointsInfo();
		}
	});
}

if (permitCard && permitInfoPanel) {
	const togglePermitInfo = () => {
		const isOpen = permitCard.getAttribute('aria-expanded') !== 'true';

		permitCard.setAttribute('aria-expanded', String(isOpen));
		permitInfoPanel.hidden = !isOpen;

		if (isOpen) {
			permitInfoPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	permitCard.addEventListener('click', togglePermitInfo);
	permitCard.addEventListener('keydown', event => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			togglePermitInfo();
		}
	});
}

if (sensibilizacionCard && sensibilizacionInfoPanel) {
	const toggleSensibilizacionInfo = () => {
		const isOpen = sensibilizacionCard.getAttribute('aria-expanded') !== 'true';

		sensibilizacionCard.setAttribute('aria-expanded', String(isOpen));
		sensibilizacionInfoPanel.hidden = !isOpen;

		if (isOpen) {
			sensibilizacionInfoPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	sensibilizacionCard.addEventListener('click', toggleSensibilizacionInfo);
	sensibilizacionCard.addEventListener('keydown', event => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			toggleSensibilizacionInfo();
		}
	});
}

if (schoolSection && schoolToggle && schoolPanel) {
	const closeSchoolMap = () => {
		if (!schoolMapToggle || !schoolMapPanel) {
			return;
		}

		schoolMapToggle.setAttribute('aria-expanded', 'false');
		schoolMapToggle.textContent = 'CÓMO LLEGAR';
		schoolMapPanel.hidden = true;
		schoolMapPanel.setAttribute('aria-hidden', 'true');
	};

	const openSchoolMap = () => {
		if (!schoolMapToggle || !schoolMapPanel) {
			return;
		}

		navigationInProgress = true;
		navigationTarget = schoolMapPanel;
		openedFromContact = true;
		schoolSection.classList.add('is-open');
		schoolToggle.setAttribute('aria-expanded', 'true');
		schoolToggle.hidden = true;
		schoolPanel.hidden = false;
		schoolMapToggle.setAttribute('aria-expanded', 'true');
		schoolMapToggle.textContent = 'OCULTAR MAPA ↑';
		schoolMapPanel.hidden = false;
		schoolMapPanel.setAttribute('aria-hidden', 'false');

		window.requestAnimationFrame(() => {
			schoolMapPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
		});

		let completed = false;
		const restoreNavigation = () => {
			if (completed) {
				return;
			}

			completed = true;
			navigationInProgress = false;
			navigationTarget = null;
			window.removeEventListener('scrollend', restoreNavigation);
		};

		window.addEventListener('scrollend', restoreNavigation, { once: true });
		window.setTimeout(restoreNavigation, 1200);
	};

	const closeSchoolSection = () => {
		closeSchoolMap();
		openedFromContact = false;
		schoolSection.classList.remove('is-open');
		schoolToggle.setAttribute('aria-expanded', 'false');
		schoolToggle.textContent = 'VER ↓';
		schoolToggle.hidden = false;
		schoolPanel.hidden = true;
	};

	const navigateFromMenu = targetId => {
		const target = targetId === 'index.html' ? null : document.querySelector(targetId);
		const isContact = targetId === '#contacto';
		const contactTarget = document.querySelector('#school-contact');

		navigationInProgress = true;
		openedFromContact = isContact;

		if (isContact && schoolPanel.hidden) {
			schoolSection.classList.add('is-open');
			schoolToggle.setAttribute('aria-expanded', 'true');
			schoolToggle.hidden = true;
			schoolPanel.hidden = false;
			closeSchoolMap();
		}

		const scrollTarget = isContact ? contactTarget : target;

		if (targetId === 'index.html') {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else if (scrollTarget) {
			window.requestAnimationFrame(() => {
				scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
			});
		}

		let completed = false;
		const restoreNavigation = () => {
			if (completed) {
				return;
			}

			completed = true;
			navigationInProgress = false;
			navigationTarget = null;
			window.removeEventListener('scrollend', restoreNavigation);
		};

		window.addEventListener('scrollend', restoreNavigation, { once: true });
		window.setTimeout(restoreNavigation, 1200);
		navigationTarget = scrollTarget;
	};

	document.querySelectorAll('a.site-navigation__link').forEach(link => {
		link.addEventListener('click', event => {
			event.preventDefault();
			navigateFromMenu(link.getAttribute('href'));
		});
	});

	if (heroMapLink) {
		heroMapLink.addEventListener('click', event => {
			event.preventDefault();
			openSchoolMap();
		});
	}

	schoolToggle.addEventListener('click', () => {
		schoolSection.classList.add('is-open');
		schoolToggle.setAttribute('aria-expanded', 'true');
		schoolToggle.hidden = true;
		schoolPanel.hidden = false;
		schoolPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
	});

	if (schoolMapToggle && schoolMapPanel) {
		schoolMapToggle.addEventListener('click', () => {
			const isOpen = schoolMapToggle.getAttribute('aria-expanded') !== 'true';

			schoolMapToggle.setAttribute('aria-expanded', String(isOpen));
			schoolMapToggle.textContent = isOpen ? 'OCULTAR MAPA ↑' : 'CÓMO LLEGAR';
			schoolMapPanel.hidden = !isOpen;
			schoolMapPanel.setAttribute('aria-hidden', String(!isOpen));

			if (isOpen) {
				schoolMapPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		});
	}

	window.addEventListener('scroll', () => {
		if (navigationInProgress && navigationTarget) {
			const targetBounds = navigationTarget.getBoundingClientRect();

			if (Math.abs(targetBounds.top) <= 8) {
				navigationInProgress = false;
				navigationTarget = null;
			}
		}

		if (openedFromContact && !navigationInProgress) {
			const rect = schoolSection.getBoundingClientRect();
			const completelyOutside = rect.bottom <= 0 || rect.top >= window.innerHeight;

			if (completelyOutside) {
				closeSchoolSection();
				navigationInProgress = false;
				navigationTarget = null;
			}
		}

		if (navigationInProgress || !schoolSection.classList.contains('is-open')) {
			return;
		}

		const bounds = schoolSection.getBoundingClientRect();
		const isOutsideViewport = bounds.bottom <= 0 || bounds.top >= window.innerHeight;

		if (isOutsideViewport) {
			closeSchoolSection();
		}
	}, { passive: true });

	const schoolObserver = new IntersectionObserver(([entry]) => {
		if (!openedFromContact && !navigationInProgress && schoolSection.classList.contains('is-open') && !entry.isIntersecting) {
			closeSchoolSection();
		}
	});

	schoolObserver.observe(schoolSection);
}

const enrolButton = document.querySelector('.enrol-button');
const preinscripcionSection = document.querySelector('#preinscripcion');
const preinscripcionForm = document.querySelector('#preinscripcion-form');
const preinscripcionVolver = document.querySelector('.preinscripcion__volver');

if (enrolButton && preinscripcionSection) {
	const bloqueCurso = preinscripcionSection.querySelector('#preinscripcion-curso');
	const datosCurso = bloqueCurso?.querySelector('.preinscripcion__curso-datos');
	const textoSinCurso = bloqueCurso?.querySelector('.preinscripcion__curso-vacio');

	function mostrarCursoSeleccionado(curso) {
		if (!datosCurso || !textoSinCurso) {
			return;
		}

		if (!curso) {
			datosCurso.hidden = true;
			textoSinCurso.hidden = false;
			return;
		}

		const campos = {
			etiqueta: curso.etiqueta,
			nombre: curso.nombre,
			fecha: curso.fecha,
			horario: curso.horario,
		};

		Object.entries(campos).forEach(([clave, valor]) => {
			const elemento = datosCurso.querySelector(`[data-curso="${clave}"]`);
			if (!elemento) {
				return;
			}

			const texto = String(valor || '').trim();
			elemento.textContent = texto;
			elemento.hidden = !texto;
		});

		textoSinCurso.hidden = true;
		datosCurso.hidden = false;
	}

	// Punto de entrada para que más adelante una tarjeta de curso abra su preinscripción.
	function abrirPreinscripcion(curso = null) {
		// El id viaja aparte del resumen: lo necesitará el envío a AulaControl.
		preinscripcionSection.dataset.cursoId = curso?.id != null ? String(curso.id) : '';

		mostrarCursoSeleccionado(curso);

		// La tarjeta fija el curso concreto, pero la persona siempre puede elegir el tipo.
		const selectorTipo = preinscripcionSection.querySelector('#preinscripcion-tipo');
		if (selectorTipo) {
			selectorTipo.hidden = false;
			if (curso) {
				const tipoInicial = curso.etiqueta?.trim().toUpperCase().startsWith('TOTAL') ? 'B' : 'A';
				selectorTipo
					.querySelectorAll('input[name="tipo"]')
					.forEach((opcion) => {
						opcion.checked = opcion.value === tipoInicial;
					});
			}
		}

		preinscripcionSection.hidden = false;

		// El scroll espera al siguiente frame: la sección acaba de dejar de estar oculta.
		window.requestAnimationFrame(() => {
			preinscripcionSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
		});
	}

	window.abrirPreinscripcion = abrirPreinscripcion;

	enrolButton.addEventListener('click', (event) => {
		event.preventDefault();
		abrirPreinscripcion();
	});

	if (preinscripcionVolver) {
		preinscripcionVolver.addEventListener('click', () => {
			preinscripcionSection.hidden = true;
			window.scrollTo({ top: 0, behavior: 'smooth' });
		});
	}

	if (preinscripcionForm) {
		const botonEnviar = preinscripcionForm.querySelector('.preinscripcion__enviar');
		const resultado = preinscripcionForm.querySelector('#preinscripcion-resultado');
		const consentimientoRgpd = preinscripcionForm.querySelector('#preinscripcion-rgpd-informado');
		const enlacePolitica = preinscripcionForm.querySelector('#preinscripcion-politica-link');
		const modalPolitica = document.querySelector('#preinscripcion-politica-modal');
		const botonCerrarModalPolitica = modalPolitica?.querySelector('[data-politica-cerrar]');
		const textoBotonOriginal = botonEnviar ? botonEnviar.textContent : '';
		let enviando = false;
		let focoAnteriorModal = null;

		const API_PREINSCRIPCIONES = (() => {
			const host = window.location.hostname;
			const esLocal = host === '' || host === 'localhost' || host === '127.0.0.1';
			const base = esLocal
				? 'http://localhost:8000'
				: 'https://aulacontrol.puntosnavarra.com';
			return `${base}/public/preinscripciones`;
		})();

		function mostrarResultado(texto, tipo) {
			if (!resultado) {
				return;
			}

			resultado.textContent = texto;
			resultado.classList.remove('preinscripcion__resultado--ok', 'preinscripcion__resultado--error');
			resultado.classList.add(`preinscripcion__resultado--${tipo}`);
			resultado.hidden = false;
		}

		function valorCampo(selector) {
			const campo = preinscripcionForm.querySelector(selector);
			const texto = campo ? campo.value.trim() : '';
			return texto || null;
		}

		function tipoDelCursoSeleccionado() {
			return preinscripcionForm.querySelector('input[name="tipo"]:checked')?.value || null;
		}

		function elementosEnModal() {
			if (!modalPolitica) {
				return [];
			}

			return Array.from(modalPolitica.querySelectorAll(
				'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
			)).filter((elemento) => !elemento.hasAttribute('hidden'));
		}

		function cerrarModalPolitica() {
			if (!modalPolitica || modalPolitica.hidden) {
				return;
			}

			modalPolitica.hidden = true;
			document.body.classList.remove('modal-abierto');

			if (focoAnteriorModal instanceof HTMLElement) {
				focoAnteriorModal.focus();
			} else {
				enlacePolitica?.focus();
			}
		}

		function alPulsarTeclaModal(event) {
			if (!modalPolitica || modalPolitica.hidden) {
				return;
			}

			if (event.key === 'Escape') {
				event.preventDefault();
				cerrarModalPolitica();
				return;
			}

			if (event.key !== 'Tab') {
				return;
			}

			const foco = elementosEnModal();
			if (!foco.length) {
				event.preventDefault();
				return;
			}

			const primero = foco[0];
			const ultimo = foco[foco.length - 1];
			const actual = document.activeElement;

			if (event.shiftKey && actual === primero) {
				event.preventDefault();
				ultimo.focus();
				return;
			}

			if (!event.shiftKey && actual === ultimo) {
				event.preventDefault();
				primero.focus();
			}
		}

		function abrirModalPolitica(event) {
			event.preventDefault();

			if (!modalPolitica) {
				return;
			}

			focoAnteriorModal = document.activeElement;
			modalPolitica.hidden = false;
			document.body.classList.add('modal-abierto');

			window.requestAnimationFrame(() => {
				const foco = botonCerrarModalPolitica || elementosEnModal()[0];
				foco?.focus();
			});
		}

		enlacePolitica?.addEventListener('click', abrirModalPolitica);
		botonCerrarModalPolitica?.addEventListener('click', cerrarModalPolitica);

		modalPolitica?.addEventListener('click', (event) => {
			if (event.target === modalPolitica) {
				cerrarModalPolitica();
			}
		});

		document.addEventListener('keydown', alPulsarTeclaModal);

		preinscripcionForm.addEventListener('submit', async (event) => {
			event.preventDefault();

			if (enviando) {
				return;
			}

			const tipo = tipoDelCursoSeleccionado();
			if (!tipo) {
				mostrarResultado('Indica qué necesitas antes de enviar la preinscripción.', 'error');
				return;
			}

			if (!consentimientoRgpd?.checked) {
				mostrarResultado('Debes leer la información sobre protección de datos antes de enviar la preinscripción.', 'error');
				consentimientoRgpd?.focus();
				return;
			}

			enviando = true;
			if (botonEnviar) {
				botonEnviar.disabled = true;
				botonEnviar.textContent = 'ENVIANDO...';
			}
			if (resultado) {
				resultado.hidden = true;
			}

			const cursoId = Number(preinscripcionSection.dataset.cursoId);
			const datos = {
				tipo,
				nombre: valorCampo('#preinscripcion-nombre'),
				apellidos: valorCampo('#preinscripcion-apellidos'),
				telefono: valorCampo('#preinscripcion-telefono'),
				observaciones: valorCampo('#preinscripcion-observaciones'),
				curso_id: Number.isInteger(cursoId) && cursoId > 0 ? cursoId : null,
				website: valorCampo('#preinscripcion-website'),
			};

			try {
				const respuesta = await fetch(API_PREINSCRIPCIONES, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(datos),
				});

				if (respuesta.status === 429) {
					mostrarResultado('Has realizado varios intentos seguidos. Espera unos minutos antes de volver a intentarlo.', 'error');
					return;
				}

				if (!respuesta.ok) {
					throw new Error('Respuesta no válida');
				}

				mostrarResultado('Preinscripción recibida. Nos pondremos en contacto contigo para confirmarla.', 'ok');

				// Se limpian solo los datos personales: el curso elegido sigue a la vista.
				preinscripcionForm
					.querySelectorAll('input:not([name="website"]):not([type="radio"]), textarea')
					.forEach((campo) => {
						campo.value = '';
					});
			} catch {
				mostrarResultado('No se ha podido enviar la preinscripción. Inténtalo de nuevo.', 'error');
			} finally {
				enviando = false;
				if (botonEnviar) {
					botonEnviar.disabled = false;
					botonEnviar.textContent = textoBotonOriginal;
				}
			}
		});
	}
}

const listaCursos = document.querySelector('#course-list');
const mensajeCursos = document.querySelector('#course-list-mensaje');

if (listaCursos && mensajeCursos) {
	const MESES_CURSO = [
		'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
		'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE',
	];

	const API_CURSOS = (() => {
		const host = window.location.hostname;
		const esLocal = host === '' || host === 'localhost' || host === '127.0.0.1';
		const base = esLocal
			? 'http://localhost:8000'
			: 'https://aulacontrol.puntosnavarra.com';
		return `${base}/public/cursos-proximos`;
	})();
	const API_CURSOS_PROGRAMADOS = API_CURSOS.replace(
		'/public/cursos-proximos',
		'/public/cursos-programados',
	);

	function partesFecha(iso) {
		const partes = String(iso || '').split('-');
		return partes.length === 3 ? partes : null;
	}

	function fechaEspanola(iso) {
		const partes = partesFecha(iso);
		return partes ? `${partes[2]}/${partes[1]}/${partes[0]}` : '';
	}

	function mostrarMensajeCursos(texto) {
		listaCursos.replaceChildren();
		mensajeCursos.textContent = texto;
		mensajeCursos.hidden = false;
	}

	function mostrarCursosMenu(cursos, mensaje = '') {
		if (!menuCoursesList || !menuCoursesStatus) {
			return;
		}

		const filas = cursos.map(curso => {
			const fecha = fechaEspanola(curso.fecha_inicio);

			if (!curso.modalidad || !fecha) {
				return null;
			}

			const fila = document.createElement('li');
			fila.className = 'menu-courses__item';
			fila.textContent = `${curso.modalidad} — ${fecha}`;
			return fila;
		}).filter(Boolean);

		menuCoursesList.replaceChildren(...filas);
		menuCoursesStatus.textContent = mensaje || (filas.length ? '' : 'No hay próximos cursos.');
		menuCoursesStatus.hidden = !menuCoursesStatus.textContent;
	}

	function crearTarjetaCurso(curso) {
		const partes = partesFecha(curso.fecha_inicio);
		if (!partes) {
			return null;
		}

		const tarjeta = document.createElement('article');
		tarjeta.className = 'course-card course-card--seleccionable';
		tarjeta.setAttribute('role', 'button');
		tarjeta.setAttribute('tabindex', '0');

		const etiqueta = curso.modalidad || '';

		if (etiqueta === 'TOTAL') {
			tarjeta.classList.add('course-card--total');
		}

		if (etiqueta) {
			const tipo = document.createElement('span');
			tipo.className = 'course-card__type';
			tipo.textContent = etiqueta;
			tarjeta.appendChild(tipo);
		}

		const cuerpo = document.createElement('div');
		cuerpo.className = 'course-card__body';

		const bloqueFecha = document.createElement('div');
		bloqueFecha.className = 'course-card__date';
		bloqueFecha.innerHTML = '<span class="course-card__calendar" aria-hidden="true">▦</span>';

		const dia = document.createElement('strong');
		dia.textContent = String(Number(partes[2]));
		bloqueFecha.appendChild(dia);

		const mes = document.createElement('span');
		mes.textContent = MESES_CURSO[Number(partes[1]) - 1] || '';
		bloqueFecha.appendChild(mes);

		const detalles = document.createElement('div');
		detalles.className = 'course-card__details';

		const recuperacion = etiqueta === 'TOTAL' ? 'PERMISO' : 'PUNTOS';
		const titulo = document.createElement('p');
		titulo.innerHTML = `Recuperación de <strong>${recuperacion}</strong>`;
		detalles.appendChild(titulo);

		// Solo los cursos de varios días necesitan indicar el rango.
		const rango = curso.fecha_fin && curso.fecha_fin !== curso.fecha_inicio
			? `Inicio: ${fechaEspanola(curso.fecha_inicio)} · Fin: ${fechaEspanola(curso.fecha_fin)}`
			: '';

		if (rango) {
			const fechas = document.createElement('span');
			fechas.textContent = rango;
			detalles.appendChild(fechas);
		}

		cuerpo.appendChild(bloqueFecha);
		cuerpo.appendChild(detalles);
		tarjeta.appendChild(cuerpo);

		const resumen = {
			id: curso.id,
			etiqueta,
			nombre: `Recuperación de ${recuperacion}`,
			fecha: `${dia.textContent} ${mes.textContent} ${partes[0]}`,
			horario: rango,
		};

		const abrir = () => {
			if (typeof window.abrirPreinscripcion === 'function') {
				window.abrirPreinscripcion(resumen);
			}
		};

		tarjeta.addEventListener('click', abrir);
		tarjeta.addEventListener('keydown', (event) => {
			if (event.key === 'Enter' || event.key === ' ') {
				event.preventDefault();
				abrir();
			}
		});

		return tarjeta;
	}

	function pintarCursos(cursos) {
		const tarjetas = cursos.map(crearTarjetaCurso).filter(Boolean);

		if (!tarjetas.length) {
			mostrarMensajeCursos('No hay próximas convocatorias publicadas en este momento.');
			return;
		}

		mensajeCursos.hidden = true;
		listaCursos.replaceChildren(...tarjetas);
	}

	const ESPERAS_REINTENTO_CURSOS_MS = [1000, 2000];

	function esperar(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	async function cargarCursos(intento = 0) {
		try {
			const respuesta = await fetch(API_CURSOS);
			if (!respuesta.ok) {
				throw new Error('Respuesta no válida');
			}

			const cursos = await respuesta.json();
			const cursosProximos = Array.isArray(cursos) ? cursos : [];
			pintarCursos(cursosProximos);
		} catch {
			if (intento < ESPERAS_REINTENTO_CURSOS_MS.length) {
				await esperar(ESPERAS_REINTENTO_CURSOS_MS[intento]);
				await cargarCursos(intento + 1);
				return;
			}

			mostrarMensajeCursos('No se han podido cargar los próximos cursos. Inténtalo de nuevo más tarde.');
		}
	}

	async function cargarCursosMenu() {
		try {
			const respuesta = await fetch(API_CURSOS_PROGRAMADOS);
			if (!respuesta.ok) {
				throw new Error('Respuesta no válida');
			}

			const cursos = await respuesta.json();
			mostrarCursosMenu(Array.isArray(cursos) ? cursos : []);
		} catch {
			mostrarCursosMenu([], 'No se han podido cargar los cursos.');
		}
	}

	window.pintarCursosProximos = pintarCursos;

	cargarCursos();
	cargarCursosMenu();
}
