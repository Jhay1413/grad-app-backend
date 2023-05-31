const router = require('express').Router();
const {SubCategoryModel, CategoryModel}= require('../models/ResearchModels/category');

router.route('/getSubCategories').get((req,res)=>{
    SubCategoryModel.find()
        .then(subcategory => res.json(subcategory))
        .catch(err=>res.status(400).json('error: ' + err));
});
router.route('/insertSubCategory').post((req,res)=>{
    const {name} = req.body;

    const newSubCategory = new SubCategoryModel({name});
    newSubCategory.save()
        .then((subcategory)=>{
            res.status(200).json(subcategory);
        })
        .catch((err)=>res.status(400).json('err' + err));

});
router.delete('/deleteSubCategory/:id',async(req,res)=>{
    try {
        const result = await SubCategory.findOneAndDelete({_id: req.params.id});
        if(!result){
            return res.status(404).send('SubCategory Not Found');
        }
        return res.status(200).send('Deleted Successfully ! ');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error !')
    }
})
router.put('/updateSubCategory/:id', async(req,res)=>{
    try {
        const updateSubCategory = await SubCategory.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json({message:"Updated Successfully !"});
    } catch (error) {
        res.status(500).json({message:"Server Error!"});
    }
})
router.put('/addingCategory/:id',async(req,res)=>{
    const {id} = req.params;
    const {_id} = req.body;
  
    const category = await CategoryModel.findById(id);
    category.subCategory.push({_id});
    await category.save();
    res.status(200).send(category);
})
module.exports = router;