const linksData = {
	socials: {
		npmjs: 'https://www.npmjs.com/~bluzed',
		Github: 'https://github.com/bluzed',
		YouTube: 'https://youtube.com/bluzed',
		//'Discord Server': '',  //--Coming soon--
		'Discord (BluZed#0001)': 'https://discord.com/users/747484654524694608'
	}
}

window.onload = () => {
	document.getElementById('loader').remove()
}

window.addEventListener('DOMContentLoaded', () => {
	const generateSocialItemHTML = (title, url) => {
		document.getElementById('socials').insertAdjacentHTML('afterend', `<p><strong>${title}</strong> - <a href="${url}">${url}</a>`)
	}
	const generateSocialList = () => {
		const titles = Object.keys(linksData.socials)
		const links = Object.values(linksData.socials)

		for (const title of titles) {
			generateSocialItemHTML(title, links[titles.indexOf(title)])
		}
	}
	generateSocialList()


	// Particles JS part 
	particlesJS("particles-js", {
		particles: {
			number: {
				value: 250,
				density: {
					enable: true,
					value_area: 800
				}
			},
			color: {
				value: "#ffffff"
			},
			shape: {
				type: "circle",
				stroke: {
					width: 0,
					color: "#000000"
				},
				polygon: {
					nb_sides: 5
				},
				image: {
					src: "img/github.svg",
					width: 100,
					height: 100
				}
			},
			opacity: {
				value: 1,
				random: true,
				anim: {
					enable: true,
					speed: 1,
					opacity_min: 0,
					sync: false
				}
			},
			size: {
				value: 3,
				random: true,
				anim: {
					enable: false,
					speed: 4,
					size_min: 0.3,
					sync: false
				}
			},
			line_linked: {
				enable: false,
				distance: 150,
				color: "#ffffff",
				opacity: 0.4,
				width: 1
			},
			move: {
				enable: true,
				speed: 1,
				direction: "none",
				random: true,
				straight: false,
				out_mode: "out",
				bounce: false,
				attract: {
					enable: false,
					rotateX: 600,
					rotateY: 600
				}
			}
		},
		interactivity: {
			detect_on: "window",
			events: {
				onhover: {
					enable: true,
					mode: "bubble"
				},
				onclick: {
					enable: true,
					mode: "repulse"
				},
				resize: true
			},
			modes: {
				bubble: {
					distance: 250,
					size: 0,
					duration: 2,
					opacity: 0,
					speed: 3
				},
				repulse: {
					distance: 250,
					duration: 0.5
				},
			}
		},
		retina_detect: true
	})
})