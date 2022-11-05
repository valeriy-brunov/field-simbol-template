<?php
/**
 * CakePHP элемент "field-simbol-template" для генерации одноимённого веб-компонента.
 *
 * Описание. Предназначение.
 *
 * Используйте <?= $this->Webcomp->fieldSimbolTemplate() ?>
 *
 * Настройки веб-компонента:
 *  view =>
 *      'black' - чёрный вид;
 *      'red'   - сделайте красный вид.
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
