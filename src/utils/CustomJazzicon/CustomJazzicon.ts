import MersenneTwister from 'mersenne-twister';
import { hueShift } from './colors';
import { COLORS, SHAPE_COUNT, SVG_NS } from './constants';

let generator: MersenneTwister;

export default function customJazzicon (
  diameter: number,
  seed: number | number[] | undefined
)
{
  generator = new MersenneTwister(seed);

  const remainingColors = hueShift(COLORS.slice(), generator);

  const container = genPaper(diameter, genColor(remainingColors));

  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttributeNS(null, 'x', '0');
  svg.setAttributeNS(null, 'y', '0');
  svg.setAttributeNS(null, 'width', String(diameter));
  svg.setAttributeNS(null, 'height', String(diameter));

  container.appendChild(svg);

  for (let i = 0; i < SHAPE_COUNT - 1; i++)
  {
    genShape(remainingColors, diameter, i, SHAPE_COUNT - 1, svg);
  }

  return container;
}

function genShape (
  remainingColors: string[],
  diameter: number,
  i: number,
  total: number,
  svg: Element
)
{
  const center = diameter / 2;

  const shape = document.createElementNS(SVG_NS, 'rect');
  shape.setAttributeNS(null, 'x', '0');
  shape.setAttributeNS(null, 'y', '0');
  shape.setAttributeNS(null, 'width', String(diameter));
  shape.setAttributeNS(null, 'height', String(diameter));

  const firstRot = generator.random();

  const angle = Math.PI * 2 * firstRot;

  const velocity =
    (diameter / total) * generator.random() + (i * diameter) / total;

  const tx = Math.cos(angle) * velocity;
  const ty = Math.sin(angle) * velocity;

  const translate = `translate(${tx} ${ty})`;

  // Third random is a shape rotation on top of all of that.
  const secondRot = generator.random();

  const rot = firstRot * 360 + secondRot * 180;

  const rotate = `rotate(${rot.toFixed(1)} ${center} ${center})`;

  const transform = translate + ' ' + rotate;

  if (i !== total - 1)
  {
    shape.setAttributeNS(null, 'transform', transform);
  }

  const fill = genColor(remainingColors);

  shape.setAttributeNS(null, 'fill', fill);

  if (i !== total - 1)
  {
    svg.appendChild(shape);
  }
  else
  {
    svg.insertBefore(shape, svg.firstChild);
  }
}

function genColor (colors: string[])
{
  generator.random();

  const idx = Math.floor(colors.length * generator.random());

  const color = colors.splice(idx, 1)[0];

  return color;
}

function genPaper (diameter: number, color: string)
{
  const container = document.createElement('div');

  container.style.borderRadius = '9999px';
  container.style.overflow = 'hidden';
  container.style.padding = '0px';
  container.style.margin = '0px';
  container.style.width = `${diameter}px`;
  container.style.height = `${diameter}px`;
  container.style.display = 'inline-block';
  container.style.background = color;

  return container;
}
