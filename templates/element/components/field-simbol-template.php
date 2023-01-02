<?php
/**
 * CakePHP элемент "field-simbol-template" для генерации одноимённого веб-компонента.
 *
 * Помогает пользователю вводить текст по шаблону в текстовом поле.
 *
 * Используйте <?= $this->Webcomp->fieldSimbolTemplate() ?>
 *
 * Описание настроек веб-компонента:
 *      https://github.com/valeriy-brunov/field-simbol-template
 */
?>

<?php
    // Служебные атрибуты:
    $attr[0]['status'] = 'lossfocus';
    $attr[0]['class']  = 'input hidecursor';
    $attr[0]['value']  = '';
?>

<?php $this->start('wc-field-simbol-template') ?>
    <?php // Содержимое веб-компонента. ?>
<?php $this->end() ?>

<?php
    $this->Html->script(($namePlugin ? $pathPluginJs : 'components/field-simbol-template/field-simbol-template'), [
        'block' => ($this->request->is('ajax') ? 'js-field-simbol-template' : 'script'),
        'type' => 'module',
    ]);
?>

<?php
    if ( $this->request->is('ajax') ) {
        $attr[0]['jsload'] = str_replace(['<script src="', '" type="module"></script>'], ['', ''], $this->fetch('js-field-simbol-template'));
    }
?>

<brunov-field-simbol-template<?= $this->Webcomp->addattr( $attr[0] ) ?>>
    <template class="field-simbol-template">
        <?= $attr[0]['content'] ?? '' ?>
        <?= $this->Webcomp->filterScript( $this->fetch('wc-insert-paginator'), $attr[0]['js'] ) ?>
    </template>
</brunov-field-simbol-template>
