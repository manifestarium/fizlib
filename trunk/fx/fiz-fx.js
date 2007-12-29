var tween = {
	// setInterval ref of running animation
	running: null,

	// Iterator for running animation
	frame: 0,

	/**
	 * Tween a value over a set number of frames
	 * 
	 * @param	obj			object containing target property
	 * @param	prop		property to tween
	 * @param	ease		easing formula
	 * @param	begin		start of the tween
	 * @param	end			end of the tween
	 * @param	frames		number of frames
	 * @param	callback	function to call on completion
	 * @return	null
	 */
	play: function(obj, prop, ease, begin, end, frames, callback){
		// Make sure frames are reset
		tween.frame = 0;

		// Create a closure for setInterval
		var temp = function(){
			// Use tween formula to affect the prop
			obj[prop] = Math.ceil(ease(tween.frame++, begin, end, frames)) + "px";

			// Check for end of animation
			if(tween.frame > frames){
				// Stop the animation
				clearTimeout(tween.running);
				
				// Execute callback
				if(callback) callback();
			}
		}

		// play the animation
		this.running = setInterval(temp,15);
	},

	formulae: {
		/**
		 * TERMS OF USE - EASING EQUATIONS
		 * Open source under the BSD License.
		 * Copyright 2001 Robert Penner All rights reserved.
		 *
		 * Redistribution and use in source and binary forms, with or without 
		 * modification, are permitted provided that the following conditions 
		 * are met:
		 *
		 * Redistributions of source code must retain the above copyright notice, 
		 * this list of conditions and the following disclaimer.
		 *
		 * Redistributions in binary form must reproduce the above copyright 
		 * notice, this list of conditions and the following disclaimer in the 
		 * documentation and/or other materials provided with the distribution.
		 *
		 * Neither the name of the author nor the names of contributors may be 
		 * used to endorse or promote products derived from this software without 
		 * specific prior written permission.
		 *
		 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 
		 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT 
		 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR 
		 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT 
		 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, 
		 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT 
		 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, 
		 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY 
		 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT 
		 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE 
		 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
		 */
		easeOut: {
			// Quadratic
			quad: function(t, b, c, d){
				return -c * (t/=d)*(t-2) + b;
			},

			// Cubic
			cubic: function(t, b, c, d){
				return c * (Math.pow(t/d-1, 3) + 1) + b; 
			},
			
			// Quartic
			quart: function(t, b, c, d){
				return -c * (Math.pow(t/d-1, 4) - 1) + b; 
			},
			
			// Ease out quintic
			quint: function(t, b, c, d){
				return c * (Math.pow(t/d-1, 5) + 1) + b; 
			},
			
			// Ease out sinusoidal
			sine: function(t, b, c, d){
				return c * Math.sin(t/d * (Math.PI/2)) + b; 
			},
			
			// Ease out exponential
			expo: function(t, b, c, d){
				return c * (-Math.pow(2, -10 * t/d) + 1) + b; 
			},
			
			// Ease out circular
			circ: function(t, b, c, d){
				return c * Math.sqrt(1 - (t=t/d-1)*t) + b; 
			}
		},
		
		easeIn: {
			// Ease in quadratic
			quad: function(t, b, c, d){
				return c*(t/=d)*t + b; 
			},
	
			// Ease in cubic
			cubic: function(t, b, c, d){
				return c * Math.pow(t/d, 3) + b;
			},
			
			// Ease in quartic
			quart: function(t, b, c, d){
				return c * Math.pow(t/d, 4) + b; 
			},
					
			// Ease in quintic
			quint: function(t, b, c, d){
				return c * Math.pow(t/d, 5) + b; 
			},
			
			// Ease in sinusoidal
			sine: function(t, b, c, d){
				return c * (1 - Math.cos(t/d * (Math.PI/2))) + b; 
			},
			
			// Ease in exponential
			expo: function(t, b, c, d){
				return c * Math.pow(2, 10 * (t/d - 1)) + b; 
			},
			
			// Ease in circular
			circ: function(t, b, c, d){
				return c * (1 - Math.sqrt(1 - (t/=d)*t)) + b; 
			}
		},

		easeInOut: {
			// Ease in and out quadratic
			quad: function(t, b, c, d){
				if ((t/=d/2) < 1) return c/2*t*t + b;
				return -c/2 * ((--t)*(t-2) - 1) + b;
			},

			// Ease in and out cubic
			cubic: function(t, b, c, d){
				if ((t/=d/2) < 1) return c/2 * Math.pow(t, 3) + b;
				return c/2 * (Math.pow(t-2, 3) + 2) + b; 
			},

			// Ease in and out quartic
			quart: function(t, b, c, d){
				if ((t/=d/2) < 1) return c/2 * Math.pow (t, 4) + b; 
				return -c/2 * (Math.pow(t-2, 4) - 2) + b; 
			},

			// Ease in and out quintic
			quint: function(t, b, c, d){
				if ((t/=d/2) < 1) return c/2 * Math.pow (t, 5) + b; 
				return c/2 * (Math.pow(t-2, 5) + 2) + b; 
			},

			// Ease in and out sinusoidal
			sine: function(t, b, c, d){
				return c/2 * (1 - Math.cos(Math.PI*t/d)) + b; 
			},

			// Ease in and out exponential
			expo: function(t, b, c, d){
				if((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b; 
				return c/2 * (-Math.pow(2, -10 * --t) + 2) + b; 
			},

			// Ease in and out circular
			circ: function(t, b, c, d){
				if ((t/=d/2) < 1) return c/2 * (1 - Math.sqrt(1 - t*t)) + b; 
				return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b; 
			}
		}
	}
}