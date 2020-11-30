import Emitter from 'tiny-emitter';
import { getIten } from './itens';

// Locale meuLocal = new Locale( "pt", "BR" );

class MyCar extends Emitter {
  constructor() {
    super();
    this.itens = new Array();
  }

  getItens() {
    return this.itens;
  }

  find(uuid) {
    return this.itens.findIndex((i) => i.iten === uuid);
  }

  removeIten(uuid) {
    const ii = this.find(uuid);
    if (ii > -1) {
      this.itens[ii].quant -= this.itens[ii].quant > 0 ? 1 : 0;
    } else {
      this.itens.push({
        iten: uuid,
        quant: 1,
      });
    }
    this.emit('update');
  }

  getIten(uuid) {

  }

  getTotal() {
    function currencyFormat(num) {
       return '' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    let total = 0;
    this.itens.forEach((item, i) => {
      const { price, quant } = item;
      total += (price*quant);
    });
    return currencyFormat(total);
  }

  clear() {
    this.itens = this.itens.filter((iten) => {
      return iten.quant > 0;
    });
    this.emit('update');
  }

  addIten(uuid) {
    return new Promise((resolve, reject) => {
      try {
        this.getDataIten(uuid)
        .then((dd) => {
          const maxQuant = dd.quant;
          const ii = this.find(uuid);
          if (ii > -1) {
            this.itens[ii].price = dd.price;
            this.itens[ii].quant = this.itens[ii].quant >= maxQuant ? maxQuant : this.itens[ii].quant + 1;
            resolve();
          } else {
            if (maxQuant > 0) {
              this.itens.push({
                price: dd.price,
                iten: uuid,
                quant: 1,
              });
              resolve();
            } else reject('Iten não esta mais disponivel');
          }
          this.emit('update');
        })
      } catch (e) {
        reject(e.menssage);
      }
    });
  }

  length() {
    return this.itens.length;
  }

  getDataIten(uuid) {
    return getIten(uuid);
  }

  getQuant(uuid) {
    const ii = this.find(uuid);
    if (ii > -1) {
      return this.itens[ii].quant;
    }
    return 0;
  }
}

const car = new MyCar();

export default car;
