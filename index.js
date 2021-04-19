const complex = (r, i) => {
  return { re: r, im: i };
};

const add = (c1, c2) => {
  return {
    re: c1.re + c2.re,
    im: c1.im + c2.im
  }
};

const multiply = (c1, c2) => {
  return {
    re: (c1.re * c2.re) - (c1.im * c2.im),
    im: (c1.im * c2.re) + (c1.re * c2.im)
  }
};

const square = c => {
  return {
    re: (c.re * c.re) - (c.im * c.im),
    im: (c.im * c.re) + (c.re * c.im)
  }
};

const mandelbrotEquation = (n, c) => n === 0 ? complex(0,0) : add(square(mandelbrotEquation(n - 1, c)), c);

const deltaForScaling = (naturalSegment, integerSegment) => {
	if(integerSegment[0] < 0) return (-1 * integerSegment[0] + integerSegment[1]) / naturalSegment;
};

const scaleNaturalCoordinate = (naturalCoordinate,  axisProps) => {
	return [naturalCoordinate, axisProps.integerSegment[0] + axisProps.deltaForScaling * naturalCoordinate];
};

const axisProperties =  delta => (naturalSegment, integerSegment) => {
	const deltaForScaling = delta(naturalSegment, integerSegment);
	return {
		naturalSegment: naturalSegment,
		integerSegment: integerSegment,
		deltaForScaling: deltaForScaling
	}
};

const scaledCoordinate = (planeProps, scaleNaturalCoordinate) => (x,y) => {
	const scaledXCoordinate = scaleNaturalCoordinate(x, planeProps.xAxisProps);
	const scaledYCoordinate = scaleNaturalCoordinate(y, planeProps.yAxisProps);
	return {
		natural: {
			x: scaledXCoordinate[0],
			y: scaledYCoordinate[0]
		},
		complex: {
			re: scaledXCoordinate[1],
			im: scaledYCoordinate[1],
		}
	}
}

const planeProps = (xAxisProps, yAxisProps) => {
  return {
		 xAxisProps: {
		 	naturalSegment: xAxisProps.naturalSegment,
		integerSegment: xAxisProps.integerSegment,
		deltaForScaling: xAxisProps.deltaForScaling
		 },
	  	yAxisProps: {
	  		naturalSegment: yAxisProps.naturalSegment,
		integerSegment: yAxisProps.integerSegment,
		deltaForScaling: yAxisProps.deltaForScaling
	  	}
	};
};

const mandelbrotMember = (coord, mand) => (n, x, y) => {
	const coordinate = coord(x,y);
	const mandelbrot = mand(n, coordinate.complex);
	return {
		coordinate,
		mandelbrot
	}
}

//-----------------------

const xAxisProps = axisProperties(deltaForScaling);

const yAxisProps = axisProperties(deltaForScaling);

const naturalPlaneProps = planeProps(
	xAxisProps(10, [-2.5,1]),
	yAxisProps(10, [-1,1])
	);

const coordinate = scaledCoordinate(naturalPlaneProps, scaleNaturalCoordinate);

const member = mandelbrotMember(coordinate, mandelbrotEquation);

const iterate = (member) => (g, n, m) => {
	if(m === 1) return [member(g,n,m)];
	return [member(g,n,m)].concat(
		iterate(member)(g,n,m - 1)
		);
};

const iterateXAxis = iterate(member);

const grid = (iterateXAxis) => (g, width, height) => {
	if(height === 1) return [iterateXAxis(g, height, width)];
	return [iterateXAxis(g, height, width)].concat(
		grid(iterateXAxis)(g, width, height - 1)
		);
};

const plane = grid(iterateXAxis);

const g = 11;
const width = 10;
const height = 10;

const t1 = new Date();
//plane(g, height,width);
const t2 = new Date();

console.log(
	//t1,
	//t2,
	//(t2 - t1)/1000
	plane(g, height,width)
)
