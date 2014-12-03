<?php
class Alwaysoffer_Categoryhome_Block_Categoryhome extends Mage_Catalog_Block_Product_Abstract
{
	public function _prepareLayout()
    {
		return parent::_prepareLayout();
    }
    
     public function getCategoryhome()     
     { 
        if (!$this->hasData('categoryhome')) {
            $this->setData('categoryhome', Mage::registry('categoryhome'));
        }
        return $this->getData('categoryhome');
        
    }
}