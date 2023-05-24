const router = require('express').Router();
let SubCategory = require('../models/ResearchModels/category');

router.route('/getSubCategories').get((req,res)=>{
    SubCategory.find()
        .then(subcategory => res.json(subcategory))
        .catch(err=>res.status(400).json('error: ' + err));
});
router.route('/insertSubCategory').post((req,res)=>{
    const subcategory = req.body;

    const newSubCategory = new SubCategory(subcategory);
    newSubCategory.save()
        .then((subcategory)=>{
            res.json('New Sub Category Added ! ');
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

module.exports = router;