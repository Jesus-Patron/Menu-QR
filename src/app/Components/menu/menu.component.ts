import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  comidas = [
    {
      categoria: 'Desayunos',
      alimentos: [
        {
          nombre: 'Huevos al gusto',
          precio: 150,
          imagen: 'assets/Imagenes/huevos al gusto.jpg'
        },
        {
          nombre: 'Omelette',
          precio: 150,
          imagen: 'assets/Imagenes/omelette.jpg'
        },
        {
          nombre: 'Huevos divorciados',
          precio: 130,
          imagen: 'assets/Imagenes/huevos divorciados.jpg'
        },
        {
          nombre: 'Huevos rancheros',
          precio: 135,
          imagen: 'assets/Imagenes/huevos rancheros.jpg'
        },
        {
          nombre: 'Huevos Michoacan',
          precio: 185,
          imagen: 'assets/Imagenes/huevos michoacan.jpg'
        },
        {
          nombre: 'Huevos benedictinos',
          precio: 220,
          imagen: 'assets/Imagenes/huevos benedictinos.jpg'
        },
        {
          nombre: 'Huevos motuleños',
          precio: 155,
          imagen: 'assets/Imagenes/huevos motuleños.jpg'
        },
        {
          nombre: 'Chilaquiles',
          precio: 135,
          imagen: 'assets/Imagenes/chilaquiles.jpg'
        },
        {
          nombre: 'Avena',
          precio: 110,
          imagen: 'assets/Imagenes/avena.jpg'
        },
        {
          nombre: 'Continental',
          precio: 120,
          imagen: 'assets/Imagenes/continental.jpg'
        },
        {
          nombre: 'Fruta con yogurth y granola',
          precio: 120,
          imagen: 'assets/Imagenes/fruta con yogurth y granola.jpeg'
        },
        {
          nombre: 'Fruta de temporada',
          precio: 85,
          imagen: 'assets/Imagenes/fruta de temporada.jpg'
        }
      ]
    },
    {
      categoria: 'Combinaciones',
      alimentos: [
        {
          nombre: 'Norteño',
          precio: 210,
          imagen: 'assets/Imagenes/norteño.jpg'
        },
        {
          nombre: 'Sinaloense',
          precio: 180,
          imagen: 'assets/Imagenes/sinaloense.jpg'
        },
        {
          nombre: 'Mochitense',
          precio: 170,
          imagen: 'assets/Imagenes/mochitense.jpg'
        },
        {
          nombre: 'Ahomense',
          precio: 170,
          imagen: 'assets/Imagenes/ahomense.jpg'
        },
        {
          nombre: 'Sonorense',
          precio: 195,
          imagen: 'assets/Imagenes/sonorense.jpg'
        },
        {
          nombre: 'Chilango',
          precio: 150,
          imagen: 'assets/Imagenes/chilango.jpg'
        },
        {
          nombre: 'Americano',
          precio: 170,
          imagen: 'assets/Imagenes/americano.jpg'
        },
        {
          nombre: 'Chorizo',
          precio: 150,
          imagen: 'assets/Imagenes/chorizo.jpg'
        },
        {
          nombre: 'Machaca de res',
          precio: 170,
          imagen: 'assets/Imagenes/machaca de res.jpg'
        },
        {
          nombre: 'Camarones rancheros',
          precio: 230,
          imagen: 'assets/Imagenes/camarones rancheros.jpg'
        },
        {
          nombre: 'Quesadillas',
          precio: 135,
          imagen: 'assets/Imagenes/quesadillas.jpg'
        },
        {
          nombre: 'Chorizo de soya',
          precio: 130,
          imagen: 'assets/Imagenes/chorizo de soya.jpg'
        }
      ]
    },
    {
      categoria: 'Regional',
      alimentos: [
        {
          nombre: 'Tamales',
          precio: 150,
          imagen: 'assets/Imagenes/tamales.jpg'
        },
        {
          nombre: 'Higado',
          precio: 140,
          imagen: 'assets/Imagenes/higado.jpg'
        },
        {
          nombre: 'Bistec ranchero con papas',
          precio: 215,
          imagen: 'assets/Imagenes/bistec ranchero con papas.jpg'
        },
        {
          nombre: 'Chilorio',
          precio: 170,
          imagen: 'assets/Imagenes/chilorio.jpg'
        }
      ]
    },
    {
      categoria: 'Comidas',
      alimentos: [
        {
          nombre: 'Tampiqueña',
          precio: 290,
          imagen: 'assets/Imagenes/tampiqueña.jpg'
        },
        {
          nombre: 'Sirloin poblano',
          precio: 190,
          imagen: 'assets/Imagenes/sirloin poblano.jpg'
        },
        {
          nombre: 'Percherón de alambre',
          precio: 260,
          imagen: 'assets/Imagenes/percheron de alambre.jpg'
        },
        {
          nombre: 'Pollo en mole',
          precio: 190,
          imagen: 'assets/Imagenes/pollo en mole.jpg'
        },
        {
          nombre: 'Enchiladas suizas',
          precio: 175,
          imagen: 'assets/Imagenes/enchiladas suizas.jpg'
        },
        {
          nombre: 'Enchiladas poblanas',
          precio: 175,
          imagen: 'assets/Imagenes/enchiladas poblanas.png'
        },
        {
          nombre: 'Chiles rellenos',
          precio: 200,
          imagen: 'assets/Imagenes/chiles rellenos.jpg'
        },
        {
          nombre: 'Camarones roca',
          precio: 260,
          imagen: 'assets/Imagenes/camarones roca.jpg'
        },
        {
          nombre: 'Camarones empanizados',
          precio: 260,
          imagen: 'assets/Imagenes/camarones empanizados.jpg'
        },
        {
          nombre: 'Alambre de camaron',
          precio: 260,
          imagen: 'assets/Imagenes/alambre de camaron.jpg'
        },
        {
          nombre: 'Chicharrones de pescado',
          precio: 240,
          imagen: 'assets/Imagenes/chicharron de pescado.jpg'
        },
        {
          nombre: 'Costillas BBQ',
          precio: 280,
          imagen: 'assets/Imagenes/costillas bbq.jpg'
        },
        {
          nombre: 'Atun Spicy',
          precio: 280,
          imagen: 'assets/Imagenes/atun spicy.jpg'
        },
        {
          nombre: 'Hamburguesa especial',
          precio: 195,
          imagen: 'assets/Imagenes/hamburguesa especial.jpg'
        }
      ]
    },
    {
      categoria: 'Ensaladas y sandwiches',
      alimentos: [
        {
          nombre: 'Ensalada mediterranea',
          precio: 175,
          imagen: 'assets/Imagenes/ensalada mediterranea.jpg'
        },
        { nombre: 'Ensalada César',
          precioMin: 115,
          precioMax: 145,
          imagen: 'assets/Imagenes/ensalada cesar.jpg'
        },
        {
          nombre: 'Sandwich de los jardines',
          precio: 190,
          imagen: 'assets/Imagenes/sandwich de los jardines.jpg'
        },
        {
          nombre: 'Sandwich de pechuga de pollo',
          precio: 170,
          imagen: 'assets/Imagenes/sandwich de pechuga de pollo.jpg'
        },
        {
          nombre: 'Sandwich de jamon de pechuga de pavo',
          precio: 165,
          imagen: 'assets/Imagenes/sandwich de jamon de pechuga de pavo.jpg'
        }
      ]
    },
    {
      categoria: 'Sopas',
      alimentos: [
        {
          nombre: 'Caldo de pollo',
          precio: 110,
          imagen: 'assets/Imagenes/caldo de pollo.jpg'
        },
        {
          nombre: 'Caldo de queso',
          precio: 110,
          imagen: 'assets/Imagenes/caldo de queso.jpg'
        },
        {
          nombre: 'Sopa de tortilla',
          precio: 120,
          imagen: 'assets/Imagenes/sopa de tortilla.jpg'
        }
      ]
    },
    {
      categoria: 'Lo dulce',
      alimentos: [
        {
          nombre: 'Hot cakes',
          precioMin: 110,
          precioMax: 125,
          imagen: 'assets/Imagenes/hot cakes.jpg'
        },
        {
          nombre: 'Waffle',
          precio: 99,
          imagen: 'assets/Imagenes/waffles.jpg'
        },
        {
          nombre: 'Pan frances',
          precio: 150,
          imagen: 'assets/Imagenes/pan frances.jpg'
        }
      ]
    },
    {
      categoria: 'Menu infantil',
      alimentos: [
        {
          nombre: 'Nuggets de pollo',
          precio: 140,
          imagen: 'assets/Imagenes/nuggets de pollo.jpg'
        },
        {
          nombre: 'Hot cakes infantiles',
          precio: 95,
          imagen: 'assets/Imagenes/hot cakes infantiles.png'
        },
        {
          nombre: 'Papas a la francesa',
          precio: 70,
          imagen: 'assets/Imagenes/papas a la francesa.jpg'
        },
        {
          nombre: 'Quesadilla',
          precio: 75,
          imagen: 'assets/Imagenes/quesadillas.png'
        }
      ]
    },
    {
      categoria: 'Postres',
      alimentos: [
        {
          nombre: 'Nieve (Diferentes sabores)',
          precio: 60,
          imagen: 'assets/Imagenes/nieve.jpg'
        },
        {
          nombre: 'Pay de dátil con nuez',
          precio: 75,
          imagen: 'assets/Imagenes/pay de datil con nuez.jpg'
        },
        {
          nombre: 'Brownie de chocolate con nieve de chocolate o vainilla',
          precio: 85,
          imagen: 'assets/Imagenes/brownie de chocolate con nieve.jpg'
        }
      ]
    },
    {
      categoria: 'Bebidas',
      alimentos: [
        {
          nombre: 'Agua embotellada 500 ml',
          precio: 15,
          imagen: 'assets/Imagenes/agua embotellada.jpg'
        },
        {
          nombre: 'Leche 250 ml',
          precio: 35,
          imagen: 'assets/Imagenes/leche.jpg'
        },
        {
          nombre: 'Refresco 355 ml',
          precio: 85,
          imagen: 'assets/Imagenes/refresco.jpg'
        },
        {
          nombre: 'Agua mineral 355 ml',
          precio: 35,
          imagen: 'assets/Imagenes/agua mineral.jpg'
        },
        {
          nombre: 'Naranjada natural o mineral',
          precio: 40,
          imagen: 'assets/Imagenes/naranjada.jpg'
        },
        {
          nombre: 'Jamaica natural o mineral',
          precio: 40,
          imagen: 'assets/Imagenes/jamaica.jpg'
        },
        {
          nombre: 'Limonada de pepino y menta natural o mineral',
          precio: 45,
          imagen: 'assets/Imagenes/limonada de pepino.jpg'
        },
        {
          nombre: 'Jamaica de fresa natural o mineral',
          precio: 45,
          imagen: 'assets/Imagenes/jamaica de fresa.jpg'
        },
        {
          nombre: 'Limonada de fresa natural o mineral',
          precio: 45,
          imagen: 'assets/Imagenes/limonada de fresa.jpg'
        },
        {
          nombre: 'Jarras de limonada, naranjada, piñada o jamaica de 1.5 lts',
          precio: 110,
          imagen: 'assets/Imagenes/jarras.jpg'
        },
        {
          nombre: 'Jugo de naranja 250 ml',
          precio: 45,
          imagen: 'assets/Imagenes/jugo de naranja.jpg'
        },
        {
          nombre: 'Jugo de piña 250 ml',
          precio: 45,
          imagen: 'assets/Imagenes/jugos de piña.jpg'
        },
        {
          nombre: 'Jugo de zanahoria 250 ml',
          precio: 45,
          imagen: 'assets/Imagenes/jugo de zanahoria.jpg'
        },
        {
          nombre: 'Jugo de toronja 250 ml',
          precio: 45,
          imagen: 'assets/Imagenes/jugo de toronja.jpg'
        },
        {
          nombre: 'Jugo mixto 400 ml',
          precio: 50,
          imagen: 'assets/Imagenes/jugo mixto.jpg'
        },
        {
          nombre: 'Jugo verde 400 ml',
          precio: 50,
          imagen: 'assets/Imagenes/jugo verde.jpg'
        },
        {
          nombre: 'Malteada de fresa, vainilla, chocolate 370 ml',
          precio: 70,
          imagen: 'assets/Imagenes/malteada.jpg'
        },
        {
          nombre: 'Malteada de nutella 370 ml',
          precio: 80,
          imagen: 'assets/Imagenes/malteada de nutella.jpg'
        },
        {
          nombre: 'Cafe de olla 467 ml',
          precio: 48,
          imagen: 'assets/Imagenes/cafe de olla.jpg'
        },
        {
          nombre: 'Cafe descafeinado (refill) 250 ml',
          precio: 48,
          imagen: 'assets/Imagenes/cafe descafeinado.jpg'
        },
        {
          nombre: 'Cafe americano (refill) 250 ml',
          precio: 48,
          imagen: 'assets/Imagenes/cafe americano.jpeg'
        },
        {
          nombre: 'Agua para cafe (refill) 250 ml',
          precio: 48,
          imagen: 'assets/Imagenes/agua para cafe.jpg'
        },
        {
          nombre: 'Leche caliente para cafe (refill) 250 ml',
          precio: 48,
          imagen: 'assets/Imagenes/leche caliente.jpg'
        },
        {
          nombre: 'Cappucino 250 ml',
          precio: 52,
          imagen: 'assets/Imagenes/capuchino.jpg'
        }
      ]
    }
  ];

  isNumber(value: any): boolean {
    return typeof value === 'number';
  }
  
  categoriaSeleccionada: string = '';
  categoriaActiva: string | null = null;

  toggleCategoria(categoriaNombre: string): void {
    this.categoriaSeleccionada =
      this.categoriaSeleccionada === categoriaNombre ? '' : categoriaNombre;
  }
  
  modoOscuro = false;

  ngOnInit(): void {
    const savedMode = localStorage.getItem('modoOscuro');
    this.modoOscuro = savedMode === 'true';
    this.aplicarModo();
  }

  toggleModo() {
    this.modoOscuro = !this.modoOscuro;
    localStorage.setItem('modoOscuro', this.modoOscuro.toString());
    this.aplicarModo();
    console.log('cambio')
  }

  aplicarModo() {
    const body = document.body;
    body.classList.remove('light-mode', 'dark-mode');
    body.classList.add(this.modoOscuro ? 'dark-mode' : 'light-mode');
  }

}