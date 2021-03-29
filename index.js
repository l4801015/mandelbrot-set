import { 
  add, 
  multiply, 
  complex 
} from 'mathjs'

const mandelbrot = (n, c) => {
	if(n == 0) return complex (0, 0);
	return add(multiply(mandelbrot(n - 1, c), mandelbrot(n - 1, c)), c);
}

const set = (n, c) => {
	if(n == 0) return mandelbrot(n, c);
	return ([mandelbrot(n, c)].concat(
		set(n - 1, c))
		);
}

console.log(
  set(10, complex(-0.2, -0.2))
)
