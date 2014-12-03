<?php

class Alwaysoffer_Categoryhome_Model_Categoryhome extends Mage_Core_Model_Abstract
{
	//die('dsds');
	public function categoryObj()
	{
		return Mage::getModel('catalog/category');
	}
		
    public function _construct()
    {
        parent::_construct();
        $this->_init('categoryhome/categoryhome');
    }
	
	public function getCategoryDetails($categoryId)
	{
		$childCat = $this->categoryObj()->load($categoryId);
		$cat['id'] = $categoryId;
		$cat['name'] = $childCat->getName();
		return $cat;
		
	}
	public function getCategoryName($catObj)
	{
		return $catObj->getName();
	}
	public function getCategoryImage($catObj)
	{
		return $catObj->getImage();
	}
	public function getCategoryUrl($catObj)
	{
		return $catObj->getUrl();
	}
	
	public function getCategoryProducts($catId)
	{
		$catagory_model = $this->categoryObj()->load($catId); 
		$collection = Mage::getResourceModel('catalog/product_collection');
		$collection->addCategoryFilter($catagory_model); //category filter
		$collection->addAttributeToFilter('status',1); //only enabled product
		$collection->addAttributeToFilter('visibility',4);
		$collection->addAttributeToSelect(array('name','url','small_image')); //add product attribute to be fetched
		$collection->getSelect()->order('rand()')->limit(10); //uncomment to get products in random order     
		$collection->addStoreFilter(); 
		return $collection;
	}
	public function getTest()
	{
		return 'working';
	}
	
	public function getCategoryNewProducts($catId)
	{
		$todayDate  = Mage::app()->getLocale()->date()->toString(Varien_Date::DATETIME_INTERNAL_FORMAT);
		$catagory_model = $this->categoryObj()->load($catId); 
		$collection = Mage::getResourceModel('catalog/product_collection');
		$collection->addCategoryFilter($catagory_model); //category filter
		$collection->addAttributeToFilter('status',1); //only enabled product
		$collection->addAttributeToFilter('visibility',4);
		$collection->addAttributeToSelect(array('name','url','small_image')); //add product attribute to be fetched
		$collection->addAttributeToFilter('news_from_date', array('date' => true, 'to' => $todayDate));
        $collection->addAttributeToFilter('news_to_date', array('or'=> array(
            0 => array('date' => true, 'from' => $todayDate),
            1 => array('is' => new Zend_Db_Expr('null')))
         ), 'left');
		$collection->getSelect()->order('rand()')->limit(10); //uncomment to get products in random order     
		$collection->addStoreFilter(); 
		return $collection;
	}
	
	public function getSubCategoriesList($child)
	{
		$childLists = explode(',',$child);
		foreach($childLists as $child)
		{
			$subList[] = $this->getCategoryDetails($child);
		}
		return $subList;
	}
	
}