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

const re = (n, m, d) => delta(n * d, m * d, d);

const im = (n, m, d) => delta(n * d, m * d, d);

const delta = (n, m, d) => {
	if(n == m) return m/d;
	return [n/d].concat(delta(n + 1, m, d));
};

const imL = (imP, re) => {
	if(re.length == 0) return [];
	return [[imP, re[0]]].concat(imL(imP, re.slice(1)));
};

const reL = (reP, im) => {
	if(im.length == 0) return [];
	return [[reP, im[0]]].concat(reL(reP, im.slice(1)));
};

const pForIm = (im, re) => {
	if(im.length == 0) return [];
	return [imL(im[0], re)].concat(pForIm(im.slice(1), re));
};

const plane = (re, im) => {
	if(re.length == 0) return [];
	return [reL(re[0], im)].concat(
		plane(re.slice(1), im)
		);
};

const ms = plane => {
	return set(1, complex(
plane[0][0][0],
plane[0][0][1]
)
);
}

console.log(
ms(
		plane(
		  re(-3.1, 3.1, 10),
		  im(-2.1, 2.1, 10)
		)
),
		
);
