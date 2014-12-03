<?php
class Alwaysoffer_Categoryhome_Block_Adminhtml_Categoryhome extends Mage_Adminhtml_Block_Widget_Grid_Container
{
  public function __construct()
  {
    $this->_controller = 'adminhtml_categoryhome';
    $this->_blockGroup = 'categoryhome';
    $this->_headerText = Mage::helper('categoryhome')->__('Item Manager');
    $this->_addButtonLabel = Mage::helper('categoryhome')->__('Add Item');
    parent::__construct();
  }
}