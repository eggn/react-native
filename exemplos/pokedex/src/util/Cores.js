export const CORES = {
    marron400 : '#8d6e63',
    marron: '#a52a2a',
    vermelho: '#FF0000',
    azul: '#0000ff',
    azulIndigo200: '#9fa8da',
    azulIndigo400: '#5c6bc0',
    azulIndigo800: '#283593',
    azulCianoAccent400: '#00D8FF',
    verde: '#008000',
    verderClaro500: '#8bc34a',
    amareloAmber: '#ffbf00',
    laranja: '#ffa500',
    laranja300: '#ffb74d',
    lilas: '#800080',
    rosa : '#ff80cb',
    rosaAccent100: '#ff80ab',
    cinza: '#808080',
    cinzaAzulado: '#607d8b'
}

export function getCor(type) {
    switch (type) {
      case 'Normal':
        return CORES.marron400;
        break;
      case 'Fire':
        return CORES.vermelho;
        break;
      case 'Water':
        return CORES.azul;
        break;
      case 'Grass':
        return CORES.verde;
        break;
      case 'Electric':
        return CORES.amareloAmber;
        break;
      case 'Ice':
        return CORES.azulCianoAccent400;
        break;
      case 'Fighting':
        return CORES.laranja;
        break;
      case 'Poison':
        return CORES.lilas;
        break;
      case 'Ground':
        return CORES.laranja300;
        break;
      case 'Flying':
        return CORES.azulIndigo200;
        break;
      case 'Psychic':
        return CORES.rosa;
        break;
      case 'Bug':
        return CORES.verderClaro500;
        break;
      case 'Rock':
        return CORES.cinza;
        break;
      case 'Ghost':
        return CORES.azulIndigo400;
        break;
      case 'Dark':
        return CORES.marron;
        break;
      case 'Dragon':
        return CORES.azulIndigo800;
        break;
      case 'Steel':
        return CORES.cinzaAzulado;
        break;
      case 'Fairy':
        return CORES.rosaAccent100;
        break;
      default:
        return CORES.cinza;
        break;
    }
  }

  export function hexToRgba(color, opacity) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    return result ? 
    `rgba(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)},${opacity})`      
     : null;
  }


