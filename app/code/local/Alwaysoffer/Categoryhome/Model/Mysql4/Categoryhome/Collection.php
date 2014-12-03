<?php

class Alwaysoffer_Categoryhome_Model_Mysql4_Categoryhome_Collection extends Mage_Core_Model_Mysql4_Collection_Abstract
{
    public function _construct()
    {
        parent::_construct();
        $this->_init('categoryhome/categoryhome');
    }
}