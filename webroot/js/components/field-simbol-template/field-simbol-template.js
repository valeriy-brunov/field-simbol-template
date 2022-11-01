/**
 * Веб-компонент "field-simbol-template".
 */

import Template from './template.js';

/**
 * Класс FieldSimbolTemplate
 */
export default class FieldSimbolTemplate extends HTMLElement {

    /**
     * Конструктор.
     */
    constructor() {

        super();

        // Теневая модель:
        this.root = this.attachShadow( {mode: 'open'} );

        // Подключаем CSS:
        this.root.innerHTML = Template.render();

        // Кеширование элементов компонента не входящих в теневую модель:
        this.dom = Template.mapDom( this );

        // Все содержимое переносим в теневую модель, оставляя тег <template> пустым:
        this.moveContent();

        // Кэширование элементов компонента для теневой модели.
        this.domShadow = Template.mapDomShadow( this.root );

        // Задаём начальные значения.
        // Строка будет содержать текст набранный с клавиатуры пользователем:
        this.sequence = '';

        // Кешируем значения.
        this.cashe = this.casheValue();
    }

    /**
     * Все содержимое переносим в теневую модель, оставляя тег <template> пустым.
     */
    moveContent() {
        const template = this.dom.tagTempl;
        const fragment = document.createDocumentFragment();
        fragment.appendChild( template.content );
        this.root.appendChild( fragment );
    }

    /**
     * Кеширование значений или объектов.
     */
    casheValue() {
        return {
            templateLengthSubstitute: (this.template.split('_').length - 1),
        }
    }

    /**
     * Атрибут "template".
     *
     * Шаблон для ввода строки.
     */
    set template( val ) {
        this.setAttribute( 'template', val );
    }
    get template() {
        if ( this.getAttribute( 'template' ) ) {
            return this.getAttribute( 'template' );
        }
        else return FieldSimbolTemplate.DEFAULT_TEMPLATE;
    }
    static get DEFAULT_TEMPLATE() {
        return '+7(___)___-__-__';
    }

    /**
     * Атрибут "input".
     *
     * Определяет какие значение можно вводить в шаблон:
     *      "all" - любые значения (буквы и цифры);
     *      "numbers" - только цифры;
     *      "letters" - только буквы.
     */
    set input( val ) {
        this.setAttribute( 'input', val );
    }
    get input() {
        if ( this.getAttribute( 'input' ) ) {
            return this.getAttribute( 'input' );
        }
        else return FieldSimbolTemplate.DEFAULT_INPUT;
    }
    static get DEFAULT_INPUT() {
        return 'letters';
    }

    /**
     * Атрибут "displayInput".
     *
     * Как отображает вывод символов.
     *      "full" - показывать ввод символов в шаблоне, заменяя символ подчёркивания ("_");
     *      "right-crop" - обрезать правую часть шаблона.
     */
    set displayInput( val ) {
        this.setAttribute( 'displayInput', val );
    }
    get displayInput() {
        if ( this.getAttribute( 'displayInput' ) ) {
            return this.getAttribute( 'displayInput' );
        }
        else return FieldSimbolTemplate.DEFAULT_DISPLAYINPUT;
    }
    static get DEFAULT_DISPLAYINPUT() {
        return 'full';
    }

    /**
     * Определяем, за какими атрибутами необходимо наблюдать.
     */
    static get observedAttributes() {
        //return ['Имя атрибута'];
    }

    /**
     * Фильтрует значения символов.
     *
     * @param {simbol} key Символ.
     * @return simbol
     */
    filterValue( key ) {
        if ( this.input == 'numbers' ) {
            let result = key.match(/[0-9]/g);
            if ( result === null ) return '';
            else return result;
        }
        if ( this.input == 'letters' ) {
            let result = key.match(/([a-z]|[A-Z])/g);
            if ( result === null ) return '';
            else return result;
        }
        if ( this.input == 'all' ) return key;
    }

    /**
     * Максимальное количество введёных символов.
     *
     * @param {string} val Строка символов.
     * @return string
     */
    filterMaxSimbol( val ) {
        if ( val.length > this.cashe.templateLengthSubstitute ) {
            return val.slice(0, val.length - 1);
        }
        return val;
    }

    /**
     * При необходимости обрезает правую часть строки по символу "_" (подчёркивание).
     * 
     * @param {string} str Строка, содержащая символы вставленные в шаблон.
     * @return string
     */
    filterDisplayInput( str ) {
        if ( this.displayInput == 'right-crop' ) {
            let pos = str.indexOf('_', 0);
            if ( pos === -1 ) return str;
            else return str.slice(0, pos);
        }
        if ( this.displayInput == 'full' ) return str;
    }

    /**
     * Следим за изменениями этих атрибутов и отвечаем соответственно.
     */
    attributeChangedCallback( name, oldVal, newVal ) {
        switch( name ) {
            case 'Имя атрибута':
                // Выполняемый код.
                break;
            case 'Имя атрибута':
            // Выполняемый код.
            break;
        }
    }

    /**
     * Браузер вызывает этот метод при добавлении элемента в документ.
     * (может вызываться много раз, если элемент многократно добавляется/удаляется).
     */
    connectedCallback() {
        // СОБЫТИЯ:
        let keyboardHandler = (e) => this.keyboardHandler(e);
        this.addEventListener('click', (e) => {
            e.stopPropagation();
            document.addEventListener('keyup', keyboardHandler);
        });
        document.addEventListener('click', (e) => {
            document.removeEventListener('keyup', keyboardHandler);
        });

        this.substituteInTemplate( this.template, '' );
        this.moveContent();
    }

    /**
     * Обрабатывает события нажатие клавиш на клавиатуре.
     * 
     * @param {object} event Объект события.
     * @return void
     */
    keyboardHandler( event ) {
        if ( event.key == 'Backspace' ) {
            this.sequence = this.sequence.slice(0, this.sequence.length - 1);
        }
        else {
            this.sequence+= this.filterValue( event.key );
            this.sequence = this.filterMaxSimbol( this.sequence );
        }

        this.substituteInTemplate( this.template, this.sequence );
        this.root.innerHTML = '';
        this.root.innerHTML = Template.render();
        this.moveContent();
    }

    /**
     * Подставляет в шаблон templ строку str и полученный html-код вставляет в тег <template>.
     * При указании пустого значения str (str = '') возвращает шаблон tmpl без каких-либо изменений.
     *
     * @param {string} tmpl Шаблон.
     * @param {string} str Строка символов.
     * @return void
     */
    substituteInTemplate( templ, str ) {
        let s = 0;
        let newStr = '';
        for (let i = 0; i < templ.length; i++) {
            if ( templ[i] == '_' && str[s] ) {
                newStr+= str[s];
                s++;
            }
            else {
                newStr+= templ[i];
            }
        }

        let posCursor = newStr.indexOf('_', 0);
        if ( posCursor === -1 ) {
            posCursor = templ.length;
        }

        newStr = this.filterDisplayInput( newStr );

        const template = this.dom.tagTempl;
        for (let i = 0; i < newStr.length; i++) {
            let span = document.createElement('span');
            span.className = 'cell';
            span.innerHTML = newStr[i];
            if ( (posCursor - 1) == i ) {
                span.classList.add('cursor');
            }
            template.content.appendChild( span );
        }
    }
}

/**
 * Регистрация веб-компонента.
 */
if ( !customElements.get( 'brunov-field-simbol-template' ) ) {
    customElements.define( 'brunov-field-simbol-template', FieldSimbolTemplate );
}
