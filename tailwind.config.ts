import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				
				// Temporal Color System
				temporal: {
					deep: 'hsl(var(--temporal-deep))',
					flow: 'hsl(var(--temporal-flow))',
					calm: 'hsl(var(--temporal-calm))',
					active: 'hsl(var(--temporal-active))',
					resonance: 'hsl(var(--temporal-resonance))'
				},
				biometric: {
					heart: 'hsl(var(--heart-rhythm))',
					breath: 'hsl(var(--breath-flow))',
					movement: 'hsl(var(--movement-pulse))',
					attention: 'hsl(var(--attention-glow))'
				},
				memory: {
					fade: 'hsl(var(--memory-fade))',
					glow: 'hsl(var(--memory-glow))'
				},
				experience: {
					deep: 'hsl(var(--experience-deep))',
					light: 'hsl(var(--experience-light))'
				},
				
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			backgroundImage: {
				'temporal-gradient': 'var(--gradient-temporal)',
				'biometric-gradient': 'var(--gradient-biometric)',
				'memory-gradient': 'var(--gradient-memory)',
				'ambient-gradient': 'var(--gradient-ambient)'
			},
			boxShadow: {
				'temporal': 'var(--shadow-temporal)',
				'biometric': 'var(--shadow-biometric)',
				'resonance': 'var(--shadow-resonance)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'temporal-breathe': {
					'0%, 100%': {
						transform: 'scale(1) rotate(0deg)',
						opacity: '0.7'
					},
					'50%': {
						transform: 'scale(1.05) rotate(0.5deg)',
						opacity: '1'
					}
				},
				'biometric-pulse': {
					'0%, 100%': {
						transform: 'scale(1)',
						filter: 'brightness(1)'
					},
					'50%': {
						transform: 'scale(1.02)',
						filter: 'brightness(1.2)'
					}
				},
				'temporal-flow': {
					'0%': {
						transform: 'translateX(-100%) rotate(0deg)'
					},
					'100%': {
						transform: 'translateX(100vw) rotate(360deg)'
					}
				},
				'moment-fade': {
					'0%': {
						opacity: '1',
						transform: 'scale(1)'
					},
					'100%': {
						opacity: '0.3',
						transform: 'scale(0.95)'
					}
				},
				'experience-enhance': {
					'0%': {
						opacity: '0.7',
						transform: 'scale(0.98)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1.02)'
					}
				},
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'temporal-breathe': 'temporal-breathe 4s ease-in-out infinite',
				'biometric-pulse': 'biometric-pulse 2s ease-in-out infinite',
				'temporal-flow': 'temporal-flow 8s linear infinite',
				'moment-fade': 'moment-fade 1s ease-out forwards',
				'experience-enhance': 'experience-enhance 1s ease-out forwards',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
