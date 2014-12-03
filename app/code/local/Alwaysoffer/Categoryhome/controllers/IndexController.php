<?php
class Alwaysoffer_Categoryhome_IndexController extends Mage_Core_Controller_Front_Action
{
    public function indexAction()
    {
    	
    	/*
    	 * Load an object by id 
    	 * Request looking like:
    	 * http://site.com/categoryhome?id=15 
    	 *  or
    	 * http://site.com/categoryhome/id/15 	
    	 */
    	
		$categoryhome_id = $this->getRequest()->getParam('id');

  		if($categoryhome_id != null && $categoryhome_id != '')	{
			$categoryhome = Mage::getModel('categoryhome/categoryhome')->load($categoryhome_id)->getData();
		} else {
			$categoryhome = null;
		}	
		
		
		 /*
    	 * If no param we load a the last created item
    	 */ 
    	
    	if($categoryhome == null) {
			$resource = Mage::getSingleton('core/resource');
			$read= $resource->getConnection('core_read');
			$categoryhomeTable = $resource->getTableName('categoryhome');
			
			$select = $read->select()
			   ->from($categoryhomeTable,array('categoryhome_id','title','content','status'))
			   ->where('status',1)
			   ->order('created_time DESC') ;
			   
			$categoryhome = $read->fetchRow($select);
		}
		Mage::register('categoryhome', $categoryhome);
		

			
		$this->loadLayout();     
		$this->renderLayout();
    }
	public function checkAction()
	{
		echo 'dsd';
		echo $categoryHome = Mage::getModel('categoryhome/categoryhome')->getTest();
		die;
	}
	public function categoryAction($catid)
	{
		/* $this->loadLayout();     
		$this->renderLayout();  */
		//D:\xampp\htdocs\alwaysoffer\app\design\frontend\rwd\default\template\categoryhome\categoryhome.phtml
		
		echo $this->getLayout()->createBlock('core/template')->setTemplate('categoryhome/categoryhome.phtml')->toHtml();
		 
	} 
}