import * as d3 from 'd3';

let transition,
    end;

function progressViz(className) {
  let selector = `.${className}`;
  let height = 325,
      width = 325,
      twoPi = (2 * Math.PI),
      progress = 0,
      formatPercent = d3.format('.0%');

  let arc = d3.svg.arc()
    .startAngle(0)
    .innerRadius(100)
    .outerRadius(160);

  let svg = d3.select(selector).append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'spinner')
    .append('g')
      .attr('transform', `translate(${(width / 2)}, ${(height / 2)})`);

  let meter = svg.append('g')
    .attr('class', 'progress-meter');

  meter.append('path')
    .attr('class', 'background')
    .attr('d', arc.endAngle(twoPi));

  let foreground = meter.append('path')
    .attr('class', 'foreground');

  let text = meter.append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '.35em');

  function doTransition(message) {
    let i = d3.interpolate(progress, (message.loaded / message.total));
    d3.transition().tween('relayedProgress', () => {

      return (t) => {
        progress = i(t);
        foreground.attr('d', arc.endAngle(twoPi * progress));
        text.text(formatPercent(progress));
      };
    });
  }

  function endTransition(delay) {
    meter.transition().delay(delay).attr("transform", "scale(0)");
  }

  transition = doTransition;
  end = endTransition;
}


export {progressViz, transition, end};
