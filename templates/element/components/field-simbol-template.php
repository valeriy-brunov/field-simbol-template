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
    $attr[0]['class']  = 'hidecursor';
    $attr[0]['value']  = '';
?>

<?php $this->start('wc-field-simbol-template') ?>
    <?php // Содержимое веб-компонента. ?>
<?php $this->end() ?>

<?php echo
    $this->Html->script(($namePlugin ? $pathPluginJs : 'components/field-simbol-template/field-simbol-template'), [
        'block' => 'js-field-simbol-template',
        'type' => 'module',
    ]);
?>

<brunov-field-simbol-template<?= $this->Webcomp->addattr( $attr[0] ) ?>>
    <template class="field-simbol-template">
        <?= $attr[0]['content'] ?? '' ?>
        <?= $this->Webcomp->filterScript( $this->fetch('wc-field-simbol-template'), $attr[0]['js'] ) ?>
    </template>
    <?= $this->fetch('js-field-simbol-template') ?>
</brunov-field-simbol-template>
