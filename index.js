"use strict"

function iniciar(){
  const margem = {
    esquerda: 20,
    direita: 20,
    superior: 20,
    infererio: 20
  }
  
  let dados = [100, 250, 150, 100, 80];
  const largura = 600;
  const altura = 400;
  const min = d3.min(dados)
  const max = d3.max(dados)
  const faix = d3.extent(dados) // retorna um vetor minimo e maximo.
  let svg = d3.select('#grafico');
  svg.attr('width', largura).attr('height', altura);
 
 
  const plotagem = svg.append('g')
                      .attr('transform', `translate(${margem.esquerda}, ${margem.superior})`);
  
  const larguraPlotagem = (largura - margem.esquerda -margem.direita); 
  const alturaPlotagem = (altura - margem.superior - margem.infererio);
  const x = d3.scaleLinear().domain([0,dados.length]).range([0, larguraPlotagem]);
  const y = d3.scaleLinear().domain([0, max]).range([alturaPlotagem, 0]);

    plotagem.selectAll('.barra')
    .data(dados)
    .enter() //trata elementos a mais
      .append('rect')
      .classed('barra', true)
      .attr('x',(d, i) => x(i))
      .attr('y',  d=> y(d))
      .attr('width', x(1)*0.9)
      .attr('height', d => altura - y(d))

    plotagem.selectAll('.rotulo')
    .data(dados)
    .enter() //trata elementos a mais
      .append('text')
      .classed('rotulo', true)
      .text(d => d)
      .attr('x', (d, i) => x(i))
      .attr('y', d => y(d))
      .attr('dx', d => x(1)*.9*0.5)
      .attr('dy', -5)
  //divs.exit() //trata os elementos a menos.
  //   .remove()
}

window.addEventListener('load', iniciar, false);


