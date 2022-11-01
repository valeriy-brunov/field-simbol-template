/**
 * Шаблон для компонента "field-simbol-template".
 */
export default {

    render( props ) {
        return `${this.css( props )}`;
    },

    /**
     * Кэширование элементов компонента для теневой модели.
     */
    mapDomShadow( scope ) {
        return {
            //myDiv: scope.querySelector('.ffff'),
        }
    },

    /**
     * Кеширование элементов компонента не входящих в теневую модель.
     */
    mapDom( scope ) {
        return {
            tagTempl: scope.querySelector('.field-simbol-template'),// Тег <template>.
        }
    },

    /**
     * Перемещает стили в компонент.
     */
    css( p ) { return `
        <style>
            :host {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                border: 1px solid green;
            }
            .cell {
                width: 1em;
                height: 1.2em;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .cursor {
                border-right: 1px solid black;
            }
        </style>`;
    },
}

