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
        return {}
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
                padding: 3px;
                font-family: "Arial", sans-serif;
            }
            .cell {
                width: 0.8em;
                height: 1.1em;
            }
            .cell-placeholder {
                height: 1.1em;
            }
            .cell,
            .cell-placeholder {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .cursor {
                position: relative;
            }
            .cursor::after {
                content: "";
                height: 100%;
                width: 2px;
                border-right: 1px solid black;
                box-sizing: border-box;
                position: absolute;
                top: 0;
                right: 0;
                animation-name: blink;
                animation-timing-function: linear;
                animation-duration: 1.6s;
                animation-iteration-count: infinite;
            }
            @keyframes blink {
                50% {opacity: 0;}
            }
            :host(.hidecursor) .cursor::after {
                border-right: none;
            }
        </style>`;
    },
}
