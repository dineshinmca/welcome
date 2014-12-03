<?php

class Alwaysoffer_Categoryhome_Model_Mysql4_Categoryhome extends Mage_Core_Model_Mysql4_Abstract
{
    public function _construct()
    {    
        // Note that the categoryhome_id refers to the key field in your database table.
        $this->_init('categoryhome/categoryhome', 'categoryhome_id');
    }
}