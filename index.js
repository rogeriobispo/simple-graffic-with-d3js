"use strict"

function iniciar(){
  const margem = {
    esquerda: 20,
    direita: 20,
    superior: 20,
    infererio: 20
  }
  
  let dados = [
    { nome: 'Frango', quantidade: 56 },
    { nome: 'Carne', quantidade: 73 },
    { nome: 'Vegetariano', quantidade: 20 },
    { nome: 'Queijo', quantidade: 115 },
    { nome: 'Goibada', quantidade: 44 },
    { nome: 'Banana', quantidade: 60 },
    { nome: 'Calabresa', quantidade: 33 }
  ];
  const largura = 600;
  const altura = 400;
  const min = d3.min(dados.map(d => d.quantidade)); //retorna menor valor
  const max = d3.max(dados.map(d => d.quantidade)); //
  const faixa = d3.extent(dados); // retorna um vetor minimo e maximo.
  let svg = d3.select('#grafico');
  svg.attr('width', largura).attr('height', altura);
 
 
  const plotagem = svg.append('g')
                      .attr('transform', `translate(${margem.esquerda}, ${margem.superior})`);
  
  const larguraPlotagem = (largura - margem.esquerda -margem.direita); 
  const alturaPlotagem = (altura - margem.superior - margem.infererio);
  const x = d3.scaleBand()
              .domain(dados.map(d => d.nome) )
              .range([0, larguraPlotagem])
              .padding(0.1);
  const y = d3.scaleLinear()
              .domain([0, d3.max(dados.map(d => d.quantidade))])
              .range([alturaPlotagem, 0]);
  const cores = d3.scaleLinear()
                  .domain([0, dados.length])
                  .range(['#005a32', '#edf8e9'])

    plotagem.selectAll('.barra')
    .data(dados)
    .enter() //trata elementos a mais
      .append('rect')
      .classed('barra', true)
      .attr('x',d => x(d.nome))
      .attr('y',  d=> y(d.quantidade))
      .attr('width', x.bandwidth())
      .attr('height', d => altura - y(d.quantidade))
      .attr('fill', (d,i) => cores(i));

    plotagem.selectAll('.rotulo')
    .data(dados)
    .enter() //trata elementos a mais
      .append('text')
      .classed('rotulo', true)
      .text(d => d.quantidade)
      .attr('x', d => x(d.nome))
      .attr('y', d => y(d.quantidade))
      .attr('dx', d => x.bandwidth()*0.5)
      .attr('dy', -5)

  //divs.exit() //trata os elementos a menos.
  //   .remove()
}

window.addEventListener('load', iniciar, false);


