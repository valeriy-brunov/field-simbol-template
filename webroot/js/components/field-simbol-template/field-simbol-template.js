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
        if ( this.hasAttribute( 'template' ) ) {
            return this.getAttribute( 'template' );
        }
        else return FieldSimbolTemplate.DEFAULT_TEMPLATE;
    }
    static get DEFAULT_TEMPLATE() {
        return '+7(___)___-__-__';
    }

    /**
     * Атрибут "value".
     *
     * Текст, набранный с клавиатуры без подстановки в шаблон. В дальнейшем полученная строка
     * может быть отправлена на сервер.
     * !!! Данный атрибут должен присутствовать в веб-компоненте как служебный, т.е. существовать
     *     при первой загрузке веб-компонента.
     *
     * @param {string} val Строка.
     * @return void
     */
    set value( val ) {
        this.setAttribute( 'value', val );
    }
    get value() {
        if ( this.hasAttribute('value') ) {
            return this.getAttribute( 'value' );
        }
        else return FieldSimbolTemplate.DEFAULT_VALUE;
    }
    static get DEFAULT_VALUE() {
        return '';
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
        if ( this.hasAttribute( 'input' ) ) {
            return this.getAttribute( 'input' );
        }
        else return FieldSimbolTemplate.DEFAULT_INPUT;
    }
    static get DEFAULT_INPUT() {
        return 'all';
    }

    /**
     * Атрибут "displayInput".
     *
     * Как отображает ввод символов с клавиатуры.
     *      "full" - показывать ввод символов в шаблоне, заменяя символ подчёркивания ("_");
     *      "right-crop" - обрезать правую часть шаблона.
     */
    set displayInput( val ) {
        this.setAttribute( 'displayInput', val );
    }
    get displayInput() {
        if ( this.hasAttribute( 'displayInput' ) ) {
            return this.getAttribute( 'displayInput' );
        }
        else return FieldSimbolTemplate.DEFAULT_DISPLAYINPUT;
    }
    static get DEFAULT_DISPLAYINPUT() {
        return 'full';
    }

    /**
     * Атрибут "clearFormFocus".
     *
     * Что делать с содержимым текстового поля при появление или потери фокуса:
     *      "y" - текстовое поле "при потери фокуса" очищается и показывается содержимое атрибута "placeholder",
     *            даже если часть символов введена. "При возникновение фокуса" текстовое поле очищается и
     *            набор начинается заново;
     *      "n" - текстовое поле не очищается "при потери фокуса". Если не набрано ни единого символа, показывается
     *            "placeholder". Если введены часть символов, они остаются. "При появление фокуса" в текстовом
     *            поле, набор продолжается с того места, где остановился набор символов.
     * !!! Для всех режимов: если введены все символы в соответствии с шаблоном, то при "потери фокуса" или
     *     "появление фокуса" набранный текст отображается;
     */
    set clearFormFocus( val ) {
        this.setAttribute( 'clearFormFocus', val );
    }
    get clearFormFocus() {
        if ( this.hasAttribute( 'clearFormFocus' ) ) {
            return this.getAttribute( 'clearFormFocus' );
        }
        else return FieldSimbolTemplate.DEFAULT_CLEARFORMFOCUS;
    }
    static get DEFAULT_CLEARFORMFOCUS() {
        return 'y';
    }

    /**
     * Атрибут "status".
     *
     * Сообщает, находится ли текстовое поле в фокусе:
     *      "focus" - текстовое поле в фокусе;
     *      "lossfocus" - текстовое поле потеряло фокус.
     */
    set status( val ) {
        this.setAttribute( 'status', val );
    }
    get status() {
        if ( this.hasAttribute( 'status' ) ) {
            return this.getAttribute( 'status' );
        }
    }

    /**
     * Определяем, за какими атрибутами необходимо наблюдать.
     *
     * @return array Массив атрибутов.
     */
    static get observedAttributes() {
        return ['status'];
    }

    /**
     * Атрибут "placeholder".
     *
     * Текст, который отобразится в текстовом поле при потери фокуса.
     */
    set placeholder( val ) {
        this.setAttribute( 'placeholder', val );
    }
    get placeholder() {
        if ( this.hasAttribute( 'placeholder' ) ) {
            return this.getAttribute( 'placeholder' );
        }
        else return FieldSimbolTemplate.DEFAULT_PLACEHOLDER;
    }
    static get DEFAULT_PLACEHOLDER() {
        return null;
    }

    /**
     * Фильтрует значения символов.
     *
     * @param {simbol} key Символ.
     * @return simbol|empty
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
     * Показывает или скрывает курсор.
     *
     * @param {string} status Состояние текстового поля: фокус или потеря фокуса.
     * @return void
     */
    cursorHideShow( status ) {
        if ( status == 'focus' ) {
            if ( this.hasAttribute('class') ) {
                this.classList.remove('hidecursor');
            }
        }
        if ( status == 'lossfocus' ) {
            if ( this.hasAttribute('class') ) {
                this.classList.add('hidecursor');
            }
            else {
                this.setAttribute('class');
                this.classList.add('hidecursor');
            }
        }
    }

    /**
     * Показывает или скрывает плейсхолдер.
     *
     * @param {string} status Состояние текстового поля: фокус или потеря фокуса.
     * @return void
     */
    placeholderHideShow( status ) {
        if ( this.placeholder === null ) {
            this.updateField( this.template, '' );
        }
        else {
            if ( status == 'focus' ) {
                this.updateField( this.template, '' );
            }
            if ( status == 'lossfocus' ) {
                this.root.innerHTML = Template.render();
                this.root.append( this.placeholder );
            }
        }
    }

    /**
     * В зависимости от выбранного режима формы (геттер "clearFormFocus") управляет содержимым формы.
     *
     * @param {string} status Состояние текстового поля: фокус или потеря фокуса.
     * @return void
     */
    formFocus( status ) {
        if ( this.clearFormFocus == 'y' ) {
            if ( status == 'lossfocus' ) {
                if ( this.cashe.templateLengthSubstitute == this.value.length ) {
                    this.updateField( this.template, this.value );
                }
                else {
                    this.value = '';
                    this.placeholderHideShow( 'lossfocus' );
                }
            }
            if ( status == 'focus' ) {
                this.updateField( this.template, this.value );
            }
        }
        if ( this.clearFormFocus == 'n' ) {
            if ( status == 'lossfocus' ) {
                if ( this.value.length === 0 ) {
                    this.placeholderHideShow( 'lossfocus' );
                }
                else this.updateField( this.template, this.value );
            }
            if ( status == 'focus' ) {
                this.updateField( this.template, this.value );
            }
        }
    }

    /**
     * Следим за изменениями этих атрибутов и отвечаем соответственно.
     *
     * @param {string} name Имя атрибута, в котором произошли изменения.
     * @param {string} oldVal Старое значение атрибута, т.е. до его изменения.
     * @param {string} newVal Новое значение атрибута.
     * @return void
     *
     * !!! При первой загрузке страницы, если атрибуты установлены в веб-компоненте, происходит
     *     срабатывание данной функции, при этом "oldVal=null", а "newVal" будет равно значению,
     *     установленному в веб-компоненте.
     */
    attributeChangedCallback( name, oldVal, newVal ) {
        switch( name ) {
            case 'status':
                this.placeholderHideShow( this.status );
                this.cursorHideShow( this.status );
                this.formFocus( this.status );
                break;
            case 'value':
                if ( oldVal === null && newVal === '' ) {
                    this.updateField( this.template, '' );
                }
                else {
                    if ( newVal === '' ) {
                        this.updateField( this.template, '' );
                        break;
                    }
                    if ( newVal !== '' ) {
                        let simbol = this.filterValue( newVal[newVal.length - 1] );
                        if ( simbol === '' ) {
                            if ( oldVal === null ) this.value = '';
                            else this.value = oldVal;
                            break;
                        }
                        else {
                            let val = this.filterMaxSimbol( newVal );
                            this.updateField( this.template, val );
                            this.value = val;
                            break;
                        }
                    }
                }
                break;
            // Другие атрибуты.
        }
    }

    /**
     * Вставляет в шаблон "templ" строку "str" и вставляет полученную строку в текстовое поле.
     *
     * @param {string} tmpl Шаблон.
     * @param {string} str Строка символов.
     * @return void
     */
    updateField( template, str ) {
        this.substituteInTemplate( template, str );
        this.root.innerHTML = Template.render();
        this.moveContent();
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
            this.status = 'focus';
        });
        document.addEventListener('click', (e) => {
            document.removeEventListener('keyup', keyboardHandler);
            this.status = 'lossfocus';
        });
    }

    /**
     * Обрабатывает события нажатие клавиш на клавиатуре.
     * 
     * @param {object} event Объект события.
     * @return void
     */
    keyboardHandler( event ) {
        let oldVal = this.value;
        if ( event.key == 'Backspace' ) {
            if ( oldVal.length > 0 ) this.value = oldVal.slice(0, oldVal.length - 1);
        }
        else {
            if ( oldVal === '' ) {
                this.value = event.key;
            }
            else this.value = oldVal + event.key;
        }
        this.attributeChangedCallback('value', oldVal, this.value);
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
