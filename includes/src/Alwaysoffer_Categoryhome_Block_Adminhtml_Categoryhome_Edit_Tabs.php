<?php

class Alwaysoffer_Categoryhome_Block_Adminhtml_Categoryhome_Edit_Tabs extends Mage_Adminhtml_Block_Widget_Tabs
{

  public function __construct()
  {
      parent::__construct();
      $this->setId('categoryhome_tabs');
      $this->setDestElementId('edit_form');
      $this->setTitle(Mage::helper('categoryhome')->__('Item Information'));
  }

  protected function _beforeToHtml()
  {
      $this->addTab('form_section', array(
          'label'     => Mage::helper('categoryhome')->__('Item Information'),
          'title'     => Mage::helper('categoryhome')->__('Item Information'),
          'content'   => $this->getLayout()->createBlock('categoryhome/adminhtml_categoryhome_edit_tab_form')->toHtml(),
      ));
     
      return parent::_beforeToHtml();
  }
}