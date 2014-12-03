<?php

class Alwaysoffer_Categoryhome_Block_Adminhtml_Categoryhome_Edit extends Mage_Adminhtml_Block_Widget_Form_Container
{
    public function __construct()
    {
        parent::__construct();
                 
        $this->_objectId = 'id';
        $this->_blockGroup = 'categoryhome';
        $this->_controller = 'adminhtml_categoryhome';
        
        $this->_updateButton('save', 'label', Mage::helper('categoryhome')->__('Save Item'));
        $this->_updateButton('delete', 'label', Mage::helper('categoryhome')->__('Delete Item'));
		
        $this->_addButton('saveandcontinue', array(
            'label'     => Mage::helper('adminhtml')->__('Save And Continue Edit'),
            'onclick'   => 'saveAndContinueEdit()',
            'class'     => 'save',
        ), -100);

        $this->_formScripts[] = "
            function toggleEditor() {
                if (tinyMCE.getInstanceById('categoryhome_content') == null) {
                    tinyMCE.execCommand('mceAddControl', false, 'categoryhome_content');
                } else {
                    tinyMCE.execCommand('mceRemoveControl', false, 'categoryhome_content');
                }
            }

            function saveAndContinueEdit(){
                editForm.submit($('edit_form').action+'back/edit/');
            }
        ";
    }

    public function getHeaderText()
    {
        if( Mage::registry('categoryhome_data') && Mage::registry('categoryhome_data')->getId() ) {
            return Mage::helper('categoryhome')->__("Edit Item '%s'", $this->htmlEscape(Mage::registry('categoryhome_data')->getTitle()));
        } else {
            return Mage::helper('categoryhome')->__('Add Item');
        }
    }
}